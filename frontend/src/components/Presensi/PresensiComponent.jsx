import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKelas } from '../../utils/Induk_Akademik/KelasUtils'
import { getMapel } from '../../utils/Induk_Akademik/MapelUtils.jsx'
import { parseListResponse } from '../../utils/Induk_Akademik/apiHelpers'
import {
  deletePresensi,
  formatStatus,
  formatTanggal,
  paginateList,
  PRESENSI_PER_PAGE,
  statusPresensiOptions,
} from '../../utils/Presensi/PresensiUtils'

const STATUS_BADGE = {
  hadir: 'badge-success',
  izin: 'badge-warning',
  sakit: 'badge-info',
  alpha: 'badge-error',
}

export default function PresensiComponent({
  itemList = [],
  loading = false,
  error = null,
  isAdmin = false,
  onItemDeleted,
}) {
  const navigate = useNavigate()
  const [filterMapel, setFilterMapel] = useState('')
  const [filterKelas, setFilterKelas] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [kelasList, setKelasList] = useState([])
  const [mapelList, setMapelList] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    Promise.all([getKelas(), getMapel()])
      .then(([kelasRes, mapelRes]) => {
        setKelasList(parseListResponse(kelasRes.data))
        setMapelList(parseListResponse(mapelRes.data))
      })
      .catch(() => {
        setKelasList([])
        setMapelList([])
      })
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

  const mapelOptions = useMemo(() => {
    if (mapelList.length > 0) {
      return mapelList
        .map((mapel) => ({
          id: String(mapel.id_mapel),
          nama: mapel.nama_mapel,
        }))
        .sort((a, b) => a.nama.localeCompare(b.nama))
    }

    const map = new Map()
    itemList.forEach((item) => {
      if (item.id_mapel != null && item.nama_mapel) {
        map.set(String(item.id_mapel), item.nama_mapel)
      }
    })
    return [...map.entries()]
      .map(([id, nama]) => ({ id, nama }))
      .sort((a, b) => a.nama.localeCompare(b.nama))
  }, [mapelList, itemList])

  const filteredList = useMemo(() => {
    return itemList.filter((item) => {
      const matchMapel = !filterMapel || String(item.id_mapel) === filterMapel
      const matchKelas = !filterKelas || String(item.id_kelas) === filterKelas
      const matchStatus =
        !filterStatus || String(item.status || '').toLowerCase() === filterStatus
      return matchMapel && matchKelas && matchStatus
    })
  }, [itemList, filterMapel, filterKelas, filterStatus])

  const { items, total, totalPages, currentPage: safePage } = useMemo(
    () => paginateList(filteredList, currentPage),
    [filteredList, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [filterMapel, filterKelas, filterStatus, itemList.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  async function handleDelete(id) {
    if (id == null || id === '') {
      setDeleteError('ID presensi tidak valid')
      return
    }

    if (!window.confirm('Yakin ingin menghapus presensi ini?')) {
      return
    }

    setDeletingId(id)
    setDeleteError('')

    try {
      await deletePresensi(id)
      onItemDeleted?.(id)
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error?.error ||
        err.message ||
        'Gagal menghapus presensi'
      setDeleteError(msg)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-app-muted">Memuat data presensi...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  return (
    <div className="space-y-4">
      {!loading && !error && (
        <div className="card w-full bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="form-control w-full sm:max-w-xs">
                <label className="label py-1" htmlFor="filter-mapel">
                  <span className="label-text font-medium">Mata Pelajaran</span>
                </label>
                <select
                  id="filter-mapel"
                  className="select select-bordered select-sm w-full"
                  value={filterMapel}
                  onChange={(e) => setFilterMapel(e.target.value)}
                >
                  <option value="">Semua Mata Pelajaran</option>
                  {mapelOptions.map((mapel) => (
                    <option key={mapel.id} value={mapel.id}>
                      {mapel.nama}
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
              <div className="form-control w-full sm:max-w-xs">
                <label className="label py-1" htmlFor="filter-status">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  id="filter-status"
                  className="select select-bordered select-sm w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Semua Status</option>
                  {statusPresensiOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          {deleteError && <div className="alert alert-error">{deleteError}</div>}

          {itemList.length === 0 ? (
            <p className="text-app-muted">Belum ada data presensi.</p>
          ) : filteredList.length === 0 ? (
            <p className="text-app-muted">Tidak ada data presensi untuk filter yang dipilih.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Siswa</th>
                      <th>Mata Pelajaran</th>
                      <th>Kelas</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                      <th className="text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const normalizedStatus = String(item.status || '').toLowerCase()
                      return (
                        <tr key={item.id_presensi}>
                          <td>{(safePage - 1) * PRESENSI_PER_PAGE + index + 1}</td>
                          <td className="font-medium">{item.nama_siswa ?? '-'}</td>
                          <td>{item.nama_mapel ?? '-'}</td>
                          <td>{item.nama_kelas ?? '-'}</td>
                          <td>{formatTanggal(item.tanggal)}</td>
                          <td>
                            <span
                              className={`badge badge-sm ${STATUS_BADGE[normalizedStatus] || 'badge-ghost'}`}
                            >
                              {formatStatus(item.status)}
                            </span>
                          </td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.id_presensi == null || item.id_presensi === '') {
                                  setDeleteError('ID presensi tidak valid')
                                  return
                                }
                                navigate(
                                  `/Presensi/PresensiResource/EditPresensi/${item.id_presensi}`,
                                )
                              }}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </button>
                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id_presensi)}
                                className="btn btn-error btn-sm"
                                disabled={deletingId === item.id_presensi}
                              >
                                {deletingId === item.id_presensi ? 'Menghapus...' : 'Hapus'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-sm text-app-muted">
                  Menampilkan {(safePage - 1) * PRESENSI_PER_PAGE + 1}–
                  {Math.min(safePage * PRESENSI_PER_PAGE, total)} dari {total} data
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