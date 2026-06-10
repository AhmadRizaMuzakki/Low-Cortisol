import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getApiBaseUrl, getAuthHeaders } from '../../../../utils/Induk_Akademik/apiHelpers'

export default function EditMapel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama_mapel: '',
    kkm: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`${getApiBaseUrl()}/api/mapel/${id}`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error('Data mata pelajaran tidak ditemukan')
        return res.json()
      })
      .then((payload) => {
        const data = payload?.data ?? payload
        setForm({
          nama_mapel: data.nama_mapel ?? '',
          kkm: data.kkm ?? '',
        })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
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
      const res = await fetch(`${getApiBaseUrl()}/api/mapel/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          nama_mapel: form.nama_mapel,
          kkm: Number(form.kkm),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Gagal mengubah data mata pelajaran')
        setSubmitting(false)
        return
      }

      setSuccess('Mata pelajaran berhasil diupdate')
      setTimeout(() => navigate('/Induk_Akademik/Mapel'), 1200)
    } catch {
      setError('Gagal terhubung ke server')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg" />
        <span className="ml-2 text-app-muted">Memuat data mata pelajaran...</span>
      </div>
    )
  }

  if (error && !form.nama_mapel) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Mata Pelajaran</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label"><span className="label-text">Nama Mata Pelajaran</span></label>
          <input type="text" name="nama_mapel" className="input input-bordered w-full" value={form.nama_mapel} onChange={handleChange} required />
        </div>
        <div>
          <label className="label"><span className="label-text">KKM</span></label>
          <input type="number" name="kkm" min="0" max="100" className="input input-bordered w-full" value={form.kkm} onChange={handleChange} required />
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="flex gap-2 justify-end">
          <button type="submit" className={`btn btn-primary ${submitting ? 'btn-disabled' : ''}`} disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/Induk_Akademik/Mapel')} disabled={submitting}>
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
