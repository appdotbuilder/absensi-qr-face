<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolClass>
 */
class SchoolClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grade = $this->faker->randomElement(['X', 'XI', 'XII']);
        $class = $this->faker->randomElement(['A', 'B', 'C', 'D']);
        
        return [
            'name' => $grade . ' ' . $class,
            'grade' => $grade,
            'academic_year' => $this->faker->numberBetween(2023, 2025),
        ];
    }
}