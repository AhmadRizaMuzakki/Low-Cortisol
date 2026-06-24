import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKelas } from '../../utils/Induk_Akademik/KelasUtils'
import { parseListResponse } from '../../utils/Induk_Akademik/apiHelpers'
import {
  deletePenjadwalan,
  formatJam,
  hariOptions,
  paginateList,
  PENJADWALAN_PER_PAGE,
} from '../../utils/Penjadwalan/PenjadwalanUtils'

export default function PenjadwalanTable({
  itemList = [],
  loading = false,
  error = null,
  isAdmin = false,
  onItemDeleted,
}) {
  const navigate = useNavigate()
  const [filterHari, setFilterHari] = useState('')
  const [filterKelas, setFilterKelas] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [kelasList, setKelasList] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    getKelas()
      .then((res) => setKelasList(parseListResponse(res.data)))
      .catch(() => setKelasList([]))
  }, [])

  const kelasOptions = useMemo(() => {
    if (kelasList.length > 0) {
      return kelasList
        .map((kelas) => ({
          id: String(kelas.id_kelas),
          nama: kelas.nama_kelas,
        }))
        .sort((a, b) => a.nama.localeCompare(b.nama))
    }

    const map = new Map()
    itemList.forEach((item) => {
      if (item.id_kelas != null && item.nama_kelas) {
        map.set(String(item.id_kelas), item.nama_kelas)
      }
    })
    return [...map.entries()]
      .map(([id, nama]) => ({ id, nama }))
      .sort((a, b) => a.nama.localeCompare(b.nama))
  }, [kelasList, itemList])

  const filteredList = useMemo(() => {
    return itemList.filter((item) => {
      const matchHari = !filterHari || item.hari === filterHari
      const matchKelas = !filterKelas || String(item.id_kelas) === filterKelas
      return matchHari && matchKelas
    })
  }, [itemList, filterHari, filterKelas])

  const { items, total, totalPages, currentPage: safePage } = useMemo(
    () => paginateList(filteredList, currentPage),
    [filteredList, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [filterHari, filterKelas, itemList.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  async function handleDelete(id) {
    if (!window.confirm('Yakin ingin menghapus jadwal ini?')) {
      return
    }

    setDeletingId(id)
    setDeleteError('')

    try {
      await deletePenjadwalan(id)
      onItemDeleted?.(id)
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error?.error ||
        err.message ||
        'Gagal menghapus jadwal'
      setDeleteError(msg)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-app-muted">Memuat data penjadwalan...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  return (
    <div className="space-y-4">
      {!loading && !error && itemList.length > 0 && (
        <div className="card w-full bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="form-control w-full sm:max-w-xs">
                <label className="label py-1" htmlFor="filter-hari">
                  <span className="label-text font-medium">Hari</span>
                </label>
                <select
                  id="filter-hari"
                  className="select select-bordered select-sm w-full"
                  value={filterHari}
                  onChange={(e) => setFilterHari(e.target.value)}
                >
                  <option value="">Semua Hari</option>
                  {hariOptions.map((hari) => (
                    <option key={hari} value={hari}>
                      {hari}
                    </option>
                  ))}
                </select>
              </div>
              {kelasOptions.length > 0 && (
                <div className="form-control w-full sm:max-w-xs">
                  <label className="label py-1" htmlFor="filter-kelas">
                    <span className="label-text font-medium">Kelas</span>
                  </label>
                  <select
                    id="filter-kelas"
                    className="select select-bordered select-sm w-full"
                    value={filterKelas}
                    onChange={(e) => setFilterKelas(e.target.value)}
                  >
                    <option value="">Semua Kelas</option>
                    {kelasOptions.map((kelas) => (
                      <option key={kelas.id} value={kelas.id}>
                        {kelas.nama}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          {deleteError && <div className="alert alert-error">{deleteError}</div>}

          {itemList.length === 0 ? (
            <p className="text-app-muted">Belum ada data penjadwalan.</p>
          ) : filteredList.length === 0 ? (
            <p className="text-app-muted">Tidak ada data jadwal untuk filter yang dipilih.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kelas</th>
                      <th>Mata Pelajaran</th>
                      <th>Guru</th>
                      <th>Hari</th>
                      <th>Jam Mulai</th>
                      <th>Jam Selesai</th>
                      <th className="text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id_jadwal}>
                        <td>{(safePage - 1) * PENJADWALAN_PER_PAGE + index + 1}</td>
                        <td>{item.nama_kelas ?? '-'}</td>
                        <td className="font-medium">{item.nama_mapel ?? '-'}</td>
                        <td>{item.nama_guru ?? '-'}</td>
                        <td>{item.hari ?? '-'}</td>
                        <td>{formatJam(item.jam_mulai)}</td>
                        <td>{formatJam(item.jam_selesai)}</td>
                        <td className="text-right">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/Penjadwalan/PenjadwalanResource/EditPenjadwalan/${item.id_jadwal}`,
                              )
                            }
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id_jadwal)}
                              className="btn btn-error btn-sm"
                              disabled={deletingId === item.id_jadwal}
                            >
                              {deletingId === item.id_jadwal ? 'Menghapus...' : 'Hapus'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-sm text-app-muted">
                  Menampilkan {(safePage - 1) * PENJADWALAN_PER_PAGE + 1}–
                  {Math.min(safePage * PENJADWALAN_PER_PAGE, total)} dari {total} data
                </p>
                <div className="join">
                  <button
                    type="button"
                    className="join-item btn btn-sm"
                    disabled={safePage <= 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                  >
                    «
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`join-item btn btn-sm ${page === safePage ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="join-item btn btn-sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}