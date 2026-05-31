import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TambahSiswa() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nisn: '',
    nama_siswa: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    id_kelas: '',
  })
  const [kelasList, setKelasList] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // Fetch daftar kelas untuk pilihan kelas
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/kelas`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat data kelas')
        return res.json()
      })
      .then(data => setKelasList(Array.isArray(data) ? data : []))
      .catch(() => setKelasList([]))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/siswa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          nisn: form.nisn,
          nama_siswa: form.nama_siswa,
          tanggal_lahir: form.tanggal_lahir,
          jenis_kelamin: form.jenis_kelamin,
          alamat: form.alamat,
          id_kelas: form.id_kelas,
        }),
      })

      if (!response.ok) {
        const res = await response.json()
        throw new Error(res?.message || 'Gagal menambah siswa')
      }

      setSuccess('Siswa berhasil ditambahkan')
      setTimeout(() => {
        navigate('/Induk_Akademik/Siswa')
      }, 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Siswa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <option value="">Pilih Jenis Kelamin</option>
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
            required
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
            {kelasList.map((mapel) => (
              <option key={mapel.id_mapel} value={mapel.id_mapel}>
                {mapel.nama_mapel}
              </option>
            ))}
          </select>
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
            onClick={() => navigate('/Induk_Akademik/Siswa')}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}