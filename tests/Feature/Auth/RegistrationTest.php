<?php

use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $user = User::factory()->unverified()->create();

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();

    if($user->role === 'Admin') {
        $response->assertRedirect(route('students.index', absolute: false));
    } else if(in_array($user->role, ['Student', 'Teacher'])) {
        $response->assertRedirect(route('schedule.index', absolute: false));
    }
});
