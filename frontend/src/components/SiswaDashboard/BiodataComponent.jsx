import { useNavigate } from 'react-router-dom'

function formatDateForInput(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10)
  return date.toISOString().split('T')[0]
}

export default function BiodataComponent({ biodata = null, loading = false, error = null }) {
  const navigate = useNavigate()

  if (loading) {
    return <p className="text-app-muted">Memuat data biodata...</p>
  }
  if (error) {
    return <p className="text-red-600">{error}</p>
  }
  if (!biodata) {
    return <div className="text-app-muted">Belum ada data biodata.</div>
  }

  const handleEditBiodata = () => {
    navigate(`/dashboard-siswa/biodata/EditBiodata/${biodata.id_siswa}`)
  }

  return (
    <div className="mx-auto max-w-[1200px] rounded-xl bg-white p-8 shadow-md">
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">Nama Lengkap</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nama_siswa}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">NISN</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nisn}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">Kelas</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nama_kelas || '-'}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">Tanggal Lahir</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {formatDateForInput(biodata.tanggal_lahir)}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">Jenis Kelamin</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.jenis_kelamin}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-app-muted">Alamat</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.alamat}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleEditBiodata}
          className="rounded-lg bg-app-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-app-primary/90"
        >
          Edit Biodata
        </button>
      </div>
    </div>
  )
}
