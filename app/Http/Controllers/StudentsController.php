<?php

namespace App\Http\Controllers;

use App\Models\ParentStudent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Normalizer;

class StudentsController extends Controller
{
    public function students(Request $request) {
        $perPage = 8;
        $selectedYear = now()->format('y');
        if($request->year) {
            $selectedYear = $request->year;
        }
        $students = Student::with('user')
        ->where('student_code', 'like', $selectedYear.'%')
        ->paginate($perPage);
        
        $years = Student::selectRaw('SUBSTRING(student_code, 1, 2) as year')
        ->distinct()
        ->orderBy('year', 'desc')
        ->pluck('year');

        if ($request->wantsJson()) {
            // Nếu yêu cầu là API (JSON), trả dữ liệu dưới dạng JSON
            return response()->json([
                'students' => $students,
            ]);
        }

        return inertia('Student/Student', [
            'students' => $students,
            'years' => $years,
            'selectedYear' => $selectedYear
        ]);
    }

    public function showAdd() {
        return inertia('Student/AddNewStudent');
    }

    public function store(Request $request) {
        $request->validate([
            'imageUrl' => 'nullable|image|max:5120',
            'name' => 'required|string|max:255',
            'personalEmail' => 'nullable|email|max:255',
            'dob' => 'required|date',
            'pob' => 'required|string|max:255',
            'sex' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'danToc' => 'nullable|string|max:50',
            'tonGiao' => 'nullable|string|max:50',
            'cccd' => 'nullable|string|max:20',
            'cccdDate' => 'nullable|date',
            'address' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'khoa' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'grade' => 'required|string|max:255',
        ]);
        $randomNumber = random_int(10000, 99999);
        $nameParts = explode(' ', $this->removeVietnameseAccents($request->name));
        $shortName = strtolower(array_pop($nameParts));
        foreach ($nameParts as $part) {
            $shortName .= strtolower(mb_substr($part, 0, 1));
        }
        $email = $shortName . $randomNumber . '@akademi.cc.vn';

        $request->validate([
            'email' => 'unique:users,email,' . $email,
        ]);

        $user = User::factory()->student()->create([
            'name' => $request->name,
            'email' => $email,
        ]);

        $student = new Student();
        $student->user_id = $user->id;
        $student->personal_email = $request->personalEmail;
        $student->dob = $request->dob;
        $student->pob = $request->pob;
        $student->sex = $request->sex;
        $student->phone = $request->phone;
        $student->zalo = $request->zalo;
        $student->facebook = $request->facebook;
        $student->dan_toc = $request->danToc;
        $student->ton_giao = $request->tonGiao;
        $student->cccd = $request->cccd;
        $student->cccd_date = $request->cccdDate;
        $student->address = $request->address;
        $student->major = $request->major;
        $student->khoa = $request->khoa;
        $student->start_date = $request->startDate;
        $student->end_date = $request->endDate;
        $student->grade = $request->grade;

        $year = now()->format('y');
        $student->student_code = $year . 'Aka' . $randomNumber;

        if($request->hasFile('imageUrl')) {
            $imagePath = $request->imageUrl->store('images', 'public');
            $student->image_url = $imagePath;
        }

        $student->save();

        ParentStudent::create([
            'student_id' => $student->id,
            'father_name' => null,
            'father_date' => null,
            'father_ethnic'=> null,
            'father_education_level'=> null,
            'father_job'=> null,
            'father_residence'=> null,
            'father_email'=> null,
            'father_phone'=> null,
            'mother_name'=> null,
            'mother_date'=> null,
            'mother_ethnic'=> null,
            'mother_education_level'=> null,
            'mother_job'=> null,
            'mother_residence'=> null,
            'mother_email'=> null,
            'mother_phone'=> null,
        ]);
        return redirect()->route('admin.students.index')->with('success', 'Student added successfully!');
    }

    public function destroy($id) {
        $student = Student::find($id);
        
        if (!$student) {
            return redirect()->route('admin.students.index')->with('error', 'Student not found.');
        }
    
        $user = $student->user;
    
        $student->delete();
        $user->delete();
    
        return redirect()->route('admin.students.index')->with('success', 'Student deleted successfully!');
    }

    public function search(Request $request) {
        $perPage = 8;
        $search = $request->query('search');

        $students = Student::with('user')
        ->whereHas('user', function ($student) use ($search) {
            if($student) {
                $student->where("name", "like", "%" . $search . "%");
            }
        })
        ->paginate($perPage);

        return response()->json($students);
    }

    public function sort(Request $request) {
        $perPage = 8;
        $selectedYear = $request->query('year');

        $students = Student::with('user')
        ->where('student_code', 'like', $selectedYear.'%')
        ->paginate($perPage);

        $data = [
            'students' => $students,
            'selectedYear' => $selectedYear
        ];

        return response()->json($data);
    }

    function removeVietnameseAccents($str) {
        $str = normalizer_normalize($str, Normalizer::FORM_D);
    
        return preg_replace('/\p{M}/u', '', $str);
    }
}
