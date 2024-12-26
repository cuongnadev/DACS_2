<?php

namespace Database\Factories;

use App\Models\ParentStudent;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $majorToKhoa = [
            'Khoa học máy tính' => 'Khoa học máy tính',
            'Kỹ thuật phần mềm' => 'Khoa Công nghệ phần mềm',
            'Hệ thống thông tin' => 'Khoa Hệ thống Thông tin',
            'An toàn thông tin' => 'Khoa An toàn Thông tin',
            'Truyền thông và mạng máy tính' => 'Khoa Mạng và Truyền thông',
            'Công nghệ dữ liệu' => 'Khoa Khoa học Dữ liệu',
            'Thiết kế và phát triển Game' => 'Khoa Thiết kế Đa phương tiện',
            'Công nghệ truyền thông' => 'Khoa Đa phương tiện',
            'Công nghệ phần cứng và nhúng' => 'Khoa Kỹ thuật Máy tính',
            'Trí tuệ nhân tạo và Robot' => 'Khoa Robot và AI',
        ];

        $major = $this->faker->randomElement(array_keys($majorToKhoa));
        $khoa = $majorToKhoa[$major];

        return [
            'image_url' => null,
            'user_id' => User::factory()->student()->create(),
            'personal_email' => null,
            'dob' => $this->faker->date(),
            'pob' => $this->faker->city,
            'sex' => $this->faker->randomElement(['Nam', 'Nữ']),
            'phone' => $this->faker->phoneNumber,
            'zalo' => null,
            'facebook' => null,
            'dan_toc' => "Kinh",
            'ton_giao' => null,
            'cccd' => $this->faker->numerify('###########'),
            'cccd_date' => $this->faker->date(),
            'address' => $this->faker->address,
            'student_code' => $this->faker->unique()->numerify('24Aka#####'),
            'major' => $major,
            'khoa' => $khoa,
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'grade' => "24ce2",
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Student $student) {
            // Tạo ParentStudent với student_id
            ParentStudent::factory()->create([
                'student_id' => $student->id,
            ]);
        });
    }
}
