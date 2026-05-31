export default function BiodataComponent({ biodata = null, loading = false, error = null }) {
  if (loading) {
    return <p className="text-app-muted">Memuat data biodata...</p>
  }
  if (error) {
    return <p className="text-red-600">{error}</p>
  }
  if (!biodata) {
    return <div className="text-app-muted">Belum ada data biodata.</div>
  }

  return (
    <div className="max-w-[1200px] mx-auto bg-white rounded-xl shadow-md p-8">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">Nama Lengkap</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nama_siswa}
          </div>
        </div>
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">NISN</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nisn}
          </div>
        </div>
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">Kelas</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.nama_kelas || '-'}
          </div>
        </div>
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">Tanggal Lahir</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.tanggal_lahir}
          </div>
        </div>
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">Jenis Kelamin</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.jenis_kelamin}
          </div>
        </div>
        <div>
          <label className="block text-app-muted text-sm font-medium mb-1">Alamat</label>
          <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
            {biodata.alamat}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="rounded-lg bg-app-primary text-white px-5 py-2 text-sm font-semibold shadow hover:bg-app-primary/90 transition">
          Edit Biodata
        </button>
      </div>
    </div>
  )
}
