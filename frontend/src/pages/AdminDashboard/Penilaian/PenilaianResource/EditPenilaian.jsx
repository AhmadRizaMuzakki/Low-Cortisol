import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getSiswa } from '../../../../utils/Induk_Akademik/SiswaUtils.jsx'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'
import {
  getMapelPenilaian,
  getPenilaianById,
  normalizeSemester,
  semesterOptions,
} from '../../../../utils/Penilaian/PenilaianUtils'

export default function EditPenilaian() {
  const { id } = useParams()
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
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return

    setLoading(true)

    Promise.all([getPenilaianById(id), getSiswa(), getMapelPenilaian()])
      .then(([penilaianRes, siswaRes, mapelRes]) => {
        const data = penilaianRes.data?.data ?? penilaianRes.data

        setForm({
          id_siswa: String(data.id_siswa ?? ''),
          id_mapel: String(data.id_mapel ?? ''),
          semester: normalizeSemester(data.semester) || 'ganjil',
          nilai_tugas: data.nilai_tugas ?? '',
          nilai_uts: data.nilai_uts ?? '',
          nilai_uas: data.nilai_uas ?? '',
          catatan_karakter: data.catatan_karakter ?? '',
        })
        setSiswaList(parseListResponse(siswaRes.data))
        setMapelList(parseListResponse(mapelRes.data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Data penilaian tidak ditemukan')
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
      const res = await fetch(`${getApiBaseUrl()}/api/penilaian/${id}`, {
        method: 'PUT',
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

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = data?.error?.error || data?.message || 'Gagal mengubah data penilaian'
        setError(msg)
        setSubmitting(false)
        return
      }

      setSuccess('Penilaian berhasil diupdate')
      setTimeout(() => navigate('/Penilaian'), 1200)
    } catch {
      setError('Gagal terhubung ke server')
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
        <span className="ml-2 text-app-muted">Memuat data penilaian...</span>
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
      <h2 className="mb-6 text-2xl font-bold">Edit Penilaian</h2>
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
            <span className="label-text">Mata Pelajaran</span>
          </label>
          <select
            name="id_mapel"
            className="select select-bordered w-full"
            value={form.id_mapel}
            onChange={handleChange}
            required
          >
            <option value="">Pilih mata pelajaran</option>
            {mapelList.map((mapel) => (
              <option key={mapel.id_mapel} value={mapel.id_mapel}>
                {mapel.nama_mapel}
              </option>
            ))}
          </select>
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
            disabled={submitting}
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