import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getApiBaseUrl, getAuthHeaders } from '../../utils/Induk_Akademik/apiHelpers'

export default function TeacherTable({ itemList = [], loading = false, error = null, onItemDeleted }) {
  const navigate = useNavigate()
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus guru ini beserta akun login-nya?')) {
      return
    }

    setDeletingId(id)
    setDeleteError('')

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/guru/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Gagal menghapus guru')
      }

      onItemDeleted?.(id)
    } catch (err) {
      setDeleteError(err.message || 'Gagal menghapus guru')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-app-muted">Memuat data guru...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  if (itemList.length === 0) {
    return <p className="text-app-muted">Belum ada data guru.</p>
  }

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        {deleteError && <div className="alert alert-error">{deleteError}</div>}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>NIP</th>
                <th>Nama Guru</th>
                <th>Jenis Kelamin</th>
                <th>No HP</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.id_guru}>
                  <td>{item.nip ?? '-'}</td>
                  <td>{item.nama_guru ?? '-'}</td>
                  <td>{item.jenis_kelamin ?? '-'}</td>
                  <td>{item.no_hp ?? '-'}</td>
                  <td className="text-right">
                    <button
                      onClick={() => navigate(`/Induk_Akademik/GuruResource/EditGuru/${item.id_guru}`)}
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_guru)}
                      type="button"
                      className="btn btn-error btn-sm"
                      disabled={deletingId === item.id_guru}
                    >
                      {deletingId === item.id_guru ? 'Menghapus...' : 'Hapus'}
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
