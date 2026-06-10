import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import Navbar from '../../../layouts/Navbar'
import Header from '../../../layouts/header'
import http from '../../../utils/http'

function parsePengumumanList(payload) {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.error)) return payload.error
  return []
}

export default function PengumumanPage() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pengumuman, setPengumuman] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    penulis_id: 1,
  })

  const fetchPengumuman = async () => {
    setIsLoading(true)
    try {
      const res = await http.get('/pengumuman')
      setPengumuman(parsePengumumanList(res.data))
    } catch (error) {
      console.error('Gagal mengambil data:', error)
      setPengumuman([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) fetchPengumuman()
  }, [isAuthenticated])

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ judul: '', deskripsi: '', tanggal: '', penulis_id: 1 })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingId(item.id)
    const formattedDate = new Date(item.tanggal).toISOString().split('T')[0]
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi,
      tanggal: formattedDate,
      penulis_id: item.penulis_id,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await http.put(`/pengumuman/${editingId}`, formData)
      } else {
        await http.post('/pengumuman', formData)
      }
      setIsModalOpen(false)
      fetchPengumuman()
    } catch (error) {
      const msg = error.response?.data?.error || 'Terjadi kesalahan'
      alert(`Gagal menyimpan: ${msg}`)
    }
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = async () => {
    try {
      await http.delete(`/pengumuman/${deleteId}`)
      setDeleteId(null)
      fetchPengumuman()
    } catch (error) {
      console.error('Kesalahan jaringan:', error)
      alert('Gagal menghapus pengumuman.')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Navbar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="relative min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">
                Kelola Pengumuman
              </h1>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="rounded-lg bg-app-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
              >
                + Tambah Pengumuman
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
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
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          Memuat data...
                        </td>
                      </tr>
                    ) : pengumuman.length > 0 ? (
                      pengumuman.map((item) => (
                        <tr key={item.id} className="transition hover:bg-gray-50/50">
                          <td className="px-5 py-4 font-medium text-app-navy">{item.judul}</td>
                          <td className="max-w-xs truncate px-5 py-4 text-gray-600">
                            {item.deskripsi}
                          </td>
                          <td className="px-5 py-4 font-medium text-orange-500">
                            {item.penulis_nama || 'Admin'}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-500">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(item)}
                                className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          Belum ada pengumuman.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-app-navy">
                {editingId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Judul Pengumuman
                  </label>
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
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Isi / Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    required
                    rows={4}
                    value={formData.deskripsi}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-app-primary focus:outline-none focus:ring-1 focus:ring-app-primary"
                    placeholder="Tulis rincian pengumuman..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal</label>
                  <input
                    type="date"
                    name="tanggal"
                    required
                    value={formData.tanggal}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-app-primary focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
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
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl">
            <h2 className="mb-2 text-lg font-bold text-app-navy">Konfirmasi Hapus</h2>
            <p className="mb-6 text-sm text-gray-600">
              Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-800"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
