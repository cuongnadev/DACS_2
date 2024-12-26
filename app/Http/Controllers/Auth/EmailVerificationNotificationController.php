<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $user = Auth::user();

            if($user->role === 'Admin') {
                return redirect()->intended(route('admin.students.index', absolute: false));
            } else if($user->role === 'Student') {
                return redirect()->intended(route('sv.schedule.index', absolute: false));
            } else if($user->role === 'Teacher') {
                return redirect()->intended(route('gv.schedule.index', absolute: false));
            }
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
