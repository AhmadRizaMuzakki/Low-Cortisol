import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'

export default function TambahKelas() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama_kelas: '',
    tahun_ajaran: '',
    id_guru_wali: '',
  })
  const [teacherList, setTeacherList] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/api/guru`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data guru')
        return res.json()
      })
      .then((payload) => setTeacherList(parseListResponse(payload)))
      .catch(() => setTeacherList([]))
  }, [])

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
      const response = await fetch(`${getApiBaseUrl()}/api/kelas`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const res = await response.json()
        throw new Error(res?.message || 'Gagal menambah kelas')
      }

      setSuccess('Kelas berhasil ditambahkan')
      setTimeout(() => navigate('/Induk_Akademik/Kelas'), 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Kelas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label"><span className="label-text">Nama Kelas</span></label>
          <input type="text" name="nama_kelas" className="input input-bordered w-full" value={form.nama_kelas} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">Tahun Ajaran</span></label>
          <input type="text" name="tahun_ajaran" placeholder="2024/2025" className="input input-bordered w-full" value={form.tahun_ajaran} onChange={handleChange} required />
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
