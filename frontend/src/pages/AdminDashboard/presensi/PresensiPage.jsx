import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import Navbar from '../../../layouts/Navbar.jsx'
import Header from '../../../layouts/header.jsx'
import PresensiComponent from '../../../components/Presensi/PresensiComponent.jsx'
import { parseListResponse } from '../../../utils/Induk_Akademik/apiHelpers.js'
import { getPresensi } from '../../../utils/Presensi/PresensiUtils.jsx'

export default function PresensiPage() {
  const { isAuthenticated, role } = useAuth()
  const isAdmin = role === 'admin'
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchList() {
    setLoading(true)
    setError(null)
    try {
      const response = await getPresensi()
      setItemList(parseListResponse(response.data))
    } catch (err) {
      console.error('Error fetching presensi:', err)
      setError('Gagal memuat data presensi.')
      setItemList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && (role === 'admin' || role === 'guru')) {
      fetchList()
    }
  }, [isAuthenticated, role, location.pathname])

  function handleNavigateToCreate() {
    navigate('/Presensi/PresensiResource/TambahPresensi')
  }

  function handleItemDeleted(id) {
    setItemList((prev) => prev.filter((item) => item.id_presensi !== id))
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role === 'siswa') {
    return <Navigate to="/dashboard-siswa" replace />
  }

  if (role !== 'admin' && role !== 'guru') {
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
              Data Presensi
            </h1>
            <button type="button" onClick={handleNavigateToCreate} className="btn btn-primary">
              Tambah Presensi
            </button>
            <PresensiComponent
              itemList={itemList}
              loading={loading}
              error={error}
              isAdmin={isAdmin}
              onItemDeleted={handleItemDeleted}
            />
          </div>
        </main>
      </div>
    </div>
  )
}