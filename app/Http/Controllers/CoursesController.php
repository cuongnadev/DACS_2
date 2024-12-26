<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseClass;
use App\Models\Schedule;
use App\Models\Score;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPSTORM_META\map;

class CoursesController extends Controller
{
    public function courses() {
        $user = Auth::user();
        $courses = [];
        $courseClassesRegister = [];

        $semester = Semester::where('is_current', true)->first();

        $courses = Course::with([
            'courseClasses' => function ($query) use ($semester) {
                $query->where('semester', $semester->name); // Lọc theo semester
            },
            'courseClasses.course',
            'courseClasses.teacher',
            'courseClasses.teacher.user'
        ])->get();

        $courses->each(function ($course) {
            $course->courseClasses->each(function ($courseClass) {
                $courseClass->schedule = "$courseClass->day_of_week/$courseClass->period";
            });
        });
        if($user->role === "Student") {
            $courseClassesRegister = Schedule::where('student_id', $user->student->id)
            ->with(['courseClass.course', 'courseClass.teacher', 'courseClass.teacher.user'])
            ->get()
            ->filter(function ($registration) {
                return !$registration->isConfirm;
            })
            ->map(function ($registration) {
                return $registration->courseClass;
            })
            ->filter()
            ->values();

            $courseClassesRegisterId = Schedule::where('student_id', $user->student->id)->pluck('course_classes_id')->toArray();
            $courses = $courses->filter(function ($course) use ($courseClassesRegisterId) {
                $hasRegisteredClass = $course->courseClasses->contains(function ($courseClass) use ($courseClassesRegisterId) {
                    return in_array($courseClass->id, $courseClassesRegisterId);
                });

                return !$hasRegisteredClass;
            })->values();

            $scheduleRegisters = Schedule::where('student_id', $user->student->id)
            ->where('isConfirm', false)
            ->with(['courseClass'])
            ->get()
            ->groupBy('courseClass.day_of_week')
            ->map(function ($schedule, $dayOfWeek) {
                $period = $schedule->first();
                $period = array_map('intval', explode('-', $period->courseClass->period));

                return [
                    'day_of_week' => $dayOfWeek,
                    'period' => $period,
                ];
            })
            ->values();

            $courses->map(function ($course) use ($scheduleRegisters) {
                $course->courseClasses->map(function ($courseClass) use ($scheduleRegisters) {
                    $courseClass->isClash = false;
            
                    foreach ($scheduleRegisters as $schedule) {
                        if (is_string($courseClass->period)) {
                            $periods = explode('-', $courseClass->period);
                        }
                        if ($schedule['day_of_week'] === $courseClass->day_of_week &&
                            (in_array($schedule['period'][0], $periods) || in_array($schedule['period'][1], $periods))
                        ) {
                            $courseClass->isClash = true;
                            break;
                        }
                    }
            
                    return $courseClass;
                });
            
                return $course;
            })->values()->toArray();
        }

        return inertia('Courses/Courses', [
            'courses' => $courses,
            'courseClassesRegister' => $courseClassesRegister,
            'semester' => $semester,
        ]);
    }

    public function store(Request $request) {
        $user = Auth::user();

        if($user->role === "Admin") {
            $request->validate([
                'nameCourse' => "required|string|max:255",
                'periods' => "required|string|max:50",
                'credits' => "required|string|max:50"
            ]);

            Course::create([
                'name' => $request->nameCourse,
                'credits' => $request->credits,
                'num_of_periods' => $request->periods
            ]);

            return redirect()->route('admin.courses.index')->with('success', 'Course added successfully!');
        }
    }

    public function register(Request $request) {
        $user = Auth::user();
        Schedule::create([
            'course_classes_id' => $request->courseId,
            'student_id' => $user->student->id,
            'isPassed' => false
        ]);

        CourseClass::where('id', $request->courseId)->increment('num_registered');

        return redirect()->route('sv.courses.index')->with('success', 'Register course class successfully!');
    }

    public function cancel($id) {
        $user = Auth::user();
        $schedule = Schedule::where('course_classes_id', $id)->where('student_id', $user->student->id)->first();
        
        if(!$schedule) {
            return redirect()->route('sv.courses.index')->with('error', 'Course not found.');
        }

        $schedule->delete();

        CourseClass::where('id', $id)->decrement('num_registered');

        return redirect()->route('sv.courses.index')->with('success', 'Course canceled successfully!');
    }

    public function confirm(Request $request) {
        $user = Auth::user();

        if ($user->role === "Student") {
            $courseClassesRegister = $request->input('data');
    
            if (empty($courseClassesRegister)) {
                return redirect()->route('courses.index')->with('error', 'Không có lớp học phần nào để xác nhận!');
            }
    
            $totalCredits = CourseClass::whereIn('id', $courseClassesRegister)
                ->with('course')
                ->get()
                ->sum('course.credits');
    
            if ($totalCredits >= 14 && $totalCredits <= 24) {
                Schedule::whereIn('course_classes_id', $courseClassesRegister)
                    ->where('student_id', $user->student->id)
                    ->update(['isConfirm' => true]);

                foreach($courseClassesRegister as $courseClassRegister) {
                    Score::create([
                        'student_id' => Auth::user()->student->id,
                        'course_classes_id' => $courseClassRegister,
                        'attendance' => null,
                        'assignment' => null,
                        'mid_term' => null,
                        'final' => null,
                        "is_enabled" => false,
                        'is_locked' => false,
                    ]);
                };
                
                return redirect()->route('sv.schedule.index')->with('success', 'Đã xác nhận các lớp học phần thành công!');
            } else {
                return redirect()->route('sv.courses.index')->with('error', 'Tổng số tín chỉ phải từ 14 đến 24!');
            }
        }
    }

    public function destroy($id) {
        $user = Auth::user();

        if($user->role === "Admin") {
            $course = Course::where("id", $id)->first();

            if(!$course) {
                return redirect()->route('admin.courses.index')->with('error', 'Course not found.');
            }

            $course->delete();

            return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully!');
        }
    }

    public function modify(Request $request, $id) {
        $user = Auth::user();

        if($user->role === "Admin") {
            $request->validate([
                'nameCourse' => "required|string|max:255",
                'periods' => "required|string|max:50",
                'credits' => "required|string|max:50"
            ]);

            $course = Course::where("id", $id)->first();
            $course->update([
                'name' => $request->nameCourse,
                'credits' => $request->credits,
                'num_of_periods' => $request->periods
            ]);

            return redirect()->route('admin.courses.index')->with('success', 'Course modified successfully!');
        }
    }
}
