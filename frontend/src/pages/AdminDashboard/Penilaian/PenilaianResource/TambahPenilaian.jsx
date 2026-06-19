import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getSiswa } from '../../../../utils/Induk_Akademik/SiswaUtils.jsx'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'
import { getMapelPenilaian, semesterOptions } from '../../../../utils/Penilaian/PenilaianUtils'

export default function TambahPenilaian() {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAuth()
  const [form, setForm] = useState({
    id_siswa: '',
    id_mapel: '',
    semester: 'ganjil',
    nilai_tugas: '',
    nilai_uts: '',
    nilai_uas: '',
    catatan_karakter: '',
  })
  const [siswaList, setSiswaList] = useState([])
  const [mapelList, setMapelList] = useState([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return

    setOptionsLoading(true)
    setOptionsError('')

    Promise.all([getSiswa(), getMapelPenilaian()])
      .then(([siswaRes, mapelRes]) => {
        setSiswaList(parseListResponse(siswaRes.data))
        setMapelList(parseListResponse(mapelRes.data))
      })
      .catch(() => {
        setSiswaList([])
        setMapelList([])
        setOptionsError('Gagal memuat data siswa atau mata pelajaran.')
      })
      .finally(() => setOptionsLoading(false))
  }, [isAuthenticated, role])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${getApiBaseUrl()}/api/penilaian`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          id_siswa: Number(form.id_siswa),
          id_mapel: Number(form.id_mapel),
          semester: form.semester,
          nilai_tugas: Number(form.nilai_tugas),
          nilai_uts: Number(form.nilai_uts),
          nilai_uas: Number(form.nilai_uas),
          catatan_karakter: form.catatan_karakter,
        }),
      })

      const res = await response.json().catch(() => ({}))
      if (!response.ok) {
        const msg = res?.error?.error || res?.message || 'Gagal menambah penilaian'
        throw new Error(msg)
      }

      setSuccess('Penilaian berhasil ditambahkan')
      setTimeout(() => navigate('/Penilaian'), 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'admin' && role !== 'guru') {
    return <Navigate to="/dashboard-siswa" replace />
  }

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Tambah Penilaian</h2>

      {optionsLoading && (
        <p className="mb-4 text-sm text-app-muted">Memuat data siswa dan mata pelajaran...</p>
      )}
      {optionsError && <div className="alert alert-error mb-4">{optionsError}</div>}
      {!optionsLoading && siswaList.length === 0 && (
        <div className="alert alert-warning mb-4">Belum ada data siswa.</div>
      )}
      {!optionsLoading && mapelList.length === 0 && (
        <div className="alert alert-warning mb-4">Belum ada data mata pelajaran.</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Siswa</span>
          </label>
          <select
            name="id_siswa"
            className="select select-bordered w-full"
            value={form.id_siswa}
            onChange={handleChange}
            required
            disabled={optionsLoading || siswaList.length === 0}
          >
            <option value="">Pilih siswa</option>
            {siswaList.map((siswa) => (
              <option key={siswa.id_siswa} value={siswa.id_siswa}>
                {siswa.nama_siswa}
                {siswa.nama_kelas ? ` — ${siswa.nama_kelas}` : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Mata Pelajaran</span>
          </label>
          <select
            name="id_mapel"
            className="select select-bordered w-full"
            value={form.id_mapel}
            onChange={handleChange}
            required
            disabled={optionsLoading || mapelList.length === 0}
          >
            <option value="">Pilih mata pelajaran</option>
            {mapelList.map((mapel) => (
              <option key={mapel.id_mapel} value={mapel.id_mapel}>
                {mapel.nama_mapel}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-app-muted">
            Jadwal akan disesuaikan otomatis berdasarkan kelas siswa dan mata pelajaran.
          </p>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Semester</span>
          </label>
          <select
            name="semester"
            className="select select-bordered w-full"
            value={form.semester}
            onChange={handleChange}
            required
          >
            {semesterOptions.map((semester) => (
              <option key={semester.value} value={semester.value}>
                {semester.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">
              <span className="label-text">Tugas</span>
            </label>
            <input
              type="number"
              name="nilai_tugas"
              min="0"
              max="100"
              className="input input-bordered w-full"
              value={form.nilai_tugas}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">UTS</span>
            </label>
            <input
              type="number"
              name="nilai_uts"
              min="0"
              max="100"
              className="input input-bordered w-full"
              value={form.nilai_uts}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">UAS</span>
            </label>
            <input
              type="number"
              name="nilai_uas"
              min="0"
              max="100"
              className="input input-bordered w-full"
              value={form.nilai_uas}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Catatan Karakter</span>
          </label>
          <textarea
            name="catatan_karakter"
            rows={3}
            className="textarea textarea-bordered w-full"
            value={form.catatan_karakter}
            onChange={handleChange}
            placeholder="Opsional"
          />
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className={`btn btn-primary ${submitting ? 'btn-disabled' : ''}`}
            disabled={submitting || optionsLoading}
          >
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/Penilaian')}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}