<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseClass;
use App\Models\Schedule;
use App\Models\Score;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoresController extends Controller
{
    public function scores() {
        $user = Auth::user();
        $courseClassesData = [];
        $studentData = [];

        if($user->role === 'Student') {
            $scores = Score::where('student_id', $user->student->id)->with(['courseClass', 'courseClass.course'])->get();
            $scores->each(function ($score) {
                $result = $this->calculateGrade($score);
                $score->t10Score = $result['t10Score'];
                $score->t4Score = $result['t4Score'];
                $score->grade = $result['grade'];
            });
            $groupedScores = $scores->groupBy(function ($score) {
                return $score->courseClass?->semester;
            });

            $totalT4tl = 0;
            $totalT10tl = 0;
            $totalCredits = 0;
            $count = 0;
            $studentData = $groupedScores->map(function ($scores, $semester) use (&$totalT4tl, &$totalT10tl, &$totalCredits, &$count) {
                $isLocked = $scores->every(fn($score) => $score->courseClass->is_locked); 

                if (!$isLocked) {
                    return (object)[
                        'semester' => $semester,
                        'credits' => null,
                        't4Score' => null,
                        't10Score' => null,
                        'tctlhk' => null,
                        't4tl' => null,
                        't10tl' => null,
                        'rank' => null,
                        'tctl' => null,
                        'courses' => $scores,
                    ];
                }
                $count++;
                $credits = 0;
                $totalT4Score = 0;
                $totalT10Score = 0;
                $subCount = 0;
                $tctlhk = 0;
                $scores->each(function ($score) use (&$credits, &$totalT4Score, &$totalT10Score, &$subCount, &$tctlhk) {
                    $subCount++;
                    $credits += (float)$score->courseClass->course->credits;
                    $totalT10Score += (float)$score->t10Score;
                    $totalT4Score += (float)$score->t4Score * $score->courseClass->course->credits;
                    $tctlhk += (float)$score->t10Score >= 4.0 ? (float)$score->courseClass->course->credits : 0;
                });

                $totalT10tl += (float)$totalT10Score;
                $totalT4tl += (float)$totalT4Score;
                $totalCredits += $tctlhk;
                
                $rank = "Yếu";
                if ($credits > 0) {
                    $averageT4Score = round((float)$totalT4Score / $credits, 2);
                    if ($averageT4Score >= 3.6) { $rank = "Xuất sắc";} 
                    else if ($averageT4Score >= 3.2) {$rank = "Giỏi";} 
                    else if ($averageT4Score >= 2.5) {$rank = "Khá";} 
                    else if ($averageT4Score >= 2.0) {$rank = "Trung bình";}
                }

                return (object)[
                    'semester' => $semester,
                    'credits' => $credits,
                    't4Score' => round((float)$totalT4Score / $credits, 2),
                    't10Score' => round((float)$totalT10Score / $subCount, 2),
                    'tctlhk' => $tctlhk,
                    't4tl' => round((float)$totalT4tl / $count, 2),
                    't10tl' => round((float)$totalT10tl / $count, 2),
                    'rank' => $rank,
                    'tctl' => $totalCredits,
                    'courses' => $scores,
                ];
            });
            return inertia('Scores/Scores', [
                'studentData' => $studentData
            ]);
        } else if ($user->role === "Teacher") {
            $idCourseClasses = CourseClass::where('teacher_id', $user->teacher->id)->pluck('id')->toArray();

            $uniqueSchedule = Schedule::whereIn('course_classes_id', $idCourseClasses)
            ->where("isPassed", false)
            ->where('isConfirm', true)
            ->with(['courseClass'])
            ->get()
            ->groupBy('course_classes_id')
            ->map(function ($group) {
                return $group->first();
            });

            $uniqueSchedule->each(function ($schedule) {
                $schedule->scoresData = Score::where('course_classes_id', $schedule->course_classes_id)->with(['student', 'student.user'])->get();
            });

            return inertia('Scores/Scores', [
                'courseClassesData' => $uniqueSchedule->values()
            ]);
        } else {
            $teacherData = Teacher::whereHas('courseClasses', function ($query) {
                $query->whereHas('schedules', function ($scheduleQuery) {
                    $scheduleQuery->where('isConfirm', true)
                                  ->whereColumn('schedules.course_classes_id', 'course_classes.id');
                });
            })->with(['courseClasses' => function ($query) {
                $query->whereHas('schedules', function ($scheduleQuery) {
                    $scheduleQuery->where('isConfirm', true)
                                  ->whereColumn('schedules.course_classes_id', 'course_classes.id');
                })
                ->orderBy('course_classes.name');
            }, 'user'])
            ->get();
            
            $teacherData->each(function ($teacher) {
                $teacher->name = $teacher->user->name;

                unset($teacher->user);
            });

            return inertia('Scores/Scores', [
                'teacherData' => $teacherData
            ]);
        }

        return inertia('Scores/Scores', [
            'studentData' => $studentData,
            'courseClassesData' => $courseClassesData,
        ]);
    }

    public function updateScore(Request $request, $id) {
        $validated = $request->validate([
            'attendance' => 'required|array',
            'assignment' => 'required|array',
            'midTerm' => 'required|array',
            'final' => 'required|array',
        ]);

        try {
            $courseClass = CourseClass::where('id', $id)->with(['scores'])->first();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy lớp học'], 404);
        }
        $scores = $courseClass->scores;

        if (count($validated['attendance']) !== $scores->count()) {
            return response()->json([
                'error' => 'Dữ liệu không hợp lệ: số lượng điểm không khớp với số lượng sinh viên.'
            ], 422);
        }

        foreach ($scores as $index => $score) {
            $score->update([
                'attendance' => $validated['attendance'][$index],
                'assignment' => $validated['assignment'][$index],
                'mid_term' => $validated['midTerm'][$index],
                'final' => $validated['final'][$index],
            ]);
        }
    
        return response()->json([
            'message' => 'Điểm đã được lưu thành công!'
        ]);
    }

    public function confirmScore(Request $request, $id) {
        $validated = $request->validate([
            'attendance' => 'required|array',
            'assignment' => 'required|array',
            'midTerm' => 'required|array',
            'final' => 'required|array',
        ]);

        try {
            $courseClass = CourseClass::where('id', $id)->with(['scores'])->first();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy lớp học'], 404);
        }
        $scores = $courseClass->scores;

        if (count($validated['attendance']) !== $scores->count()) {
            return response()->json([
                'error' => 'Dữ liệu không hợp lệ: số lượng điểm không khớp với số lượng sinh viên.'
            ], 422);
        }

        $courseClass->update([
            'is_enabled' => false,
        ]);

        foreach ($scores as $index => $score) {
            $score->update([
                'attendance' => $validated['attendance'][$index],
                'assignment' => $validated['assignment'][$index],
                'mid_term' => $validated['midTerm'][$index],
                'final' => $validated['final'][$index],
            ]);
        }
    
        return response()->json([
            'message' => 'Điểm đã được lưu thành công!'
        ]);
    }

    private function calculateGrade($score)
    {
        if ($score->attendance && $score->assignment && $score->mid_term && $score->final) {
            $t10Score = ($score->attendance * 0.1 + $score->assignment * 0.2 + $score->mid_term * 0.2 + $score->final * 0.5);
            
            if ($t10Score >= 8.5) return ['t10Score' => $t10Score, 't4Score' => 4, 'grade' => 'A'];
            if ($t10Score >= 6.5) return ['t10Score' => $t10Score, 't4Score' => 3, 'grade' => 'B'];
            if ($t10Score >= 5.0) return ['t10Score' => $t10Score, 't4Score' => 2, 'grade' => 'C'];
            if ($t10Score >= 4.0) return ['t10Score' => $t10Score, 't4Score' => 1, 'grade' => 'D'];

            return ['t10Score' => $t10Score, 't4Score' => 0, 'grade' => 'F'];
        }

        return ['t10Score' => null, 't4Score' => null, 'grade' => null];
    }
}
