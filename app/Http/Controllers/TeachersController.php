<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Normalizer;

class TeachersController extends Controller
{
    public function teachers(Request $request) {
        $perPage = 15;

        $teachers = Teacher::with('user')->paginate($perPage);

        if($request->wantsJson()) {
            return response()->json([
                'teachers' => $teachers
            ]);
        }
        
        return inertia('Teacher/Teacher', [
            'teachers' => $teachers,
            'flash' => session('success'),
        ]);
    }

    public function showAdd() {
        return inertia('Teacher/AddNewTeacher');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'sex' => 'required|string|max:50',
            'personalEmail' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'imageUrl' => 'nullable|image|max:2048',
            'dob' => 'required|date',
            'pob' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'city' => 'required|string|max:255',
            'major' => 'nullable|string|max:255',
            'khoa' => 'nullable|string|max:255',
        ]);

        $nameParts = explode(' ', $this->removeVietnameseAccents($request->name));
        $shortName = strtolower(array_pop($nameParts));
        foreach ($nameParts as $part) {
            $shortName .= strtolower(mb_substr($part, 0, 1));
        }
        $email = $shortName . random_int(100, 999) . '.gv@akademi.cc.vn';

        $request->validate([
            'email' => 'unique:users,email,' . $email,
        ]);

        $user = User::factory()->teacher()->create([
            'name' => $request->name,
            'email' => $email,
        ]);

        $teacher = new Teacher();
        $teacher->sex = $request->sex;
        $teacher->user_id = $user->id;
        $teacher->phone = $request->phone;
        $teacher->address = $request->address;
        $teacher->dob = $request->dob;
        $teacher->pob = $request->pob;
        $teacher->university = $request->university;
        $teacher->degree = $request->degree;
        $teacher->start_date = $request->startDate;
        $teacher->end_date = $request->endDate;
        $teacher->city = $request->city;
        $teacher->major = $request->major;
        $teacher->khoa = $request->khoa;

        if($request->hasFile('imageUrl')) {
            $imagePath = $request->imageUrl->store('images', 'public');
            $teacher->image_url = $imagePath;
        }

        $teacher->save();
        return redirect()->route('admin.teachers.index')->with('success', 'Teacher added successfully!');
    }

    public function destroy($id) {
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return redirect()->route('admin.teachers.index')->with('error', 'Teacher not found!');
        }
        
        $user = $teacher->user;
    
        $teacher->delete();
        $user->delete();
    
        return redirect()->route('admin.teachers.index')->with('success', 'Teacher deleted successfully!');
    }

    public function search(Request $request)
    {
        $perPage = 15;
        $search = $request->query('search');

        $teachers = Teacher::with('user')
        ->whereHas('user', function ($teacher) use($search) {
            if($search) {
                $teacher->where('name', 'like', '%' . $search . '%');
            }
        })
        ->paginate($perPage);

        return response()->json($teachers);
    }

    function removeVietnameseAccents($str) {
        $str = normalizer_normalize($str, Normalizer::FORM_D);
    
        return preg_replace('/\p{M}/u', '', $str);
    }
}
