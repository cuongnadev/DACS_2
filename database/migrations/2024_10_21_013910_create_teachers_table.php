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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('sex');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('personal_email')->nullable();
            $table->string('phone');
            $table->string('address');
            $table->string('image_url')->nullable();
            $table->date('dob');
            $table->string('pob');
            $table->string('university');
            $table->string('degree');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('city');
            $table->string('major');
            $table->string('khoa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
