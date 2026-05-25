import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [kelasList, setKelasList] = useState([])

  useEffect(() => {
    setLoading(true)
    // Fetch data siswa
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/siswa/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Data siswa tidak ditemukan')
        return res.json()
      })
      .then(data => {
        setForm({
          nisn: data.nisn ?? '',
          nama_siswa: data.nama_siswa ?? '',
          tanggal_lahir: data.tanggal_lahir ?? '',
          jenis_kelamin: data.jenis_kelamin ?? '',
          alamat: data.alamat ?? '',
          id_kelas: data.id_kelas ?? '',
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })

    // Fetch daftar kelas
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/kelas`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })
      .then(res => res.json())
      .then(data => setKelasList(data))
      .catch(() => setKelasList([]))
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/siswa/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.message || 'Gagal mengubah data siswa')
        setSubmitting(false)
        return
      }

      // Success, kembali ke halaman daftar siswa
      navigate('/induk-akademik/siswa')
    } catch (err) {
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
      <h2 className="text-2xl font-bold mb-6">Edit Siswa</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            <span className="label-text">NISN</span>
          </label>
          <input
            type="text"
            name="nisn"
            className="input input-bordered w-full"
            value={form.nisn}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Nama Siswa</span>
          </label>
          <input
            type="text"
            name="nama_siswa"
            className="input input-bordered w-full"
            value={form.nama_siswa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Tanggal Lahir</span>
          </label>
          <input
            type="date"
            name="tanggal_lahir"
            className="input input-bordered w-full"
            value={form.tanggal_lahir}
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
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Alamat</span>
          </label>
          <textarea
            name="alamat"
            className="textarea textarea-bordered w-full"
            value={form.alamat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Kelas</span>
          </label>
          <select
            name="id_kelas"
            className="select select-bordered w-full"
            value={form.id_kelas}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Kelas</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id_kelas} value={kelas.id_kelas}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
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
            onClick={() => navigate(-1)}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}