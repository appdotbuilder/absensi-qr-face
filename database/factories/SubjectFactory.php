<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Matematika' => 'MTK',
            'Bahasa Indonesia' => 'BID',
            'Bahasa Inggris' => 'BIG',
            'Fisika' => 'FIS',
            'Kimia' => 'KIM',
            'Biologi' => 'BIO',
        ];
        
        $name = $this->faker->randomElement(array_keys($subjects));
        
        return [
            'name' => $name,
            'code' => $subjects[$name],
            'description' => $this->faker->sentence(),
        ];
    }
}