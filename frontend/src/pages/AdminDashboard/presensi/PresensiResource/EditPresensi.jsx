import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getSiswa } from '../../../../utils/Induk_Akademik/SiswaUtils.jsx'
import { getPenjadwalan } from '../../../../utils/Penjadwalan/PenjadwalanUtils'
import { parseListResponse } from '../../../../utils/Induk_Akademik/apiHelpers'
import {
  formatJam,
  formatTanggalInput,
  getPresensiById,
  statusPresensiOptions,
  updatePresensi,
} from '../../../../utils/Presensi/PresensiUtils'
export default function EditPresensi() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAuth()
  const [form, setForm] = useState({
    id_siswa: '',
    id_jadwal: '',
    tanggal: '',
    status: 'hadir',
  })
  const [siswaList, setSiswaList] = useState([])
  const [jadwalList, setJadwalList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return
    const normalizedId = String(id ?? '').trim()
    if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
      setError('ID presensi tidak valid')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    Promise.all([getPresensiById(normalizedId), getSiswa(), getPenjadwalan()])
      .then(([presensiRes, siswaRes, jadwalRes]) => {
        const data = presensiRes.data?.data ?? presensiRes.data
        setForm({
          id_siswa: String(data.id_siswa ?? ''),
          id_jadwal: String(data.id_jadwal ?? ''),
          tanggal: formatTanggalInput(data.tanggal),
          status: String(data.status || 'hadir').toLowerCase(),
        })
        setSiswaList(parseListResponse(siswaRes.data))
        setJadwalList(parseListResponse(jadwalRes.data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Data presensi tidak ditemukan')
        setLoading(false)
      })
  }, [id, isAuthenticated, role])
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      await updatePresensi(id, {
        id_siswa: Number(form.id_siswa),
        id_jadwal: Number(form.id_jadwal),
        tanggal: form.tanggal,
        status: form.status,
      })
      setSuccess('Presensi berhasil diupdate')
      setTimeout(() => navigate('/Presensi'), 1200)
    } catch (err) {
      const msg =
        err.response?.data?.error?.error ||
        err.response?.data?.message ||
        err.message ||
        'Gagal mengubah data presensi'
      setError(msg)
      setSubmitting(false)
    }
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (role !== 'admin' && role !== 'guru') {
    return <Navigate to="/dashboard-siswa" replace />
  }
  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-dots loading-lg" />
        <span className="ml-2 text-app-muted">Memuat data presensi...</span>
      </div>
    )
  }
  if (error && !form.id_siswa) {
    return (
      <div className="mx-auto mt-8 max-w-xl">
        <div className="alert alert-error">{error}</div>
        <button type="button" className="btn btn-primary mt-2" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Edit Presensi</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            disabled={submitting}
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