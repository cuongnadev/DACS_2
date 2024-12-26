<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_classes_id',
        'attendance',
        'assignment',
        'mid_term',
        'final',

    ];

    public function student() {
        return $this->belongsTo(Student::class);
    }

    public function courseClass() {
        return $this->belongsTo(CourseClass::class, 'course_classes_id');
    }
}
