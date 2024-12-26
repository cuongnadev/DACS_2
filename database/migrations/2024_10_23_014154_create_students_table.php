<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('image_url')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('personal_email')->nullable();
            $table->date('dob');
            $table->string('pob');
            $table->string('sex');
            $table->string('phone');
            $table->string('zalo')->nullable();
            $table->string('facebook')->nullable();
            $table->string('dan_toc')->nullable();
            $table->string('ton_giao')->nullable();
            $table->string('cccd')->nullable();
            $table->date('cccd_date')->nullable();
            $table->string('address');
            $table->string('student_code')->unique();
            $table->string('major');
            $table->string('khoa');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('grade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
