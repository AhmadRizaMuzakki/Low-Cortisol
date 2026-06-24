import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getKelas } from '../../../../utils/Induk_Akademik/KelasUtils'
import { getMapel } from '../../../../utils/Induk_Akademik/MapelUtils.jsx'
import { getGuru } from '../../../../utils/Induk_Akademik/GuruUtils.jsx'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'
import {
  formatJamInput,
  getPenjadwalanById,
  hariOptions,
} from '../../../../utils/Penjadwalan/PenjadwalanUtils'

export default function EditPenjadwalan() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, role } = useAuth()
  const [form, setForm] = useState({
    id_kelas: '',
    id_mapel: '',
    id_guru: '',
    hari: 'Senin',
    jam_mulai: '',
    jam_selesai: '',
  })
  const [kelasList, setKelasList] = useState([])
  const [mapelList, setMapelList] = useState([])
  const [guruList, setGuruList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return

    setLoading(true)

    Promise.all([getPenjadwalanById(id), getKelas(), getMapel(), getGuru()])
      .then(([jadwalRes, kelasRes, mapelRes, guruRes]) => {
        const data = jadwalRes.data?.data ?? jadwalRes.data

        setForm({
          id_kelas: String(data.id_kelas ?? ''),
          id_mapel: String(data.id_mapel ?? ''),
          id_guru: String(data.id_guru ?? ''),
          hari: data.hari ?? 'Senin',
          jam_mulai: formatJamInput(data.jam_mulai),
          jam_selesai: formatJamInput(data.jam_selesai),
        })
        setKelasList(parseListResponse(kelasRes.data))
        setMapelList(parseListResponse(mapelRes.data))
        setGuruList(parseListResponse(guruRes.data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Data jadwal tidak ditemukan')
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
      const res = await fetch(`${getApiBaseUrl()}/api/penjadwalan/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          id_kelas: Number(form.id_kelas),
          id_mapel: Number(form.id_mapel),
          id_guru: Number(form.id_guru),
          hari: form.hari,
          jam_mulai: form.jam_mulai,
          jam_selesai: form.jam_selesai,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = data?.error?.error || data?.message || 'Gagal mengubah data jadwal'
        setError(msg)
        setSubmitting(false)
        return
      }

      setSuccess('Jadwal berhasil diupdate')
      setTimeout(() => navigate('/Penjadwalan'), 1200)
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
        <span className="ml-2 text-app-muted">Memuat data jadwal...</span>
      </div>
    )
  }

  if (error && !form.id_kelas) {
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
      <h2 className="mb-6 text-2xl font-bold">Edit Jadwal</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            <option value="">Pilih kelas</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id_kelas} value={kelas.id_kelas}>
                {kelas.nama_kelas}
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
            <span className="label-text">Guru</span>
          </label>
          <select
            name="id_guru"
            className="select select-bordered w-full"
            value={form.id_guru}
            onChange={handleChange}
            required
          >
            <option value="">Pilih guru</option>
            {guruList.map((guru) => (
              <option key={guru.id_guru} value={guru.id_guru}>
                {guru.nama_guru}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Hari</span>
          </label>
          <select
            name="hari"
            className="select select-bordered w-full"
            value={form.hari}
            onChange={handleChange}
            required
          >
            {hariOptions.map((hari) => (
              <option key={hari} value={hari}>
                {hari}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">
              <span className="label-text">Jam Mulai</span>
            </label>
            <input
              type="time"
              name="jam_mulai"
              className="input input-bordered w-full"
              value={form.jam_mulai}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Jam Selesai</span>
            </label>
            <input
              type="time"
              name="jam_selesai"
              className="input input-bordered w-full"
              value={form.jam_selesai}
              onChange={handleChange}
              required
            />
          </div>
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
            onClick={() => navigate('/Penjadwalan')}
            disabled={submitting}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}