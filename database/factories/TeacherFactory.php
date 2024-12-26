<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sex' => $this->faker->randomElement(['Nam', 'Nữ']),
            'user_id' => User::factory()->teacher()->create(), 
            'personal_email' => null,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'image_url' => null,
            'dob' => $this->faker->date(),
            'pob' => $this->faker->city,
            'university' => $this->faker->company,
            'degree' => $this->faker->randomElement(['Cử nhân', 'Thạc sĩ', 'Tiến sĩ']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'city' => $this->faker->city,
            'major' => "Kỹ thuật phần mềm",
            'khoa' => "Khoa công nghệ phần mềm",
        ];
    }
}
