<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            SchoolClassSeeder::class,
            SubjectSeeder::class,
        ]);

        // Create admin user
        $adminRole = Role::where('name', 'admin')->first();
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@attendance.com',
            'role_id' => $adminRole->id,
            'qr_code' => 'ADM001',
        ]);

        // Create test teacher
        $teacherRole = Role::where('name', 'teacher')->first();
        User::factory()->create([
            'name' => 'Pak Budi Guru',
            'email' => 'teacher@attendance.com',
            'role_id' => $teacherRole->id,
            'teacher_id' => 'TCH001',
            'qr_code' => 'TCH001',
        ]);

        // Create test student
        $studentRole = Role::where('name', 'student')->first();
        User::factory()->create([
            'name' => 'Siswa Test',
            'email' => 'student@attendance.com',
            'role_id' => $studentRole->id,
            'student_id' => 'STD001',
            'class_id' => 1, // X A
            'qr_code' => 'STD001',
        ]);
    }
}
