<?php

namespace App\Http\Controllers;

use App\Models\CourseClass;
use App\Models\Schedule;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function schedule() {
        $user = Auth::user();
        $schedules = [];

        if($user->role === "Student") {
            $schedules = Schedule::where('student_id', $user->student->id)
            ->where('isConfirm', true)
            ->with(['courseClass'])
            ->get()
            ->pluck('courseClass');

            $schedules->each(function($schedule) {
                $periodExplode = explode("-", $schedule->period);
                $schedule->day = $schedule->day_of_week;
                $schedule->period = $periodExplode[0];
                $schedule->rowspan = $periodExplode[1] - $periodExplode[0] + 1;
            });
        } else {
            $courseClassesID = CourseClass::where('teacher_id', $user->teacher->id)->get()->pluck('id')->toArray();

            $schedules = Schedule::whereIn('course_classes_id', $courseClassesID)
            ->where('isConfirm', true)
            ->with(['courseClass'])
            ->distinct('course_classes_id')
            ->get();

            if($schedules) {
                $schedules->each(function($schedule) {
                    $periodExplode = explode("-", $schedule->courseClass->period);
                    $schedule->day = $schedule->courseClass->day_of_week;
                    $schedule->period = (int)$periodExplode[0];
                    $schedule->rowspan = (int)$periodExplode[1] - (int)$periodExplode[0] + 1;
                });
            }
        }
        return inertia('Schedule/Schedule', [
            'schedules' => $schedules,
        ]);
    }
}
