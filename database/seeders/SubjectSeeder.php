<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            ['name' => 'Matematika', 'code' => 'MTK', 'description' => 'Mata pelajaran Matematika'],
            ['name' => 'Bahasa Indonesia', 'code' => 'BID', 'description' => 'Mata pelajaran Bahasa Indonesia'],
            ['name' => 'Bahasa Inggris', 'code' => 'BIG', 'description' => 'Mata pelajaran Bahasa Inggris'],
            ['name' => 'Fisika', 'code' => 'FIS', 'description' => 'Mata pelajaran Fisika'],
            ['name' => 'Kimia', 'code' => 'KIM', 'description' => 'Mata pelajaran Kimia'],
            ['name' => 'Biologi', 'code' => 'BIO', 'description' => 'Mata pelajaran Biologi'],
            ['name' => 'Sejarah', 'code' => 'SEJ', 'description' => 'Mata pelajaran Sejarah'],
            ['name' => 'Geografi', 'code' => 'GEO', 'description' => 'Mata pelajaran Geografi'],
            ['name' => 'Ekonomi', 'code' => 'EKO', 'description' => 'Mata pelajaran Ekonomi'],
            ['name' => 'Sosiologi', 'code' => 'SOS', 'description' => 'Mata pelajaran Sosiologi'],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }
    }
}