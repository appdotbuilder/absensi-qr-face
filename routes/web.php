<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QrScanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Attendance routes
    Route::resource('attendances', AttendanceController::class);
    
    // QR Code scanning
    Route::get('/qr-scanner', function () {
        return Inertia::render('qr-scanner');
    })->name('qr-scanner');
    Route::post('/qr-scan', [QrScanController::class, 'store'])->name('qr-scan.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
