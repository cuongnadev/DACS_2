<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'personal_email',
        'image_url',
        'user_id',
        'dob',
        'pob',
        'sex',
        'phone',
        'dan_toc',
        'ton_giao',
        'cccd',
        'cccd_date',
        'address',
        'student_code',
        'major',
        'khoa',
        'start_date',
        'end_date',
        'grade',
    ];

    // relationship
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function parentStudent() {
        return $this->hasOne(ParentStudent::class);
    }

    public function scores() {
        return $this->hasMany(Score::class);
    }

    public function schedule() {
        return $this->hasMany(Schedule::class, 'student_id');
    }
}
