<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParentStudent>
 */
class ParentStudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => null, // Sẽ được điền sau
            'father_name' => null,
            'father_date' => null,
            'father_ethnic' => null,
            'father_education_level' => null,
            'father_job' => null,
            'father_residence' => null,
            'father_email' => null,
            'father_phone' => null,
            'mother_name' => null,
            'mother_date' => null,
            'mother_ethnic' => null,
            'mother_education_level' => null,
            'mother_job' => null,
            'mother_residence' => null,
            'mother_email' => null,
            'mother_phone' => null,
        ];
    }
}
