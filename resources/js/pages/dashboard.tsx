import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface RecentAttendance {
    id: number;
    status: string;
    date: string;
    user?: {
        name: string;
    };
    subject?: {
        name: string;
    };
    school_class?: {
        name: string;
    };
}

interface TeacherSubject {
    id: number;
    subject?: {
        name: string;
        code: string;
    };
    school_class?: {
        name: string;
    };
}

interface DashboardData {
    total_students?: number;
    total_teachers?: number;
    total_classes?: number;
    total_subjects?: number;
    today_attendances?: number;
    recent_attendances?: RecentAttendance[];
    teacher_subjects?: TeacherSubject[];
    total_attendances?: number;
    this_month_attendances?: number;
    attendance_summary?: {
        hadir: number;
        terlambat: number;
        izin: number;
        sakit: number;
        tidak_hadir: number;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    schoolClass?: {
        name: string;
    };
}

interface Props {
    data: DashboardData;
    user: User;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ data, user }: Props) {
    const isAdmin = user.role?.name === 'admin';
    const isTeacher = user.role?.name === 'teacher';
    const isStudent = user.role?.name === 'student';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'hadir': return 'text-green-600 bg-green-50';
            case 'terlambat': return 'text-yellow-600 bg-yellow-50';
            case 'izin': return 'text-blue-600 bg-blue-50';
            case 'sakit': return 'text-purple-600 bg-purple-50';
            case 'tidak_hadir': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'hadir': return '✅ Hadir';
            case 'terlambat': return '⏰ Terlambat';
            case 'izin': return '📝 Izin';
            case 'sakit': return '🏥 Sakit';
            case 'tidak_hadir': return '❌ Tidak Hadir';
            default: return status;
        }
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                👋 Selamat datang, {user.name}!
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {isAdmin && '🔧 Administrator Dashboard - Kelola seluruh sistem absensi'}
                                {isTeacher && '👩‍🏫 Teacher Dashboard - Pantau absensi siswa Anda'}
                                {isStudent && `👨‍🎓 Student Dashboard - Kelas ${user.schoolClass?.name || 'N/A'}`}
                            </p>
                        </div>
                        <div className="text-6xl opacity-20">
                            {isAdmin && '👨‍💼'}
                            {isTeacher && '👩‍🏫'}
                            {isStudent && '👨‍🎓'}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isAdmin && (
                        <>
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Siswa</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.total_students}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">👨‍🎓</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Guru</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.total_teachers}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">👩‍🏫</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Kelas</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.total_classes}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">🏫</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Absensi Hari Ini</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.today_attendances}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isTeacher && (
                        <>
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Mata Pelajaran</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.teacher_subjects?.length || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Absensi Hari Ini</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.today_attendances}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isStudent && (
                        <>
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Absensi</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.total_attendances}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Bulan Ini</p>
                                        <p className="text-3xl font-bold text-gray-900">{data.this_month_attendances}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📅</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Hadir</p>
                                        <p className="text-3xl font-bold text-green-600">{data.attendance_summary?.hadir || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Terlambat</p>
                                        <p className="text-3xl font-bold text-yellow-600">{data.attendance_summary?.terlambat || 0}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">⏰</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Attendances */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                📋 Absensi Terbaru
                            </h3>
                        </div>
                        <div className="p-6">
                            {data.recent_attendances && data.recent_attendances.length > 0 ? (
                                <div className="space-y-4">
                                    {data.recent_attendances.slice(0, 5).map((attendance: RecentAttendance, index: number) => (
                                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <span className="text-lg">
                                                        {attendance.user?.name?.charAt(0) || '?'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {attendance.user?.name || 'Unknown'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {attendance.subject?.name || 'General'} • {attendance.school_class?.name || ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(attendance.status)}`}>
                                                    {getStatusLabel(attendance.status)}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(attendance.date).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📭</div>
                                    <p className="text-gray-500">Belum ada data absensi</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                🚀 Aksi Cepat
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                {(isAdmin || isTeacher) && (
                                    <>
                                        <Button 
                                            className="w-full justify-start h-auto p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                            variant="outline"
                                            onClick={() => window.location.href = route('attendances.create')}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">✏️</span>
                                                <div className="text-left">
                                                    <div className="font-semibold">Catat Absensi</div>
                                                    <div className="text-sm text-blue-600">Tambah data kehadiran siswa</div>
                                                </div>
                                            </div>
                                        </Button>
                                        
                                        <Button 
                                            className="w-full justify-start h-auto p-4 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                            variant="outline"
                                            onClick={() => window.location.href = '/qr-scanner'}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">📱</span>
                                                <div className="text-left">
                                                    <div className="font-semibold">Scan QR Code</div>
                                                    <div className="text-sm text-green-600">Absensi dengan QR scanner</div>
                                                </div>
                                            </div>
                                        </Button>
                                    </>
                                )}
                                
                                <Button 
                                    className="w-full justify-start h-auto p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
                                    variant="outline"
                                    onClick={() => window.location.href = route('attendances.index')}
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">📊</span>
                                        <div className="text-left">
                                            <div className="font-semibold">Lihat Laporan</div>
                                            <div className="text-sm text-purple-600">Riwayat dan statistik absensi</div>
                                        </div>
                                    </div>
                                </Button>

                                {isStudent && (
                                    <Button 
                                        className="w-full justify-start h-auto p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200"
                                        variant="outline"
                                        onClick={() => window.location.href = '/my-qr'}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">🎫</span>
                                            <div className="text-left">
                                                <div className="font-semibold">QR Code Saya</div>
                                                <div className="text-sm text-orange-600">Tampilkan kode QR pribadi</div>
                                            </div>
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher Subjects (for teachers only) */}
                {isTeacher && data.teacher_subjects && data.teacher_subjects.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                📚 Mata Pelajaran yang Diampu
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.teacher_subjects.map((ts: TeacherSubject, index: number) => (
                                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{ts.subject?.name}</h4>
                                                <p className="text-sm text-gray-600">{ts.school_class?.name}</p>
                                                <p className="text-xs text-blue-600 mt-1">Kode: {ts.subject?.code}</p>
                                            </div>
                                            <span className="text-2xl">📖</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Student Attendance Summary */}
                {isStudent && data.attendance_summary && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                📈 Ringkasan Kehadiran
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {Object.entries(data.attendance_summary).map(([status, count]) => (
                                    <div key={status} className={`p-4 rounded-lg ${getStatusColor(status)} border`}>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{count}</div>
                                            <div className="text-sm font-medium">{getStatusLabel(status)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}