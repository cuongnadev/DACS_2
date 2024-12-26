<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            if($request->user()->role === 'Admin') {
                return redirect()->intended(route('admin.students.index', absolute: false).'?verified=1');
            } else if($request->user()->role === 'Student') {
                return redirect()->intended(route('sv.schedule.index', absolute: false).'?verified=1');
            } else if($request->user()->role === 'Teacher') {
                return redirect()->intended(route('gv.schedule.index', absolute: false).'?verified=1');
            }
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }
        
        if($request->user()->role === 'Admin') {
            return redirect()->intended(route('admin.students.index', absolute: false).'?verified=1');
        } else if($request->user()->role === 'Student') {
            return redirect()->intended(route('sv.schedule.index', absolute: false).'?verified=1');
        } else if($request->user()->role === 'Teacher') {
            return redirect()->intended(route('gv.schedule.index', absolute: false).'?verified=1');
        }
    }
}
