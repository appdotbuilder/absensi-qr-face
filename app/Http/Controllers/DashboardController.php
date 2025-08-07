<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $data = [];

        if ($user->isAdmin()) {
            // Admin dashboard data
            $data = [
                'total_students' => User::whereHas('role', fn($q) => $q->where('name', 'student'))->count(),
                'total_teachers' => User::whereHas('role', fn($q) => $q->where('name', 'teacher'))->count(),
                'total_classes' => SchoolClass::count(),
                'total_subjects' => Subject::count(),
                'today_attendances' => Attendance::whereDate('date', now())->count(),
                'recent_attendances' => Attendance::with(['user', 'subject', 'schoolClass'])
                    ->latest('created_at')
                    ->limit(10)
                    ->get(),
            ];
        } elseif ($user->isTeacher()) {
            // Teacher dashboard data
            $teacherSubjects = $user->teacherSubjects()->with(['subject', 'schoolClass'])->get();
            $data = [
                'teacher_subjects' => $teacherSubjects,
                'today_attendances' => Attendance::whereDate('date', now())
                    ->where('recorded_by', $user->id)
                    ->count(),
                'recent_attendances' => Attendance::with(['user', 'subject', 'schoolClass'])
                    ->where('recorded_by', $user->id)
                    ->latest('created_at')
                    ->limit(10)
                    ->get(),
            ];
        } else {
            // Student dashboard data
            $data = [
                'total_attendances' => $user->attendances()->count(),
                'this_month_attendances' => $user->attendances()
                    ->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year)
                    ->count(),
                'recent_attendances' => $user->attendances()
                    ->with(['subject', 'schoolClass'])
                    ->latest('date')
                    ->latest('time')
                    ->limit(10)
                    ->get(),
                'attendance_summary' => [
                    'hadir' => $user->attendances()->where('status', 'hadir')->count(),
                    'terlambat' => $user->attendances()->where('status', 'terlambat')->count(),
                    'izin' => $user->attendances()->where('status', 'izin')->count(),
                    'sakit' => $user->attendances()->where('status', 'sakit')->count(),
                    'tidak_hadir' => $user->attendances()->where('status', 'tidak_hadir')->count(),
                ],
            ];
        }

        return Inertia::render('dashboard', [
            'data' => $data,
            'user' => $user->load(['role', 'schoolClass']),
        ]);
    }
}