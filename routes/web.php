<?php

use App\Http\Controllers\{
    CourseClassesController,
    CoursesController,
    ProfileController,
    ScheduleController,
    ScoresController,
    SemestersController,
    StatisticalController,
    StudentsController,
    TeachersController,
    UserController
};

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        $user = Auth::user();
        return match ($user->role) {
            'Admin' => redirect('/admin/students'),
            'Student' => redirect('/sv/schedule'),
            'Teacher' => redirect('/gv/schedule'),
            default => abort(403),
        };
    })->name('home');

    Route::get('/account', [UserController::class, 'account'])->name('account.index');
    Route::patch('/account/update', [UserController::class, 'update'])->name('account.update');
    Route::get('/account/image', [UserController::class, 'getUrlImage'])->name('account.getImage');

    // Admin routes
    Route::prefix('admin')->middleware([RoleMiddleware::class . ':Admin'])->name('admin.')->group(function () {
        Route::get('/courses', [CoursesController::class, 'courses'])->name('courses.index');
        Route::post('/courses/add', [CoursesController::class, 'store'])->name('courses.add');
        Route::delete('/courses/{id}', [CoursesController::class, 'destroy'])->name('courses.destroy');
        Route::patch('/courses/modify/{id}', [CoursesController::class, 'modify'])->name('courses.modify');

        Route::get('/course-classes', [CourseClassesController::class, 'courseClasses'])->name('courseClasses.index');
        Route::get('/course-classes/{id}', [CourseClassesController::class, 'showListStudent'])->name('courseClasses.listStudent');
        Route::post('/course-classes/add', [CourseClassesController::class, 'store'])->name('courseClasses.add');
        Route::delete('/course-classes/{id}', [CourseClassesController::class, 'destroy'])->name('courseClasses.destroy');
        Route::patch('/course-classes/modify/{id}', [CourseClassesController::class, 'modify'])->name('courseClasses.modify');
        Route::patch('/course-classes/enabled/{id}', [CourseClassesController::class, 'isEnabled'])->name('courseClasses.enabled');
        Route::patch('/course-classes/locked/{id}', [CourseClassesController::class, 'isLocked'])->name('courseClasses.locked');

        Route::get('/scores', [ScoresController::class, 'scores'])->name('scores.index');

        Route::get('/students', [StudentsController::class, 'students'])->name('students.index');
        Route::get('/students/search', [StudentsController::class, 'search'])->name('students.search');
        Route::get('/students/sort', [StudentsController::class, 'sort'])->name('students.sort');
        Route::get('/students/add', [StudentsController::class, 'showAdd'])->name('students.add');
        Route::post('/students/add', [StudentsController::class, 'store'])->name('students.store');
        Route::delete('/students/{id}', [StudentsController::class, 'destroy'])->name('students.destroy');

        Route::get('/teachers', [TeachersController::class, 'teachers'])->name('teachers.index');
        Route::get('/teachers/search', [TeachersController::class, 'search'])->name('teachers.search');
        Route::get('/teachers/add', [TeachersController::class, 'showAdd'])->name('teachers.add');
        Route::post('/teachers/add', [TeachersController::class, 'store'])->name('teachers.store');
        Route::delete('/teachers/{id}', [TeachersController::class, 'destroy'])->name('teachers.destroy');

        Route::get('/statistical', [StatisticalController::class, 'statistical'])->name('statistical.index');
        
        Route::post('/semester', [SemestersController::class, 'newSemester'])->name('semester.store');
        Route::patch('/semester', [SemestersController::class, 'updateSemesterStatus'])->name('semester.update');
    });

    // Student routes
    Route::prefix('sv')->middleware([RoleMiddleware::class . ':Student'])->name('sv.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'profile'])->name('profile.index');
        Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/courses', [CoursesController::class, 'courses'])->name('courses.index');
        Route::post('/courses/register', [CoursesController::class, 'register'])->name('courses.register');
        Route::patch('/courses/confirm', [CoursesController::class, 'confirm'])->name('courses.confirm');
        Route::delete('/courses/cancel/{id}', [CoursesController::class, 'cancel'])->name('courses.cancel');

        Route::get('/schedule', [ScheduleController::class, 'schedule'])->name('schedule.index');

        Route::get('/scores', [ScoresController::class, 'scores'])->name('scores.index');

        Route::get('/teachers', [TeachersController::class, 'teachers'])->name('teachers.index');
        Route::get('/teachers/search', [TeachersController::class, 'search'])->name('teachers.search');
        
    });

    // Teacher routes
    Route::prefix('gv')->middleware([RoleMiddleware::class . ':Teacher'])->name('gv.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'profile'])->name('profile.index');
        Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/courses', [CoursesController::class, 'courses'])->name('courses.index');

        Route::get('/course-classes', [CourseClassesController::class, 'courseClasses'])->name('courseClasses.index');
        Route::get('/course-classes/{id}', [CourseClassesController::class, 'showListStudent'])->name('courseClasses.listStudent');
        
        Route::get('/schedule', [ScheduleController::class, 'schedule'])->name('schedule.index');

        Route::get('/scores', [ScoresController::class, 'scores'])->name('scores.index');
        Route::patch('/scores/update/{id}', [ScoresController::class, 'updateScore'])->name('scores.update');
        Route::patch('/scores/confirm/{id}', [ScoresController::class, 'confirmScore'])->name('scores.confirm');

        Route::get('/students', [StudentsController::class, 'students'])->name('students.index');
        Route::get('/students/search', [StudentsController::class, 'search'])->name('students.search');
        Route::get('/students/sort', [StudentsController::class, 'sort'])->name('students.sort');

        Route::get('/teachers', [TeachersController::class, 'teachers'])->name('teachers.index');
        Route::get('/teachers/search', [TeachersController::class, 'search'])->name('teachers.search');

    });
});

require __DIR__.'/auth.php';
