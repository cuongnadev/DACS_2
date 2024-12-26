<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = Auth::user();
        if($request->user()->hasVerifiedEmail()) {
            if($user->role === 'Admin') {
                return redirect()->intended(route('admin.students.index', absolute: false));
            } else if($user->role === 'Student') {
                return redirect()->intended(route('sv.schedule.index', absolute: false));
            } else if($user->role === 'Teacher') {
                return redirect()->intended(route('gv.schedule.index', absolute: false));
            }
        }
        return Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
