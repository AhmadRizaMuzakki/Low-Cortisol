import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getKelas } from '../../utils/Induk_Akademik/KelasUtils'
import { parseListResponse } from '../../utils/Induk_Akademik/apiHelpers'
import {
  hitungRataRata,
  paginateList,
  PENILAIAN_PER_PAGE,
  semesterOptions,
  formatSemesterLabel,
  normalizeSemester,
} from '../../utils/Penilaian/PenilaianUtils'

export default function PenilaianTable({ itemList = [], loading = false, error = null }) {
  const navigate = useNavigate()
  const [filterSemester, setFilterSemester] = useState('')
  const [filterKelas, setFilterKelas] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [kelasList, setKelasList] = useState([])

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
      const matchSemester =
        !filterSemester || normalizeSemester(item.semester) === filterSemester
      const matchKelas = !filterKelas || String(item.id_kelas) === filterKelas
      return matchSemester && matchKelas
    })
  }, [itemList, filterSemester, filterKelas])

  const { items, total, totalPages, currentPage: safePage } = useMemo(
    () => paginateList(filteredList, currentPage),
    [filteredList, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [filterSemester, filterKelas, itemList.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  if (loading) {
    return <p className="text-app-muted">Memuat data penilaian...</p>
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
                <label className="label py-1" htmlFor="filter-semester">
                  <span className="label-text font-medium">Semester</span>
                </label>
                <select
                  id="filter-semester"
                  className="select select-bordered select-sm w-full"
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                >
                  <option value="">Semua Semester</option>
                  {semesterOptions.map((semester) => (
                    <option key={semester.value} value={semester.value}>
                      {semester.label}
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
          {itemList.length === 0 ? (
            <p className="text-app-muted">Belum ada data penilaian.</p>
          ) : filteredList.length === 0 ? (
            <p className="text-app-muted">Tidak ada data penilaian untuk filter yang dipilih.</p>
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
                      <th>Semester</th>
                      <th>Tugas</th>
                      <th>UTS</th>
                      <th>UAS</th>
                      <th>Rata-rata</th>
                      <th>Catatan</th>
                      <th className="text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id_nilai}>
                        <td>{(safePage - 1) * PENILAIAN_PER_PAGE + index + 1}</td>
                        <td className="font-medium">{item.nama_siswa ?? '-'}</td>
                        <td>{item.nama_mapel ?? '-'}</td>
                        <td>{item.nama_kelas ?? '-'}</td>
                        <td>{formatSemesterLabel(item.semester)}</td>
                        <td>{item.nilai_tugas ?? '-'}</td>
                        <td>{item.nilai_uts ?? '-'}</td>
                        <td>{item.nilai_uas ?? '-'}</td>
                        <td className="font-semibold">
                          {hitungRataRata(item.nilai_tugas, item.nilai_uts, item.nilai_uas)}
                        </td>
                        <td className="max-w-[180px] truncate">{item.catatan_karakter || '-'}</td>
                        <td className="text-right">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/Penilaian/PenilaianResource/EditPenilaian/${item.id_nilai}`)
                            }
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-sm text-app-muted">
                  Menampilkan {(safePage - 1) * PENILAIAN_PER_PAGE + 1}–
                  {Math.min(safePage * PENILAIAN_PER_PAGE, total)} dari {total} data
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