<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseClass;
use App\Models\Schedule;
use App\Models\Semester;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseClassesController extends Controller
{
    public function courseClasses() {
        $user = Auth::user();

        $courses = [];

        $courses = Course::with([
            'courseClasses', 
            'courseClasses.course', 
            'courseClasses.teacher', 
            'courseClasses.teacher.user'
        ])->get();

        $courses->each(function ($course) {
            $course->courseClasses->each(function ($courseClass) {
                $courseClass->schedule = "$courseClass->day_of_week/$courseClass->period";
            });
        });

        if($user->role === "Admin") {
            $teachers = Teacher::with(['courseClasses', 'user', 'courseClasses.course'])->get();
        } else {
            $teachers = Teacher::where('user_id', $user->id)->with(['courseClasses', 'user', 'courseClasses.course'])->get();
        }

        $semester = Semester::where('is_current', true)->first();

        return inertia('CourseClasses/CourseClasses', [
            'courses' => $courses,
            'teachers' => $teachers,
            'semester' => $semester
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'nameCourseClass' => "required|string|max:255",
            'room' => "required|string|max:50",
            'classSize' => "required|numeric|max:2048",
            'dayOfWeek' => "required|string|max:50",
            'period' => "required|string|max:50",
            'semester' => "required|string|max:100",
            'teacherId' => "required|numeric|max:20" 
        ]);

        CourseClass::create([
            'course_id' => $request->course,
            'teacher_id' => $request->teacherId,
            'name' => $request->nameCourseClass,
            'room' => $request->room,
            'class_size' => $request->classSize,
            'day_of_week' => $request->dayOfWeek,
            'period' => $request->period,
            'semester' => $request->semester
        ]);

        return redirect()->route('admin.courseClasses.index')->with('success', 'Course class added successfully!');
    }

    public function isEnabled($id) {
        $courseClass = CourseClass::where("id", $id)->first();

        if($courseClass->is_enabled) {
            $courseClass->update(['is_enabled' => false]);
            
            return response()->json([
                'success' => 'Course class disabled successfully!'
            ]);
        } else {
            $courseClass->update(['is_enabled' => true]);

            return response()->json([
                'success' => 'Course class enabled successfully!'
            ]);
        }
    }

    public function isLocked($id) {
        $courseClass = CourseClass::where("id", $id)->first();

        if($courseClass->is_locked) {
            $courseClass->update(['is_locked' => false]);
            
            return response()->json([
                'success' => 'Course class unlocked successfully!'
            ]);
        } else {
            $courseClass->update([
                'is_locked' => true,
                'is_enabled' => false
            ]);

            return response()->json([
                'success' => 'Course class locked successfully!'
            ]);
        }
    }

    public function destroy($id) {
        $courseClass = CourseClass::where("id", $id)->first();

        if(!$courseClass) {
            return redirect()->route('admin.courseClasses.index')->with('error', 'Course class not found.');
        }

        $courseClass->delete();

        return redirect()->route('admin.courseClasses.index')->with('success', 'Course class deleted successfully!');
    }

    public function modify(Request $request, $id) {
        $request->validate([
            'nameCourseClass' => "required|string|max:255",
            'room' => "required|string|max:50",
            'classSize' => "required|numeric|max:2048",
            'dayOfWeek' => "required|string|max:50",
            'period' => "required|string|max:50",
        ]);

        $courseClass = CourseClass::where("id", $id)->first();
        $courseClass->update([
            'name' => $request->nameCourseClass,
            'room' => $request->room,
            'class_size' => $request->classSize,
            'day_of_week' => $request->dayOfWeek,
            'period' => $request->period
        ]);
        
        return redirect()->route('admin.courseClasses.index')->with('success', 'Course class modified successfully!');
    }

    public function showListStudent($id) {
        $listStudents = Schedule::where('course_classes_id', $id)
        ->with(['student', 'student.user'])
        ->get()
        ->filter(function ($item) {
            return $item->isConfirm === 1;
        })->pluck('student');

        return response()->json([
            'students' => $listStudents
        ]);
    }
}
