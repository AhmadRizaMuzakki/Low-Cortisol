import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import Navbar from '../../../layouts/Navbar'
import Header from '../../../layouts/header'
import MapelComponent from '../../../components/Induk_Akademik/MapelComponent.jsx'
import { getMapel } from '../../../utils/Induk_Akademik/MapelUtils.jsx'
import TambahMapel from './MapelResource/TambahMapel.jsx'

export default function Mapel() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mapel, setMapel] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  function parseMapelList(payload) {
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.error)) return payload.error
    return []
  }
  useEffect(() => {
    async function fetchMapel() {
      try {
        const response = await getMapel()
        setMapel(parseMapelList(response.data))
      } catch (error) {
        console.error('Error fetching mapel:', error)
      }finally {
        setLoading(false)
      }
    }
    fetchMapel()
  }, [])
  function handleTambahMapel() {
    navigate('/Induk_Akademik/MapelResource/TambahMapel')
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
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Data Mata Pelajaran</h1>
            <button onClick={handleTambahMapel} className="btn btn-primary">Tambah Mata Pelajaran</button>
            <MapelComponent mapelList={mapel} loading={loading} error={error} />
          </div>
        </main>
      </div>
    </div>
  )
}
