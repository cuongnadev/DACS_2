<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_classes_id',
        'isPassed',
        'isConfirm',
    ];

    public function courseClass() {
        return $this->belongsTo(CourseClass::class, 'course_classes_id');
    }

    public function student() {
        return $this->belongsTo(Student::class,'student_id');
    }
}
