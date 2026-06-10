import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getApiBaseUrl, getAuthHeaders } from '../../utils/Induk_Akademik/apiHelpers'

export default function ClassTable({ itemList = [], loading = false, error = null, onItemDeleted }) {
  const navigate = useNavigate()
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus kelas ini?')) {
      return
    }

    setDeletingId(id)
    setDeleteError('')

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/kelas/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Gagal menghapus kelas')
      }

      onItemDeleted?.(id)
    } catch (err) {
      setDeleteError(err.message || 'Gagal menghapus kelas')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-app-muted">Memuat data kelas...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  if (itemList.length === 0) {
    return <p className="text-app-muted">Belum ada data kelas.</p>
  }

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        {deleteError && <div className="alert alert-error">{deleteError}</div>}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Nama Kelas</th>
                <th>Tahun Ajaran</th>
                <th>Guru Wali</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.id_kelas}>
                  <td className="font-medium">{item.nama_kelas}</td>
                  <td>{item.tahun_ajaran}</td>
                  <td>{item.nama_guru ?? '-'}</td>
                  <td className="text-right">
                    <button
                      onClick={() => navigate(`/Induk_Akademik/KelasResource/EditKelas/${item.id_kelas}`)}
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_kelas)}
                      type="button"
                      className="btn btn-error btn-sm"
                      disabled={deletingId === item.id_kelas}
                    >
                      {deletingId === item.id_kelas ? 'Menghapus...' : 'Hapus'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
