import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import Navbar from '../../../../layouts/Navbar'
import Header from '../../../../layouts/header'
import { getBiodataSiswa, updateBiodataSiswa } from '../../../../utils/SiswaDashboard/BiodataUtils.jsx'

function formatDateForInput(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10)
  return date.toISOString().split('T')[0]
}

const inputClass =
  'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-app-navy outline-none transition focus:border-app-primary focus:ring-1 focus:ring-app-primary'

export default function EditBiodata() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nisn: '',
    nama_siswa: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    nama_kelas: '',
  })

  useEffect(() => {
    async function fetchBiodata() {
      try {
        const response = await getBiodataSiswa()
        const biodata = response.data?.data

        if (!biodata) {
          setError('Biodata tidak ditemukan.')
          return
        }

        if (String(biodata.id_siswa) !== String(id)) {
          setError('Anda tidak memiliki akses untuk mengedit biodata ini.')
          return
        }

        setForm({
          nisn: biodata.nisn ?? '',
          nama_siswa: biodata.nama_siswa ?? '',
          tanggal_lahir: formatDateForInput(biodata.tanggal_lahir),
          jenis_kelamin: biodata.jenis_kelamin ?? '',
          alamat: biodata.alamat ?? '',
          nama_kelas: biodata.nama_kelas ?? '-',
        })
      } catch (err) {
        console.error('Error fetching biodata:', err)
        setError(err.response?.data?.message || 'Gagal memuat data biodata.')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) fetchBiodata()
  }, [id, isAuthenticated])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await updateBiodataSiswa({
        nisn: form.nisn,
        nama_siswa: form.nama_siswa,
        tanggal_lahir: form.tanggal_lahir,
        jenis_kelamin: form.jenis_kelamin,
        alamat: form.alamat,
      })
      navigate('/dashboard-siswa/biodata')
    } catch (err) {
      console.error('Error updating biodata:', err)
      setError(err.response?.data?.message || 'Gagal menyimpan perubahan biodata.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Navbar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">
              Edit Biodata
            </h1>

            <div className="mx-auto max-w-[1200px] rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
              {loading ? (
                <p className="text-app-muted">Memuat data biodata...</p>
              ) : error && !form.nama_siswa ? (
                <div>
                  <p className="text-red-600">{error}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard-siswa/biodata')}
                    className="mt-4 rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-app-navy transition hover:bg-gray-50"
                  >
                    Kembali
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="nama_siswa" className="mb-1 block text-sm font-medium text-app-muted">
                      Nama Lengkap
                    </label>
                    <input
                      id="nama_siswa"
                      type="text"
                      name="nama_siswa"
                      value={form.nama_siswa}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="nisn" className="mb-1 block text-sm font-medium text-app-muted">
                      NISN
                    </label>
                    <input
                      id="nisn"
                      type="text"
                      name="nisn"
                      value={form.nisn}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-app-muted">Kelas</label>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
                      {form.nama_kelas || '-'}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tanggal_lahir" className="mb-1 block text-sm font-medium text-app-muted">
                      Tanggal Lahir
                    </label>
                    <input
                      id="tanggal_lahir"
                      type="date"
                      name="tanggal_lahir"
                      value={form.tanggal_lahir}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="jenis_kelamin" className="mb-1 block text-sm font-medium text-app-muted">
                      Jenis Kelamin
                    </label>
                    <select
                      id="jenis_kelamin"
                      name="jenis_kelamin"
                      value={form.jenis_kelamin}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="alamat" className="mb-1 block text-sm font-medium text-app-muted">
                      Alamat
                    </label>
                    <textarea
                      id="alamat"
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard-siswa/biodata')}
                      disabled={submitting}
                      className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-app-navy transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-lg bg-app-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-app-primary/90 disabled:opacity-60"
                    >
                      {submitting ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
