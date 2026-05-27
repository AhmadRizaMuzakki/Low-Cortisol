import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'
import SiswaComponent from '../../components/Induk_Akademik/SiswaComponent.jsx'
import { getSiswa } from '../../utils/Induk_Akademik/SiswaUtils.jsx'
import TambahSiswa from './SiswaResource/TambahSiswa.jsx'

function parseSiswaList(payload) {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.error)) return payload.error
  return []
}

export default function Siswa() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [siswaList, setSiswaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSiswa() {
      try {
        const response = await getSiswa()
        setSiswaList(parseSiswaList(response.data))
      } catch (err) {
        console.error('Error fetching siswa:', err)
        setError('Gagal memuat data siswa.')
      } finally {
        setLoading(false)
      }
    }
    fetchSiswa()
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  function handleTambahSiswa() {
    navigate('/Induk_Akademik/SiswaResource/TambahSiswa')
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
              Data Siswa
            </h1>
            <button onClick={handleTambahSiswa} className="btn btn-primary">Tambah Siswa</button>
            <SiswaComponent
              siswaList={siswaList}
              loading={loading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
