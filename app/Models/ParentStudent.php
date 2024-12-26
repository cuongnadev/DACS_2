<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'father_name',
        'father_date',
        'father_ethnic',
        'father_education_level',
        'father_job',
        'father_residence',
        'father_email',
        'father_phone',
        'mother_name',
        'mother_date',
        'mother_ethnic',
        'mother_education_level',
        'mother_job',
        'mother_residence',
        'mother_email',
        'mother_phone',
    ];

    // relationship
    public function student() {
        return $this->belongsTo(Student::class);
    }
}
