<?php

namespace App\Http\Controllers;

use App\Models\Semester;
use Illuminate\Http\Request;

class SemestersController extends Controller
{
    public function newSemester() {
        $currentSemester = Semester::where('is_current', true)->first();

        if($currentSemester) {
            $currentSemester->is_current = false;
            $currentSemester->is_open = false;
            $currentSemester->save();

            // Xác định học kỳ tiếp theo
            $nextOrder = $currentSemester->order === 1 ? 2 : 1;
            $nextYear = $nextOrder === 1 ? $currentSemester->year + 1 : $currentSemester->year;
            $nextNextYear = $nextYear + 1;

            Semester::create([
                'name' => "Học kỳ $nextOrder, năm $nextYear - $nextNextYear",
                'order' => $nextOrder,
                'year' => $nextYear,
                'is_current' => true,
                'is_open' => false,
            ]);
        } else {
            $yearStart = date('Y');
            $yearEnd = $yearStart + 1;
            Semester::create([
                'name' => "Học kỳ 1, năm $yearStart - $yearEnd",
                'order' => 1,
                'year' => $yearStart,
                'is_current' => true,
                'is_open' => false,
            ]);
        }
        return redirect()->route('admin.courseClasses.index')->with('success', 'Semester new successfully!');
    }

    public function updateSemesterStatus() {
        $currentSemester = Semester::where('is_current', true)->first();

        if($currentSemester) {
            $currentSemester->is_open =!$currentSemester->is_open;
            $currentSemester->save();
        }

        return redirect()->route('admin.courseClasses.index')->with('success', 'Update status successfully!');
    }
}
