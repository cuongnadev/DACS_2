<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function account() {
        return Inertia::render('Account/Account');
    }

    public function update(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
        ]);

        $user = Auth::user();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
    }

    public function getUrlImage() {
        $user = Auth::user();

        if ($user->role === "Student") {
            $student = Student::where('user_id', $user->id)->first();
            return response()->json(['url' => $student->image_url]);
        } elseif ($user->role === "Teacher") {
            $teacher = Teacher::where('user_id', $user->id)->first();
            return response()->json(['url' => $teacher->image_url]);
        }
        return response()->json(['url' => null]);
    } 
}
