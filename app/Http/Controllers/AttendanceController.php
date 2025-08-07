<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendances.
     */
    public function index(Request $request)
    {
        $query = Attendance::with(['user.role', 'subject', 'schoolClass', 'recorder'])
            ->latest('date')
            ->latest('time');

        // Filter by date if provided
        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        }

        // Filter by class if provided
        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        // Filter by subject if provided
        if ($request->filled('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Role-based filtering
        $user = $request->user();
        if ($user->isTeacher()) {
            // Teachers can only see attendances for classes/subjects they teach
            $teacherSubjectIds = $user->teacherSubjects()->pluck('subject_id');
            $teacherClassIds = $user->teacherSubjects()->pluck('class_id');
            
            $query->where(function ($q) use ($teacherSubjectIds, $teacherClassIds) {
                $q->whereIn('subject_id', $teacherSubjectIds)
                  ->orWhereIn('class_id', $teacherClassIds);
            });
        } elseif ($user->isStudent()) {
            // Students can only see their own attendances
            $query->where('user_id', $user->id);
        }

        $attendances = $query->paginate(15);

        $classes = SchoolClass::all();
        $subjects = Subject::all();

        return Inertia::render('attendances/index', [
            'attendances' => $attendances,
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['date', 'class_id', 'subject_id', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new attendance.
     */
    public function create()
    {
        $classes = SchoolClass::with('students')->get();
        $subjects = Subject::all();

        return Inertia::render('attendances/create', [
            'classes' => $classes,
            'subjects' => $subjects,
        ]);
    }

    /**
     * Store a newly created attendance in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'class_id' => 'nullable|exists:classes,id',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'status' => 'required|in:hadir,tidak_hadir,terlambat,izin,sakit',
            'notes' => 'nullable|string|max:500',
            'method' => 'required|in:manual,qr_code,face_recognition',
        ]);

        Attendance::create([
            'user_id' => $request->user_id,
            'subject_id' => $request->subject_id,
            'class_id' => $request->class_id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => $request->status,
            'notes' => $request->notes,
            'method' => $request->method,
            'recorded_by' => $request->user()->id,
        ]);

        return redirect()->route('attendances.index')
            ->with('success', 'Absensi berhasil dicatat.');
    }

    /**
     * Display the specified attendance.
     */
    public function show(Attendance $attendance)
    {
        $attendance->load(['user.role', 'subject', 'schoolClass', 'recorder']);

        // Check permission
        $user = request()->user();
        if ($user->isStudent() && $attendance->user_id !== $user->id) {
            abort(403, 'Unauthorized access.');
        }

        return Inertia::render('attendances/show', [
            'attendance' => $attendance,
        ]);
    }


}