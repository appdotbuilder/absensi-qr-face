import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user: {
            name: string;
            email: string;
            [key: string]: unknown;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Absensi Digital" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📊</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">AttendanceApp</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="text-6xl">📱</div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                🎓 Sistem Absensi Digital
                                <span className="block text-3xl md:text-5xl text-blue-600 mt-2">
                                    untuk Sekolah Modern
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Solusi lengkap untuk pencatatan kehadiran siswa dan guru dengan teknologi 
                                <strong> QR Code</strong> dan <strong>Face Recognition</strong> yang mudah digunakan
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {auth?.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                                            🚀 Buka Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')}>
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                                                📝 Mulai Sekarang
                                            </Button>
                                        </Link>
                                        <Link href={route('login')}>
                                            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                                🔑 Masuk
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Decorative background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ✨ Fitur Unggulan
                            </h2>
                            <p className="text-xl text-gray-600">
                                Teknologi terdepan untuk sistem absensi yang efisien dan akurat
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* QR Code Feature */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Scan QR Code</h3>
                                <p className="text-gray-600 mb-4">
                                    Absensi instant dengan memindai QR code unik setiap siswa dan guru. 
                                    Cepat, akurat, dan mudah digunakan.
                                </p>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="w-16 h-16 bg-gray-800 mx-auto rounded grid grid-cols-4 gap-px">
                                        {Array.from({length: 16}).map((_, i) => (
                                            <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-800'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Face Recognition Feature */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                                <div className="text-4xl mb-4">📸</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Face Recognition</h3>
                                <p className="text-gray-600 mb-4">
                                    Verifikasi kehadiran dengan teknologi pengenalan wajah yang canggih. 
                                    Anti-fraud dan lebih aman.
                                </p>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-300 mx-auto rounded-full flex items-center justify-center">
                                        <span className="text-2xl">😊</span>
                                    </div>
                                </div>
                            </div>

                            {/* Multi-Role Feature */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Role System</h3>
                                <p className="text-gray-600 mb-4">
                                    Sistem peran lengkap: Administrator, Guru, dan Siswa dengan 
                                    hak akses yang sesuai kebutuhan.
                                </p>
                                <div className="flex space-x-2">
                                    <div className="flex-1 bg-red-100 p-2 rounded text-center">
                                        <div className="text-lg">👨‍💼</div>
                                        <div className="text-xs text-gray-600">Admin</div>
                                    </div>
                                    <div className="flex-1 bg-blue-100 p-2 rounded text-center">
                                        <div className="text-lg">👩‍🏫</div>
                                        <div className="text-xs text-gray-600">Guru</div>
                                    </div>
                                    <div className="flex-1 bg-green-100 p-2 rounded text-center">
                                        <div className="text-lg">👨‍🎓</div>
                                        <div className="text-xs text-gray-600">Siswa</div>
                                    </div>
                                </div>
                            </div>

                            {/* Real-time Reporting */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Laporan Real-time</h3>
                                <p className="text-gray-600 mb-4">
                                    Dapatkan laporan kehadiran secara real-time dengan berbagai 
                                    filter dan analisis yang mendalam.
                                </p>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Hadir</span>
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Izin</span>
                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                <div className="bg-yellow-500 h-2 rounded-full w-1/5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Tracking */}
                            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl border border-teal-200">
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Status Lengkap</h3>
                                <p className="text-gray-600 mb-4">
                                    Catat berbagai status kehadiran: Hadir, Terlambat, Izin, 
                                    Sakit, dan Tidak Hadir dengan mudah.
                                </p>
                                <div className="space-y-2">
                                    {['✅ Hadir', '⏰ Terlambat', '📝 Izin', '🏥 Sakit', '❌ Tidak Hadir'].map((status, i) => (
                                        <div key={i} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                                            {status}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Easy Integration */}
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border border-pink-200">
                                <div className="text-4xl mb-4">🔧</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Mudah Digunakan</h3>
                                <p className="text-gray-600 mb-4">
                                    Interface yang intuitif dan mudah dipahami oleh semua kalangan. 
                                    Setup cepat dan maintenance minimal.
                                </p>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl text-green-500 mb-2">🚀</div>
                                        <div className="text-sm text-gray-600">Siap Pakai!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            🎯 Siap Modernisasi Sistem Absensi Sekolah Anda?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Bergabunglah dengan sekolah-sekolah yang sudah merasakan efisiensi 
                            sistem absensi digital yang canggih dan terpercaya.
                        </p>
                        {!auth?.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href={route('register')}>
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg">
                                        📝 Daftar Gratis Sekarang
                                    </Button>
                                </Link>
                                <Link href={route('login')}>
                                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                                        🔐 Sudah Punya Akun?
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">📊</span>
                            </div>
                            <span className="text-xl font-bold">AttendanceApp</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Sistem Absensi Digital Terdepan untuk Pendidikan Modern
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-gray-500">
                            <span>© 2024 AttendanceApp</span>
                            <span>•</span>
                            <span>Dibuat dengan ❤️ untuk Pendidikan Indonesia</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}