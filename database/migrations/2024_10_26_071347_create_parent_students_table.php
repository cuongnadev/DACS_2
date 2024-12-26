<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\table;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parent_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->string('father_name')->nullable();
            $table->string('father_date')->nullable();
            $table->string('father_ethnic')->nullable();
            $table->string('father_education_level')->nullable();
            $table->string('father_job')->nullable();
            $table->string('father_residence')->nullable();
            $table->string('father_email')->nullable();
            $table->string('father_phone')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_date')->nullable();
            $table->string('mother_ethnic')->nullable();
            $table->string('mother_education_level')->nullable();
            $table->string('mother_job')->nullable();
            $table->string('mother_residence')->nullable();
            $table->string('mother_email')->nullable();
            $table->string('mother_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parent_students');
    }
};
