import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'

export default function EditKelas() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama_kelas: '',
    tahun_ajaran: '',
    id_guru_wali: '',
  })
  const [teacherList, setTeacherList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setLoading(true)

    fetch(`${getApiBaseUrl()}/api/kelas/${id}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error('Data kelas tidak ditemukan')
        return res.json()
      })
      .then((payload) => {
        const data = payload?.data ?? payload
        setForm({
          nama_kelas: data.nama_kelas ?? '',
          tahun_ajaran: data.tahun_ajaran ?? '',
          id_guru_wali: data.id_guru_wali ?? '',
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    fetch(`${getApiBaseUrl()}/api/guru`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((payload) => setTeacherList(parseListResponse(payload)))
      .catch(() => setTeacherList([]))
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
      const res = await fetch(`${getApiBaseUrl()}/api/kelas/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Gagal mengubah data kelas')
        setSubmitting(false)
        return
      }

      setSuccess('Kelas berhasil diupdate')
      setTimeout(() => navigate('/Induk_Akademik/Kelas'), 1200)
    } catch {
      setError('Gagal terhubung ke server')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg" />
        <span className="ml-2 text-app-muted">Memuat data kelas...</span>
      </div>
    )
  }

  if (error && !form.nama_kelas) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Kelas</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label"><span className="label-text">Nama Kelas</span></label>
          <input type="text" name="nama_kelas" className="input input-bordered w-full" value={form.nama_kelas} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Tahun Ajaran</span></label>
          <input type="text" name="tahun_ajaran" className="input input-bordered w-full" value={form.tahun_ajaran} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Guru Wali</span></label>
          <select name="id_guru_wali" className="select select-bordered w-full" value={form.id_guru_wali} onChange={handleChange} required>
            <option value="">Pilih Guru Wali</option>
            {teacherList.map((item) => (
              <option key={item.id_guru} value={item.id_guru}>{item.nama_guru}</option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="flex gap-2 justify-end">
          <button type="submit" className={`btn btn-primary ${submitting ? 'btn-disabled' : ''}`} disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/Induk_Akademik/Kelas')} disabled={submitting}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
