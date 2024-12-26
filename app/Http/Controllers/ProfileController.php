<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function profile() {
        $user = Auth::user();
        if($user->role == "Student") {
            $userStudent = User::with('student')->find($user->id);
            $parentStudent = $userStudent->student->parentStudent;

            $dataFather = [
                "name" => $parentStudent->father_name,
                "date" => $parentStudent->father_date,
                "ethnic" => $parentStudent->father_ethnic,
                "education_level" => $parentStudent->father_education_level,
                "job" => $parentStudent->father_job,
                "residence" => $parentStudent->father_residence,
                "email" => $parentStudent->father_email,
                "phone" => $parentStudent->father_phone,
            ];
    
            $dataMother = [
                "name" => $parentStudent->mother_name,
                "date" => $parentStudent->mother_date,
                "ethnic" => $parentStudent->mother_ethnic,
                "education_level" => $parentStudent->mother_education_level,
                "job" => $parentStudent->mother_job,
                "residence" => $parentStudent->mother_residence,
                "email" => $parentStudent->mother_email,
                "phone" => $parentStudent->mother_phone,
            ];
    
            $dataParents = [
                "father" => $dataFather,
                "mother" => $dataMother
            ];
        } else {
            $userTeacher = User::with('teacher')->find($user->id);
        }

        return Inertia::render('Profile/Profile', [
            'dataProfile' => $user->role == "Student" ? $userStudent : $userTeacher,
            'parents' => $user->role == "Student" ? $dataParents : '',
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $request->validate([
            'image' => 'nullable|image|max:5120',
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
            'pob' => 'required|string|max:255',
            'sex' => 'required|string|max:50',
            'personal_email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        if ($user->role === "Student") {
            $request->validate([
                'cccd' => 'nullable|string|max:20',
                'cccd_date' => 'nullable|date',
                'ton_giao' => 'nullable|string|max:50',
                'dan_toc' => 'nullable|string|max:50',
                'zalo' => 'nullable|string|max:20',
                'facebook' => 'nullable|string|max:20',
            ]);
        } else {
            $request->validate([
                'university' => 'nullable|string|max:255',
                'degree' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
            ]);
        }

        if($request->hasFile('image')) {
            $imagePath = $request->image->store('images', 'public');
        }

        $user->update([
            'name' => $request->name
        ]);

        if($user->role === "Student") {
            $user->student->update([
                'image_url' => $imagePath ?? $user->student->image_url,
                'personal_email' => $request->personal_email,
                'dob' => $request->dob,
                'pob' => $request->pob,
                'sex' => $request->sex,
                'phone' => $request->phone,
                'zalo' => $request->zalo,
                'facebook' => $request->facebook,
                'address' => $request->address,
                'cccd' => $request->cccd,
                'cccd_date' => $request->cccd_date,
                'ton_giao' => $request->ton_giao,
                'dan_toc' => $request->dan_toc,
            ]);
            $user->student->parentStudent->update([
                'father_name' => $request->father['name'],
                'father_date' => $request->father['date'],
                'father_ethnic'=> $request->father['ethnic'],
                'father_education_level'=> $request->father['education_level'],
                'father_job'=> $request->father['job'],
                'father_residence'=> $request->father['residence'],
                'father_email'=> $request->father['email'],
                'father_phone'=> $request->father['phone'],
                'mother_name'=> $request->mother['name'],
                'mother_date'=> $request->mother['date'],
                'mother_ethnic'=> $request->mother['ethnic'],
                'mother_education_level'=> $request->mother['education_level'],
                'mother_job'=> $request->mother['job'],
                'mother_residence'=> $request->mother['residence'],
                'mother_email'=> $request->mother['email'],
                'mother_phone'=> $request->mother['phone'],
            ]);
            return Redirect::route('sv.profile.index');
        } else {
            $user->teacher->update([
                'image_url' => $imagePath ?? $user->teacher->image_url,
                'sex' => $request->sex,
                'personal_email' => $request->personal_email,
                'phone' => $request->phone,
                'address' => $request->address,
                'dob' => $request->dob,
                'pob' => $request->pob,
                'university' => $request->university,
                'degree' => $request->degree,
                'city' => $request->city,
            ]);
            return Redirect::route('gv.profile.index');
        }

    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}