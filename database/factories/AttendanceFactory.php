<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'subject_id' => Subject::factory(),
            'class_id' => SchoolClass::factory(),
            'date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'time' => $this->faker->time(),
            'status' => $this->faker->randomElement(['hadir', 'tidak_hadir', 'terlambat', 'izin', 'sakit']),
            'notes' => $this->faker->optional()->sentence(),
            'method' => $this->faker->randomElement(['manual', 'qr_code', 'face_recognition']),
            'recorded_by' => User::factory(),
        ];
    }
}