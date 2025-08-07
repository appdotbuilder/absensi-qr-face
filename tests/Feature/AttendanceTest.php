<?php

namespace Tests\Feature;

use App\Models\Attendance;
use App\Models\Role;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles
        Role::create(['name' => 'admin', 'description' => 'Administrator']);
        Role::create(['name' => 'teacher', 'description' => 'Teacher']);
        Role::create(['name' => 'student', 'description' => 'Student']);
        
        // Create test data
        $this->adminRole = Role::where('name', 'admin')->first();
        $this->teacherRole = Role::where('name', 'teacher')->first();
        $this->studentRole = Role::where('name', 'student')->first();
        
        $this->schoolClass = SchoolClass::create([
            'name' => 'X A',
            'grade' => 'X',
            'academic_year' => 2024,
        ]);
        
        $this->subject = Subject::create([
            'name' => 'Matematika',
            'code' => 'MTK',
            'description' => 'Mata pelajaran Matematika',
        ]);
    }

    public function test_admin_can_access_dashboard(): void
    {
        $admin = User::factory()->create([
            'role_id' => $this->adminRole->id,
        ]);

        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertStatus(200);
    }

    public function test_teacher_can_access_attendance_index(): void
    {
        $teacher = User::factory()->create([
            'role_id' => $this->teacherRole->id,
        ]);

        $response = $this->actingAs($teacher)->get(route('attendances.index'));
        $response->assertStatus(200);
    }

    public function test_student_can_access_attendance_index(): void
    {
        $student = User::factory()->create([
            'role_id' => $this->studentRole->id,
            'class_id' => $this->schoolClass->id,
        ]);

        $response = $this->actingAs($student)->get(route('attendances.index'));
        $response->assertStatus(200);
    }

    public function test_can_create_attendance(): void
    {
        $teacher = User::factory()->create([
            'role_id' => $this->teacherRole->id,
        ]);
        
        $student = User::factory()->create([
            'role_id' => $this->studentRole->id,
            'class_id' => $this->schoolClass->id,
        ]);

        $response = $this->actingAs($teacher)->post(route('attendances.store'), [
            'user_id' => $student->id,
            'subject_id' => $this->subject->id,
            'class_id' => $this->schoolClass->id,
            'date' => now()->format('Y-m-d'),
            'time' => now()->format('H:i'),
            'status' => 'hadir',
            'method' => 'manual',
        ]);

        $response->assertRedirect(route('attendances.index'));
        $this->assertDatabaseHas('attendances', [
            'user_id' => $student->id,
            'status' => 'hadir',
        ]);
    }

    public function test_qr_code_scanning(): void
    {
        $teacher = User::factory()->create([
            'role_id' => $this->teacherRole->id,
        ]);
        
        $student = User::factory()->create([
            'role_id' => $this->studentRole->id,
            'class_id' => $this->schoolClass->id,
            'qr_code' => 'STD001',
        ]);

        $response = $this->actingAs($teacher)->post(route('qr-scan.store'), [
            'qr_code' => 'STD001',
            'subject_id' => $this->subject->id,
            'class_id' => $this->schoolClass->id,
        ]);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $this->assertDatabaseHas('attendances', [
            'user_id' => $student->id,
            'method' => 'qr_code',
            'status' => 'hadir',
        ]);
    }

    public function test_qr_scanner_page_accessible(): void
    {
        $user = User::factory()->create([
            'role_id' => $this->teacherRole->id,
        ]);

        $response = $this->actingAs($user)->get('/qr-scanner');
        $response->assertStatus(200);
    }

    public function test_welcome_page_accessible(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}