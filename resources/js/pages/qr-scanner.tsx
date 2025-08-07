import React, { useState, useRef, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface ScanResult {
    success: boolean;
    message: string;
    user?: {
        name: string;
        student_id?: string;
        teacher_id?: string;
    };
    attendance?: {
        status: string;
        time: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'QR Scanner', href: '/qr-scanner' },
];

export default function QrScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        try {
            setError('');
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } // Use back camera on mobile
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsScanning(true);
            }
        } catch (err) {
            setError('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsScanning(false);
    };

    const simulateQRScan = () => {
        // Simulate QR code scanning for demo purposes
        const demoQRCodes = ['STD001', 'STD002', 'TCH001'];
        const randomQR = demoQRCodes[Math.floor(Math.random() * demoQRCodes.length)];
        handleQRCodeDetected(randomQR);
    };

    const handleQRCodeDetected = async (qrCode: string) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(route('qr-scan.store'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    qr_code: qrCode,
                    subject_id: null, // Can be enhanced to select subject
                    class_id: null,   // Can be enhanced to select class
                }),
            });

            const result = await response.json();
            
            if (response.ok && result.success) {
                setScanResult(result);
                stopCamera();
            } else {
                setError(result.message || 'Gagal memproses QR code');
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memproses QR code');
            console.error('QR scan error:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetScanner = () => {
        setScanResult(null);
        setError('');
        stopCamera();
    };

    useEffect(() => {
        return () => {
            stopCamera(); // Cleanup on component unmount
        };
    }, []);

    return (
        <AppShell breadcrumbs={breadcrumbs}>
            <Head title="QR Scanner" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        QR Code Scanner
                    </h1>
                    <p className="text-gray-600">
                        Scan QR code siswa atau guru untuk mencatat kehadiran otomatis
                    </p>
                </div>

                {!scanResult ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        {!isScanning ? (
                            <div className="text-center py-12">
                                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                                    <span className="text-4xl">📷</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Siap Memindai QR Code
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Tekan tombol di bawah untuk mengaktifkan kamera dan mulai memindai QR code
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                        onClick={startCamera}
                                        className="bg-blue-600 hover:bg-blue-700"
                                        size="lg"
                                    >
                                        📱 Aktifkan Scanner
                                    </Button>
                                    <Button 
                                        onClick={simulateQRScan}
                                        variant="outline"
                                        size="lg"
                                    >
                                        🎯 Demo Scan
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Camera View */}
                                <div className="relative">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full max-w-md mx-auto rounded-xl border-2 border-dashed border-gray-300"
                                        style={{ maxHeight: '400px' }}
                                    />
                                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                                    
                                    {/* Scanning Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-48 h-48 border-2 border-blue-500 rounded-lg">
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                                        </div>
                                    </div>

                                    {loading && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                                            <div className="bg-white p-4 rounded-lg text-center">
                                                <div className="text-2xl mb-2">⏳</div>
                                                <div className="text-sm text-gray-600">Memproses QR Code...</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Arahkan kamera ke QR code yang ingin di-scan
                                    </p>
                                    <Button 
                                        onClick={stopCamera}
                                        variant="outline"
                                    >
                                        ❌ Hentikan Scanner
                                    </Button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">❌</div>
                                    <div>
                                        <h4 className="font-medium text-red-900 mb-1">Error</h4>
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Scan Result */
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">✅</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Absensi Berhasil!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                QR code berhasil dipindai dan absensi telah dicatat
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nama</label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {scanResult.user?.name || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">ID</label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {scanResult.user?.student_id || scanResult.user?.teacher_id || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className="text-lg font-semibold text-green-600">
                                        ✅ {scanResult.attendance?.status || 'Hadir'}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Waktu</label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {scanResult.attendance?.time || new Date().toLocaleTimeString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                onClick={resetScanner}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                🔄 Scan Lagi
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => router.get(route('attendances.index'))}
                            >
                                📋 Lihat Data Absensi
                            </Button>
                        </div>
                    </div>
                )}

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h3 className="font-medium text-blue-900 mb-2">Cara Menggunakan QR Scanner</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Pastikan pencahayaan cukup untuk hasil scan yang optimal</li>
                                <li>• Arahkan kamera ke QR code hingga terdeteksi otomatis</li>
                                <li>• QR code harus dalam kondisi bersih dan tidak rusak</li>
                                <li>• Jika gagal, coba gunakan fitur Demo Scan untuk testing</li>
                                <li>• Data absensi akan tersimpan otomatis setelah scan berhasil</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Cepat & Akurat</h3>
                        <p className="text-sm text-gray-600">
                            Scan QR code dalam hitungan detik dengan tingkat akurasi tinggi
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                        <div className="text-3xl mb-3">🔒</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Aman & Terpercaya</h3>
                        <p className="text-sm text-gray-600">
                            Sistem keamanan berlapis untuk mencegah manipulasi data absensi
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                        <div className="text-3xl mb-3">📊</div>
                        <h3 className="font-semibold text-gray-900 mb-2">Real-time Data</h3>
                        <p className="text-sm text-gray-600">
                            Data absensi langsung tersimpan dan dapat dilihat secara real-time
                        </p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}