import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    student_id?: string;
    teacher_id?: string;
    role?: {
        name: string;
    };
}

interface Class {
    id: number;
    name: string;
    students: User[];
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface AttendanceFormData {
    user_id: string;
    subject_id: string;
    class_id: string;
    date: string;
    time: string;
    status: string;
    notes: string;
    method: string;
    [key: string]: string;
}

interface Props {
    classes: Class[];
    subjects: Subject[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Data Absensi', href: '/attendances' },
    { title: 'Tambah Absensi', href: '/attendances/create' },
];

export default function AttendancesCreate({ classes, subjects }: Props) {
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [availableStudents, setAvailableStudents] = useState<User[]>([]);

    const { data, setData, post, processing, errors } = useForm<AttendanceFormData>({
        user_id: '',
        subject_id: '',
        class_id: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        status: 'hadir',
        notes: '',
        method: 'manual',
    });

    const handleClassChange = (classId: string) => {
        setSelectedClass(classId);
        setData('class_id', classId);
        
        const selectedClassData = classes.find(cls => cls.id.toString() === classId);
        setAvailableStudents(selectedClassData?.students || []);
        setData('user_id', ''); // Reset selected user
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('attendances.store'), {
            onSuccess: () => {
                router.get(route('attendances.index'));
            },
        });
    };

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="Tambah Absensi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">➕ Tambah Data Absensi</h1>
                    <p className="text-gray-600">Catat kehadiran siswa atau guru secara manual</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📅 Tanggal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🕐 Waktu <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={data.time}
                                    onChange={(e) => setData('time', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.time && (
                                    <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                                )}
                            </div>
                        </div>

                        {/* Class and Subject */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🏫 Kelas <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => handleClassChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Pilih Kelas</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.class_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.class_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📚 Mata Pelajaran
                                </label>
                                <select
                                    value={data.subject_id}
                                    onChange={(e) => setData('subject_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Pilih Mata Pelajaran</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name} ({subject.code})
                                        </option>
                                    ))}
                                </select>
                                {errors.subject_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.subject_id}</p>
                                )}
                            </div>
                        </div>

                        {/* Student Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                👤 Siswa <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                disabled={!selectedClass}
                            >
                                <option value="">
                                    {selectedClass ? 'Pilih Siswa' : 'Pilih kelas terlebih dahulu'}
                                </option>
                                {availableStudents.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} 
                                        {student.student_id && ` (NIS: ${student.student_id})`}
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                            )}
                        </div>

                        {/* Status and Method */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🎯 Status Kehadiran <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="hadir">✅ Hadir</option>
                                    <option value="terlambat">⏰ Terlambat</option>
                                    <option value="izin">📝 Izin</option>
                                    <option value="sakit">🏥 Sakit</option>
                                    <option value="tidak_hadir">❌ Tidak Hadir</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🔧 Metode Absensi
                                </label>
                                <select
                                    value={data.method}
                                    onChange={(e) => setData('method', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="manual">✏️ Manual</option>
                                    <option value="qr_code">📱 QR Code</option>
                                    <option value="face_recognition">📸 Face Recognition</option>
                                </select>
                                {errors.method && (
                                    <p className="mt-1 text-sm text-red-600">{errors.method}</p>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Catatan Tambahan
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Catatan opsional mengenai kehadiran ini..."
                            />
                            {errors.notes && (
                                <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get(route('attendances.index'))}
                                disabled={processing}
                            >
                                ❌ Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Absensi'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h3 className="font-medium text-blue-900 mb-2">Tips Pencatatan Absensi</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Pilih kelas terlebih dahulu untuk melihat daftar siswa</li>
                                <li>• Mata pelajaran bersifat opsional untuk absensi umum</li>
                                <li>• Gunakan catatan untuk informasi tambahan seperti alasan keterlambatan</li>
                                <li>• Status dapat diubah sesuai kondisi kehadiran siswa</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}