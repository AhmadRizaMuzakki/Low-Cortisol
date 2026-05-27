import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'
import { getGuru } from '../../utils/Induk_Akademik/GuruUtils.jsx'
import GuruComponent from '../../components/Induk_Akademik/GuruComponent.jsx'

export default function Guru() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [guruList, setGuruList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function parseGuruList(payload) {
    if (Array.isArray(payload?.data)) return payload.data
    if (Array.isArray(payload?.error)) return payload.error
    return []
  }

  useEffect(() => {
    async function fetchGuru() {
      try {
        const response = await getGuru()
        setGuruList(parseGuruList(response.data))
      } catch (err) {
        console.error('Error fetching guru:', err)
        setError('Gagal memuat data guru.')
      } finally {
        setLoading(false)
      }
    }
    fetchGuru()
  }, [])

  function handleTambahGuru() {
    navigate('/Induk_Akademik/GuruResource/TambahGuru')
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
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Data Guru</h1>
          <button onClick={handleTambahGuru} className="btn btn-primary">Tambah Guru</button>
          <GuruComponent guruList={guruList} loading={loading} error={error} />

          </div>
        </main>
      </div>
    </div>
  )
}
