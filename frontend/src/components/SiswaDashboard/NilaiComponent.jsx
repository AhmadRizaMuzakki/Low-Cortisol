import { useMemo, useState } from 'react'

const selectClass =
  'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-app-navy shadow-sm focus:border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary/20'

function formatNilai(value) {
  if (value === null || value === undefined || value === '') return '-'
  return value
}

function hitungRataRata(tugas, uts, uas) {
  const values = [tugas, uts, uas].filter((v) => v !== null && v !== undefined && v !== '')
  if (values.length === 0) return '-'
  const total = values.reduce((sum, v) => sum + Number(v), 0)
  return Math.round(total / values.length)
}

export default function NilaiComponent({ nilai = [], loading = false, error = null }) {
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedKelas, setSelectedKelas] = useState('')

  const semesterOptions = useMemo(() => {
    const list = Array.isArray(nilai) ? nilai : []
    return [...new Set(list.map((item) => item.semester).filter(Boolean))].sort()
  }, [nilai])

  const kelasOptions = useMemo(() => {
    const list = Array.isArray(nilai) ? nilai : []
    const map = new Map()
    list.forEach((item) => {
      if (item.id_kelas != null && item.nama_kelas) {
        map.set(String(item.id_kelas), item.nama_kelas)
      }
    })
    return [...map.entries()]
      .map(([id, nama]) => ({ id, nama }))
      .sort((a, b) => a.nama.localeCompare(b.nama))
  }, [nilai])

  const filteredList = useMemo(() => {
    const list = Array.isArray(nilai) ? nilai : []
    return list.filter((item) => {
      const matchSemester = !selectedSemester || item.semester === selectedSemester
      const matchKelas = !selectedKelas || String(item.id_kelas) === selectedKelas
      return matchSemester && matchKelas
    })
  }, [nilai, selectedSemester, selectedKelas])

  if (loading) {
    return <p className="text-app-muted">Memuat data nilai...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  const list = Array.isArray(nilai) ? nilai : []
  const hasData = list.length > 0

  return (
    <div className="space-y-4">
      {hasData && (semesterOptions.length > 0 || kelasOptions.length > 0) && (
        <div className="mx-auto max-w-[1200px] rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {semesterOptions.length > 0 && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <label htmlFor="filter-semester" className="text-sm font-medium text-app-muted">
                  Semester
                </label>
                <select
                  id="filter-semester"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Semua Semester</option>
                  {semesterOptions.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {kelasOptions.length > 0 && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <label htmlFor="filter-kelas" className="text-sm font-medium text-app-muted">
                  Kelas
                </label>
                <select
                  id="filter-kelas"
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  className={selectClass}
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
      )}

    <section className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-bold text-app-navy">Daftar Nilai</h2>
      </div>

      {hasData && filteredList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  No
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Mata Pelajaran
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Guru
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Kelas
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Semester
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Tugas
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  UTS
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  UAS
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Rata-rata
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                  Catatan Karakter
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredList.map((item, index) => (
                <tr key={item.id_nilai ?? `${item.nama_mapel}-${item.semester}-${index}`}>
                  <td className="px-5 py-3 text-sm text-app-navy">{index + 1}</td>
                  <td className="px-5 py-3 text-sm font-medium text-app-navy">{item.nama_mapel || '-'}</td>
                  <td className="px-5 py-3 text-sm text-app-muted">{item.nama_guru || '-'}</td>
                  <td className="px-5 py-3 text-sm text-app-muted">{item.nama_kelas || '-'}</td>
                  <td className="px-5 py-3 text-sm text-app-muted">{item.semester || '-'}</td>
                  <td className="px-5 py-3 text-sm text-app-navy">{formatNilai(item.nilai_tugas)}</td>
                  <td className="px-5 py-3 text-sm text-app-navy">{formatNilai(item.nilai_uts)}</td>
                  <td className="px-5 py-3 text-sm text-app-navy">{formatNilai(item.nilai_uas)}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-app-navy">
                    {hitungRataRata(item.nilai_tugas, item.nilai_uts, item.nilai_uas)}
                  </td>
                  <td className="px-5 py-3 text-sm text-app-muted">{item.catatan_karakter || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-5 py-6 text-center text-sm text-app-muted">
          {hasData ? 'Tidak ada data nilai untuk filter yang dipilih.' : 'Belum ada data nilai.'}
        </p>
      )}
    </section>
    </div>
  )
}
