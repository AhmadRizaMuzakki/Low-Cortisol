import { useState, useEffect } from 'react';
import Header from '../../layouts/Header';
import Navbar from '../../layouts/Navbar';
import { useAuth } from '../../context/AuthContext';
import { getApiBaseUrl } from '../../services/api';

export default function PengumumanPage() {
    const { token } = useAuth();
    const baseUrl = getApiBaseUrl();

    const [pengumuman, setPengumuman] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        tanggal: '',
        penulis_id: 1 // TODO: Sesuaikan dengan ID user yang sedang login
    });

    // 1. READ: Mengambil data dari backend
    const fetchPengumuman = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/pengumuman`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                // Asumsi backend mengembalikan array di dalam properti tertentu
                // Sesuaikan jika struktur response-nya berbeda (misal data.data)
                setPengumuman(data.error || []);
            } else {
                console.error("Gagal mengambil data:", data);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchPengumuman();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // Membuka Modal untuk Tambah
    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ judul: '', deskripsi: '', tanggal: '', penulis_id: 1 });
        setIsModalOpen(true);
    };

    // Membuka Modal untuk Edit
    const handleOpenEdit = (item) => {
        setEditingId(item.id);
        // Format tanggal ke YYYY-MM-DD untuk input type date
        const formattedDate = new Date(item.tanggal).toISOString().split('T')[0];
        setFormData({
            judul: item.judul,
            deskripsi: item.deskripsi,
            tanggal: formattedDate,
            penulis_id: item.penulis_id
        });
        setIsModalOpen(true);
    };

    // 2 & 3. CREATE & UPDATE: Menyimpan data ke backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId
            ? `${baseUrl}/api/pengumuman/${editingId}`
            : `${baseUrl}/api/pengumuman`;

        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchPengumuman(); // Refresh tabel
            } else {
                const errData = await res.json();
                alert(`Gagal menyimpan: ${errData.error || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error("Kesalahan jaringan:", error);
        }
    };

    // 4. DELETE: Memunculkan modal hapus
    const handleDelete = (id) => {
        setDeleteId(id); // Hanya memunculkan pop-up, belum menghapus
    };

    // Fungsi konfirmasi hapus dari pop-up
    const confirmDelete = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/pengumuman/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setDeleteId(null);
                fetchPengumuman(); // Refresh tabel
            } else {
                alert("Gagal menghapus pengumuman.");
            }
        } catch (error) {
            console.error("Kesalahan jaringan:", error);
        }
    };

    // Handler Perubahan Input Form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
            <Navbar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <Header onOpenSidebar={() => setSidebarOpen(true)} />

                <main className="min-h-0 flex-1 overflow-y-auto relative">
                    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">

                        {/* Header Halaman */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">
                                Kelola Pengumuman
                            </h1>
                            <button
                                onClick={handleOpenAdd}
                                className="bg-app-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-800 transition shadow-sm"
                            >
                                + Tambah Pengumuman
                            </button>
                        </div>

                        {/* Tabel Data */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-semibold uppercase tracking-wide text-app-muted">
                                            <th className="px-5 py-4">Judul</th>
                                            <th className="px-5 py-4">Deskripsi</th>
                                            <th className="px-5 py-4">Pembuat</th>
                                            <th className="px-5 py-4">Tanggal Dibuat</th>
                                            <th className="px-5 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">Memuat data...</td>
                                            </tr>
                                        ) : pengumuman && pengumuman.length > 0 ? (
                                            pengumuman.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                                                    <td className="px-5 py-4 font-medium text-app-navy">{item.judul}</td>
                                                    <td className="px-5 py-4 text-gray-600 truncate max-w-xs">{item.deskripsi}</td>
                                                    <td className="px-5 py-4 font-medium text-orange-500">{item.penulis_nama || 'Admin'}</td>
                                                    <td className="px-5 py-4 text-gray-500 text-sm">
                                                        {new Date(item.created_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </td>

                                                    <td className="px-5 py-4 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => handleOpenEdit(item)}
                                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1 rounded-md"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="text-red-600 hover:text-red-800 text-sm font-medium bg-red-50 px-3 py-1 rounded-md"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-8 text-gray-500">Belum ada pengumuman.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal Tambah / Edit */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                            <h2 className="text-xl font-bold text-app-navy mb-4">
                                {editingId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Pengumuman</label>
                                    <input
                                        type="text"
                                        name="judul"
                                        required
                                        value={formData.judul}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-app-primary focus:outline-none focus:ring-1 focus:ring-app-primary"
                                        placeholder="Contoh: Libur Lebaran"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Isi / Deskripsi</label>
                                    <textarea
                                        name="deskripsi"
                                        required
                                        rows="4"
                                        value={formData.deskripsi}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-app-primary focus:outline-none focus:ring-1 focus:ring-app-primary resize-none"
                                        placeholder="Tulis rincian pengumuman..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        required
                                        value={formData.tanggal}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-app-primary focus:outline-none focus:ring-1 focus:ring-app-primary"
                                    />
                                </div>

                                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-app-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center">
                        <h2 className="text-lg font-bold text-app-navy mb-2">Konfirmasi Hapus</h2>
                        <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
