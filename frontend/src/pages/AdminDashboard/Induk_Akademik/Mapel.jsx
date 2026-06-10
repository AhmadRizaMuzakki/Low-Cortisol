import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import Navbar from '../../../layouts/Navbar'
import Header from '../../../layouts/header'
import SubjectTable from '../../../components/Induk_Akademik/MapelComponent.jsx'
import { getMapel } from '../../../utils/Induk_Akademik/MapelUtils.jsx'
import { parseListResponse } from '../../../utils/Induk_Akademik/apiHelpers'

export default function Mapel() {
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
      const response = await getMapel()
      setItemList(parseListResponse(response.data))
    } catch (err) {
      console.error('Error fetching mapel:', err)
      setError('Gagal memuat data mata pelajaran.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  function handleItemDeleted(id) {
    setItemList((prev) => prev.filter((item) => item.id_mapel !== id))
  }

  function handleNavigateToCreate() {
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
            <button onClick={handleNavigateToCreate} className="btn btn-primary">Tambah Mata Pelajaran</button>
            <SubjectTable
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
