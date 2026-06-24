import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import { getKelas } from '../../../../utils/Induk_Akademik/KelasUtils'
import { getMapel } from '../../../../utils/Induk_Akademik/MapelUtils.jsx'
import { getGuru } from '../../../../utils/Induk_Akademik/GuruUtils.jsx'
import {
  getApiBaseUrl,
  getAuthHeaders,
  parseListResponse,
} from '../../../../utils/Induk_Akademik/apiHelpers'
import { hariOptions } from '../../../../utils/Penjadwalan/PenjadwalanUtils'

export default function TambahPenjadwalan() {
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
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isAuthenticated || (role !== 'admin' && role !== 'guru')) return

    setOptionsLoading(true)
    setOptionsError('')

    Promise.all([getKelas(), getMapel(), getGuru()])
      .then(([kelasRes, mapelRes, guruRes]) => {
        setKelasList(parseListResponse(kelasRes.data))
        setMapelList(parseListResponse(mapelRes.data))
        setGuruList(parseListResponse(guruRes.data))
      })
      .catch(() => {
        setKelasList([])
        setMapelList([])
        setGuruList([])
        setOptionsError('Gagal memuat data kelas, mapel, atau guru.')
      })
      .finally(() => setOptionsLoading(false))
  }, [isAuthenticated, role])

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
      const response = await fetch(`${getApiBaseUrl()}/api/penjadwalan`, {
        method: 'POST',
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

      const res = await response.json().catch(() => ({}))
      if (!response.ok) {
        const msg = res?.error?.error || res?.message || 'Gagal menambah jadwal'
        throw new Error(msg)
      }

      setSuccess('Jadwal berhasil ditambahkan')
      setTimeout(() => navigate('/Penjadwalan'), 1000)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'admin' && role !== 'guru') {
    return <Navigate to="/dashboard-siswa" replace />
  }

  return (
    <div className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Tambah Jadwal</h2>

      {optionsLoading && (
        <p className="mb-4 text-sm text-app-muted">Memuat data kelas, mapel, dan guru...</p>
      )}
      {optionsError && <div className="alert alert-error mb-4">{optionsError}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={optionsLoading || kelasList.length === 0}
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
            disabled={optionsLoading || mapelList.length === 0}
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
            disabled={optionsLoading || guruList.length === 0}
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
            disabled={submitting || optionsLoading}
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