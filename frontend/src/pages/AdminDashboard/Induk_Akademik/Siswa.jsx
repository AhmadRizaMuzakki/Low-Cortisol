import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import Navbar from '../../../layouts/Navbar'
import Header from '../../../layouts/header'
import StudentTable from '../../../components/Induk_Akademik/SiswaComponent.jsx'
import { getSiswa } from '../../../utils/Induk_Akademik/SiswaUtils.jsx'
import { parseListResponse } from '../../../utils/Induk_Akademik/apiHelpers'

export default function Siswa() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchList() {
    setLoading(true)
    setError(null)
    try {
      const response = await getSiswa()
      setItemList(parseListResponse(response.data))
    } catch (err) {
      console.error('Error fetching siswa:', err)
      setError('Gagal memuat data siswa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  function handleItemDeleted(id) {
    setItemList((prev) => prev.filter((item) => item.id_siswa !== id))
  }

  function handleNavigateToCreate() {
    navigate('/Induk_Akademik/SiswaResource/TambahSiswa')
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
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Data Siswa</h1>
            <button onClick={handleNavigateToCreate} className="btn btn-primary">Tambah Siswa</button>
            <StudentTable
              itemList={itemList}
              loading={loading}
              error={error}
              onItemDeleted={handleItemDeleted}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
