import { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Navbar from '../../layouts/Navbar';
// Jangan lupa import useAuth jika halamannya butuh proteksi login seperti di DashboardAdmin

export default function PengumumanPage() {
    const [pengumuman, setPengumuman] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
            <Navbar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <Header onOpenSidebar={() => setSidebarOpen(true)} />

                <main className="min-h-0 flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">
                                Pengumuman
                            </h1>
                            <button className="bg-app-primary text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                + Tambah Pengumuman
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
