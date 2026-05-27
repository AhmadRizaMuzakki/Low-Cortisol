import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'
import KelasComponent from '../../components/Induk_Akademik/KelasComponent.jsx'
import { getKelas } from '../../utils/Induk_Akademik/KelasUtils.jsx'

export default function Kelas() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kelas, setKelas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  function parseKelasList(payload) {
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.error)) return payload.error
    return []
  }

  useEffect(() => {
    async function fetchKelas() {
      try {
        const response = await getKelas()
        setKelas(parseKelasList(response.data))
      } catch (error) {
        console.error('Error fetching kelas:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchKelas()
  }, [])

  function handleTambahKelas() {
    navigate('/Induk_Akademik/KelasResource/TambahKelas')
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

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Data Kelas</h1>
            <button onClick={handleTambahKelas} className="btn btn-primary">Tambah Kelas</button>
            <KelasComponent kelasList={kelas} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  )
}
