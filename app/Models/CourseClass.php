<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'teacher_id',
        'name',
        'class_size',
        'num_registered',
        'room',
        'day_of_week',
        'period',
        'semester',
        "is_enabled",
        'is_locked'
    ];

    public function course () {
        return $this->belongsTo(Course::class);
    }

    public function teacher () {
        return $this->belongsTo(Teacher::class);
    }

    public function schedules() {
        return $this->hasMany(Schedule::class, 'course_classes_id');
    }

    public function scores() {
        return $this->hasMany(Score::class, 'course_classes_id', 'id');
    }
}
