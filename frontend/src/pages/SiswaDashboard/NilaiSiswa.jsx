import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'
import NilaiComponent from '../../components/SiswaDashboard/NilaiComponent.jsx'
import { getNilaiSiswa } from '../../utils/SiswaDashboard/NilaiUtils.jsx'

export default function NilaiSiswa() {
  const { isAuthenticated } = useAuth()
  const [nilai, setNilai] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNilai() {
      try {
        const response = await getNilaiSiswa()
        setNilai(response.data?.data ?? [])
      } catch (err) {
        console.error('Error fetching nilai:', err)
        const message = err.response?.data?.message
        setError(message || 'Gagal memuat data nilai.')
      } finally {
        setLoading(false)
      }
    }

    fetchNilai()
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
              Nilai Siswa
            </h1>
            <NilaiComponent nilai={nilai} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  )
}
