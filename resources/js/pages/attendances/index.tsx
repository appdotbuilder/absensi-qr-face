import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Attendance {
    id: number;
    date: string;
    time: string;
    status: string;
    notes?: string;
    method: string;
    user: {
        name: string;
        student_id?: string;
        teacher_id?: string;
        role?: {
            name: string;
        };
    };
    subject?: {
        name: string;
        code: string;
    };
    school_class?: {
        name: string;
    };
    recorder?: {
        name: string;
    };
}

interface Class {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    from: number;
    to: number;
}

interface Props {
    attendances: {
        data: Attendance[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    classes: Class[];
    subjects: Subject[];
    filters: {
        date?: string;
        class_id?: string;
        subject_id?: string;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Data Absensi', href: '/attendances' },
];

export default function AttendancesIndex({ attendances, classes, subjects, filters }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'hadir': return 'text-green-600 bg-green-50 border-green-200';
            case 'terlambat': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'izin': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'sakit': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'tidak_hadir': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

    const getMethodIcon = (method: string) => {
        switch (method) {
            case 'qr_code': return '📱';
            case 'face_recognition': return '📸';
            case 'manual': return '✏️';
            default: return '📋';
        }
    };

    const handleFilter = (key: string, value: string) => {
        router.get(route('attendances.index'), {
            ...filters,
            [key]: value === filters[key as keyof typeof filters] ? '' : value,
        }, {
            preserveState: true,
        });
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Data Absensi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📋 Data Absensi</h1>
                        <p className="text-gray-600">Kelola dan pantau kehadiran siswa & guru</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button 
                            onClick={() => router.get(route('attendances.create'))}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            ➕ Tambah Absensi
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/qr-scanner'}
                        >
                            📱 QR Scanner
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📅 Tanggal
                            </label>
                            <input
                                type="date"
                                value={filters.date || ''}
                                onChange={(e) => handleFilter('date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🏫 Kelas
                            </label>
                            <select
                                value={filters.class_id || ''}
                                onChange={(e) => handleFilter('class_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Semua Kelas</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📚 Mata Pelajaran
                            </label>
                            <select
                                value={filters.subject_id || ''}
                                onChange={(e) => handleFilter('subject_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Semua Mapel</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name} ({subject.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎯 Status
                            </label>
                            <select
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Semua Status</option>
                                <option value="hadir">✅ Hadir</option>
                                <option value="terlambat">⏰ Terlambat</option>
                                <option value="izin">📝 Izin</option>
                                <option value="sakit">🏥 Sakit</option>
                                <option value="tidak_hadir">❌ Tidak Hadir</option>
                            </select>
                        </div>
                    </div>
                    
                    {(filters.date || filters.class_id || filters.subject_id || filters.status) && (
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Menampilkan {attendances.data.length} dari {attendances.meta?.total || 0} data
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.get(route('attendances.index'))}
                            >
                                🗑️ Reset Filter
                            </Button>
                        </div>
                    )}
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {attendances.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                👤 Pengguna
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                📚 Mata Pelajaran
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                🏫 Kelas
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                📅 Tanggal & Waktu
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                🎯 Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                🔧 Metode
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                👨‍🏫 Dicatat Oleh
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                                                ⚙️ Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {attendances.data.map((attendance) => (
                                            <tr key={attendance.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {attendance.user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {attendance.user.student_id && `NIS: ${attendance.user.student_id}`}
                                                            {attendance.user.teacher_id && `NIP: ${attendance.user.teacher_id}`}
                                                            {attendance.user.role?.name && ` • ${attendance.user.role.name}`}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">
                                                            {attendance.subject?.name || '-'}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {attendance.subject?.code || ''}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {attendance.school_class?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="text-gray-900">
                                                        {new Date(attendance.date).toLocaleDateString('id-ID')}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {attendance.time}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(attendance.status)}`}>
                                                        {getStatusLabel(attendance.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-2xl" title={attendance.method}>
                                                        {getMethodIcon(attendance.method)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {attendance.recorder?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.get(route('attendances.show', attendance.id))}
                                                    >
                                                        👁️ Detail
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {attendances.links && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Menampilkan {attendances.meta?.from || 0} hingga {attendances.meta?.to || 0} dari {attendances.meta?.total || 0} data
                                        </div>
                                        <div className="flex space-x-2">
                                            {attendances.links.map((link: PaginationLink, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 text-sm rounded-md ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white'
                                                            : link.url
                                                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                            : 'text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Belum Ada Data Absensi
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Mulai catat kehadiran siswa dan guru untuk melihat data di sini
                            </p>
                            <Button onClick={() => router.get(route('attendances.create'))}>
                                ➕ Tambah Absensi Pertama
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}