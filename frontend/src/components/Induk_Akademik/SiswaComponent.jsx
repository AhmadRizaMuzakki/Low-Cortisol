import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getApiBaseUrl, getAuthHeaders } from '../../utils/Induk_Akademik/apiHelpers'

export default function StudentTable({ itemList = [], loading = false, error = null, onItemDeleted }) {
  const navigate = useNavigate()
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus siswa ini beserta akun login-nya?')) {
      return
    }

    setDeletingId(id)
    setDeleteError('')

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/siswa/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Gagal menghapus siswa')
      }

      onItemDeleted?.(id)
    } catch (err) {
      setDeleteError(err.message || 'Gagal menghapus siswa')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-app-muted">Memuat data siswa...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  if (itemList.length === 0) {
    return <p className="text-app-muted">Belum ada data siswa.</p>
  }

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        {deleteError && <div className="alert alert-error">{deleteError}</div>}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>Kelas</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.id_siswa}>
                  <td>{item.nisn ?? '-'}</td>
                  <td>{item.nama_siswa ?? '-'}</td>
                  <td>{item.tanggal_lahir ?? '-'}</td>
                  <td>{item.jenis_kelamin ?? '-'}</td>
                  <td>{item.alamat ?? '-'}</td>
                  <td>{item.nama_kelas ?? '-'}</td>
                  <td className="text-right">
                    <button
                      onClick={() => navigate(`/Induk_Akademik/SiswaResource/EditSiswa/${item.id_siswa}`)}
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_siswa)}
                      type="button"
                      className="btn btn-error btn-sm"
                      disabled={deletingId === item.id_siswa}
                    >
                      {deletingId === item.id_siswa ? 'Menghapus...' : 'Hapus'}
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
