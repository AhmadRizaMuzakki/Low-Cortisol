import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'
import KelasComponent from '../../components/SiswaDashboard/KelasSIswaComponent.jsx'
import { getKelasSiswa } from '../../utils/SiswaDashboard/KelasUtils.jsx'

export default function KelasSiswa() {
  const { isAuthenticated } = useAuth()
  const [kelas, setKelas] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchKelas() {
      try {
        const response = await getKelasSiswa()
        setKelas(response.data?.data ?? null)
      } catch (err) {
        console.error('Error fetching kelas:', err)
        const message = err.response?.data?.message
        setError(message || 'Gagal memuat data kelas.')
      } finally {
        setLoading(false)
      }
    }

    fetchKelas()
  }, [])

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

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">
              Kelas Siswa
            </h1>
            <KelasComponent kelas={kelas} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  )
}
