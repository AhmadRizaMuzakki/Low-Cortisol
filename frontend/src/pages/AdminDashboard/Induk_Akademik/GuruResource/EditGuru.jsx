import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getApiBaseUrl, getAuthHeaders, mapGenderToForm } from '../../../../utils/Induk_Akademik/apiHelpers'

export default function EditGuru() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nip: '',
    nama_guru: '',
    jenis_kelamin: '',
    no_hp: '',
    user_id: '',
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setLoading(true)
    // Fetch data guru by id
    fetch(`${getApiBaseUrl()}/api/guru/${id}`, { headers: getAuthHeaders() })
      .then(res => {
        if (!res.ok) throw new Error('Data guru tidak ditemukan')
        return res.json()
      })
      .then((payload) => {
        const data = payload?.data ?? payload
        setForm({
          nip: data.nip ?? '',
          nama_guru: data.nama_guru ?? '',
          jenis_kelamin: mapGenderToForm(data.jenis_kelamin),
          no_hp: data.no_hp ?? '',
          user_id: data.user_id ?? '',
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`${getApiBaseUrl()}/api/guru/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(form)
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.message || 'Gagal mengubah data guru')
        setSubmitting(false)
        return
      }

      setSuccess('Guru berhasil diupdate')
      setTimeout(() => {
        navigate('/Induk_Akademik/Guru')
      }, 1200)
    } catch (err) {
      setError('Gagal terhubung ke server')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="loading loading-dots loading-lg" />
        <span className="ml-2 text-app-muted">Memuat data guru...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="alert alert-error">{error}</div>
        <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Guru</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            <span className="label-text">NIP</span>
          </label>
          <input
            type="text"
            name="nip"
            className="input input-bordered w-full"
            value={form.nip}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Nama Guru</span>
          </label>
          <input
            type="text"
            name="nama_guru"
            className="input input-bordered w-full"
            value={form.nama_guru}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Jenis Kelamin</span>
          </label>
          <select
            name="jenis_kelamin"
            className="select select-bordered w-full"
            value={form.jenis_kelamin}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">No HP</span>
          </label>
          <input
            type="text"
            name="no_hp"
            className="input input-bordered w-full"
            value={form.no_hp}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="flex gap-2 justify-end">
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
            onClick={() => navigate('/Induk_Akademik/Guru')}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}