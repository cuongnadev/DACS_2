<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'sex',
        'personal_email',
        'user_id',
        'phone',
        'address',
        'image_url',
        'dob',
        'pob',
        'university',
        'degree',
        'start_date',
        'end_date',
        'city',
        'major',
        'khoa',
    ];

    // relationship
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function courseClasses () {
        return $this->hasMany(CourseClass::class);
    }
}
