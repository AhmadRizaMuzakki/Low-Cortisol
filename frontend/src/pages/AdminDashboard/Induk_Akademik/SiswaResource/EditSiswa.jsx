import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getApiBaseUrl,
  getAuthHeaders,
  mapGenderToForm,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'

function formatDateForInput(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

export default function EditSiswa() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nisn: '',
    nama_siswa: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    id_kelas: '',
    user_id: '',
  })
  const [classList, setClassList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setLoading(true)

    fetch(`${getApiBaseUrl()}/api/siswa/${id}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error('Data siswa tidak ditemukan')
        return res.json()
      })
      .then((payload) => {
        const data = payload?.data ?? payload
        setForm({
          nisn: data.nisn ?? '',
          nama_siswa: data.nama_siswa ?? '',
          tanggal_lahir: formatDateForInput(data.tanggal_lahir),
          jenis_kelamin: mapGenderToForm(data.jenis_kelamin),
          alamat: data.alamat ?? '',
          id_kelas: data.id_kelas ?? '',
          user_id: data.user_id ?? '',
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    fetch(`${getApiBaseUrl()}/api/kelas`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((payload) => setClassList(parseListResponse(payload)))
      .catch(() => setClassList([]))
  }, [id])

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
      const res = await fetch(`${getApiBaseUrl()}/api/siswa/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Gagal mengubah data siswa')
        setSubmitting(false)
        return
      }

      setSuccess('Siswa berhasil diupdate')
      setTimeout(() => navigate('/Induk_Akademik/Siswa'), 1200)
    } catch {
      setError('Gagal terhubung ke server')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg" />
        <span className="ml-2 text-app-muted">Memuat data siswa...</span>
      </div>
    )
  }

  if (error && !form.nisn) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Siswa</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label"><span className="label-text">NISN</span></label>
          <input type="text" name="nisn" className="input input-bordered w-full" value={form.nisn} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Nama Siswa</span></label>
          <input type="text" name="nama_siswa" className="input input-bordered w-full" value={form.nama_siswa} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Tanggal Lahir</span></label>
          <input type="date" name="tanggal_lahir" className="input input-bordered w-full" value={form.tanggal_lahir} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Jenis Kelamin</span></label>
          <select name="jenis_kelamin" className="select select-bordered w-full" value={form.jenis_kelamin} onChange={handleChange} required>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="label"><span className="label-text">Alamat</span></label>
          <textarea name="alamat" className="textarea textarea-bordered w-full" value={form.alamat} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Kelas</span></label>
          <select name="id_kelas" className="select select-bordered w-full" value={form.id_kelas} onChange={handleChange} required>
            <option value="">Pilih Kelas</option>
            {classList.map((item) => (
              <option key={item.id_kelas} value={item.id_kelas}>{item.nama_kelas}</option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="flex gap-2 justify-end">
          <button type="submit" className={`btn btn-primary ${submitting ? 'btn-disabled' : ''}`} disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/Induk_Akademik/Siswa')} disabled={submitting}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
