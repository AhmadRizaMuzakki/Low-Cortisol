import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getSiswa } from '../../../../utils/Induk_Akademik/SiswaUtils.jsx'
import { getPenjadwalan } from '../../../../utils/Penjadwalan/PenjadwalanUtils'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'
import { formatJam, statusPresensiOptions } from '../../../../utils/Presensi/PresensiUtils'

export default function TambahPresensi() {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAuth()
  const [form, setForm] = useState({
    id_siswa: '',
    id_jadwal: '',
    tanggal: new Date().toISOString().slice(0, 10),
    status: 'hadir',
  })
  const [siswaList, setSiswaList] = useState([])
  const [jadwalList, setJadwalList] = useState([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return

    setOptionsLoading(true)
    setOptionsError('')

    Promise.all([getSiswa(), getPenjadwalan()])
      .then(([siswaRes, jadwalRes]) => {
        setSiswaList(parseListResponse(siswaRes.data))
        setJadwalList(parseListResponse(jadwalRes.data))
      })
      .catch(() => {
        setSiswaList([])
        setJadwalList([])
        setOptionsError('Gagal memuat data siswa atau jadwal.')
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
      const response = await fetch(`${getApiBaseUrl()}/api/kehadiran`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          id_siswa: Number(form.id_siswa),
          id_jadwal: Number(form.id_jadwal),
          tanggal: form.tanggal,
          status: form.status,
        }),
      })

      const res = await response.json().catch(() => ({}))
      if (!response.ok) {
        const msg = res?.error?.error || res?.message || 'Gagal menambah presensi'
        throw new Error(msg)
      }

      setSuccess('Presensi berhasil ditambahkan')
      setTimeout(() => navigate('/Presensi'), 1000)
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
      <h2 className="mb-6 text-center text-2xl font-bold">Tambah Presensi</h2>

      {optionsLoading && (
        <p className="mb-4 text-sm text-app-muted">Memuat data siswa dan jadwal...</p>
      )}
      {optionsError && <div className="alert alert-error mb-4">{optionsError}</div>}
      {!optionsLoading && siswaList.length === 0 && (
        <div className="alert alert-warning mb-4">Belum ada data siswa.</div>
      )}
      {!optionsLoading && jadwalList.length === 0 && (
        <div className="alert alert-warning mb-4">Belum ada data jadwal.</div>
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
            <span className="label-text">Jadwal</span>
          </label>
          <select
            name="id_jadwal"
            className="select select-bordered w-full"
            value={form.id_jadwal}
            onChange={handleChange}
            required
            disabled={optionsLoading || jadwalList.length === 0}
          >
            <option value="">Pilih jadwal</option>
            {jadwalList.map((jadwal) => (
              <option key={jadwal.id_jadwal} value={jadwal.id_jadwal}>
                {jadwal.nama_mapel} — {jadwal.nama_kelas} ({jadwal.hari},{' '}
                {formatJam(jadwal.jam_mulai)}-{formatJam(jadwal.jam_selesai)})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Tanggal</span>
          </label>
          <input
            type="date"
            name="tanggal"
            className="input input-bordered w-full"
            value={form.tanggal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            name="status"
            className="select select-bordered w-full"
            value={form.status}
            onChange={handleChange}
            required
          >
            {statusPresensiOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
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
            onClick={() => navigate('/Presensi')}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}