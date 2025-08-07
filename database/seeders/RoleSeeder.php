<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'admin',
            'description' => 'Administrator dengan akses penuh ke sistem',
        ]);

        Role::create([
            'name' => 'teacher',
            'description' => 'Guru yang dapat mencatat dan melihat absensi siswa',
        ]);

        Role::create([
            'name' => 'student',
            'description' => 'Siswa yang dapat melihat riwayat absensi pribadi',
        ]);
    }
}