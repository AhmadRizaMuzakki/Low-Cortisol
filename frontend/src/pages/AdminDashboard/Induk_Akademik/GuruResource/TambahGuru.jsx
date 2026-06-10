import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateUsername, getApiBaseUrl, getAuthHeaders } from '../../../../utils/Induk_Akademik/apiHelpers'

export default function TambahGuru() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nip: '',
    nama_guru: '',
    jenis_kelamin: '',
    no_hp: '',
    password: '', // tambahkan password
    // UserID dan Username akan di-handle dari nama_guru
    role: 'guru', // default role, disable di input
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
      const username = generateUsername(form.nama_guru)

      // Sesuaikan field sesuai kebutuhan API Anda
      const bodyPost = {
        nip: form.nip,
        nama_guru: form.nama_guru,
        jenis_kelamin: form.jenis_kelamin,
        no_hp: form.no_hp,
        password: form.password,
        username, // Username dari nama_guru
        role: form.role, // role dari state (diinput disable)
      }

      const response = await fetch(`${getApiBaseUrl()}/api/guru`, {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(bodyPost),
      })

      if (!response.ok) {
        const res = await response.json()
        throw new Error(res?.message || 'Gagal menambah guru')
      }

      setSuccess('Guru berhasil ditambahkan')
      setTimeout(() => {
        navigate('/Induk_Akademik/Guru')
      }, 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Tambah Guru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="hidden">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={generateUsername(form.nama_guru)}
            disabled
            readOnly
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={form.role}
            disabled
            readOnly
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