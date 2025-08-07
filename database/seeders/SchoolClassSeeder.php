<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use Illuminate\Database\Seeder;

class SchoolClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = date('Y');
        $grades = ['X', 'XI', 'XII'];
        $classes = ['A', 'B', 'C', 'D'];

        foreach ($grades as $grade) {
            foreach ($classes as $class) {
                SchoolClass::create([
                    'name' => $grade . ' ' . $class,
                    'grade' => $grade,
                    'academic_year' => $currentYear,
                ]);
            }
        }
    }
}