<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;

class QrScanController extends Controller
{
    /**
     * Handle QR Code scanning.
     */
    public function store(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|string',
            'subject_id' => 'nullable|exists:subjects,id',
            'class_id' => 'nullable|exists:classes,id',
        ]);

        $user = User::where('qr_code', $request->qr_code)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'QR Code tidak ditemukan.',
            ], 404);
        }

        // Check if already attended today for this subject/class
        $existingAttendance = Attendance::where('user_id', $user->id)
            ->where('date', now()->format('Y-m-d'))
            ->where('subject_id', $request->subject_id)
            ->where('class_id', $request->class_id)
            ->first();

        if ($existingAttendance) {
            return response()->json([
                'success' => false,
                'message' => 'Sudah melakukan absensi untuk hari ini.',
                'user' => $user,
                'attendance' => $existingAttendance,
            ], 400);
        }

        // Create attendance record
        $attendance = Attendance::create([
            'user_id' => $user->id,
            'subject_id' => $request->subject_id,
            'class_id' => $request->class_id,
            'date' => now()->format('Y-m-d'),
            'time' => now()->format('H:i:s'),
            'status' => 'hadir',
            'method' => 'qr_code',
            'recorded_by' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Absensi berhasil dicatat.',
            'user' => $user,
            'attendance' => $attendance,
        ]);
    }
}