<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatisticalController extends Controller
{
    public function statistical () {
        $numOfMale = Student::where('sex', 'Nam')->count();
        $numOfFemale = Student::where('sex', 'Nữ')->count();

        $majorStudentCounts = Student::select('major', \DB::raw('count(*) as count'))
        ->groupBy('major')
        ->get()
        ->map(function ($item) {
            $major = str_replace('và', '&', $item->major);

            $words = explode(' ', $major);
            $abbreviation = '';

            foreach ($words as $word) {
                $abbreviation.= strtoupper(substr($word, 0, 1));
            }
            return [
                'name' => $abbreviation,
                'value' => $item->count,
                'fullName' => $item->major
            ];
        });

        $majorTeacherCounts = Teacher::select('major', \DB::raw('count(*) as count'))
        ->groupBy('major')
        ->get()
        ->map(function ($item) {
            $major = str_replace('và', '&', $item->major);

            $words = explode(' ', $major);
            $abbreviation = '';

            foreach ($words as $word) {
                $abbreviation.= strtoupper(substr($word, 0, 1));
            }
            return [
                'name' => $abbreviation,
                'value' => $item->count,
                'fullName' => $item->major
            ];
        });

        $data = [
            'dataSex' => [
                ['name' => 'Nam', 'value' => $numOfMale],
                ['name' => 'Nữ', 'value' => $numOfFemale]
            ],
            'dataStudentMajor' => $majorStudentCounts,
            'dataTeacherMajor' => $majorTeacherCounts,
        ];
        return Inertia::render('statistical/Statistical', [
            'data' => $data
        ]);
    }
}
