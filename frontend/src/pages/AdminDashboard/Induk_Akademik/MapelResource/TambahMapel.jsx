import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiBaseUrl, getAuthHeaders } from '../../../../utils/Induk_Akademik/apiHelpers'

export default function TambahMapel() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nama_mapel: '',
    kkm: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
      const response = await fetch(`${getApiBaseUrl()}/api/mapel`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          nama_mapel: form.nama_mapel,
          kkm: Number(form.kkm),
        }),
      })

      if (!response.ok) {
        const res = await response.json()
        throw new Error(res?.message || 'Gagal menambah mata pelajaran')
      }

      setSuccess('Mata pelajaran berhasil ditambahkan')
      setTimeout(() => navigate('/Induk_Akademik/Mapel'), 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Mata Pelajaran</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
