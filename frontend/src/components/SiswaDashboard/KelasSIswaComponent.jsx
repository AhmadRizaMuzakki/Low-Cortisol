function formatJam(value) {
  if (!value) return '-'
  return String(value).slice(0, 5)
}

export default function KelasSiswaComponent({ kelas = null, loading = false, error = null }) {
  if (loading) {
    return <p className="text-app-muted">Memuat data kelas...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (!kelas) {
    return <div className="text-app-muted">Belum ada data kelas.</div>
  }

  const jadwalList = Array.isArray(kelas.jadwal_pelajaran) ? kelas.jadwal_pelajaran : []

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-[1200px] rounded-xl bg-white p-8 shadow-md">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-app-muted">Nama Kelas</label>
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
              {kelas.nama_kelas || '-'}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-app-muted">Tahun Ajaran</label>
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
              {kelas.tahun_ajaran || '-'}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-app-muted">Wali Kelas</label>
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-app-navy">
              {kelas.nama_guru_wali || '-'}
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-app-navy">Jadwal Pelajaran</h2>
        </div>

        {jadwalList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    No
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Hari
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Jam
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Mata Pelajaran
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Guru
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jadwalList.map((item, index) => (
                  <tr key={item.id_jadwal ?? `${item.hari}-${item.nama_mapel}-${index}`}>
                    <td className="px-5 py-3 text-sm text-app-navy">{index + 1}</td>
                    <td className="px-5 py-3 text-sm text-app-navy">{item.hari || '-'}</td>
                    <td className="px-5 py-3 text-sm text-app-muted">
                      {formatJam(item.jam_mulai)} - {formatJam(item.jam_selesai)}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-app-navy">{item.nama_mapel}</td>
                    <td className="px-5 py-3 text-sm text-app-muted">{item.nama_guru}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 py-6 text-center text-sm text-app-muted">
            Belum ada jadwal pelajaran untuk kelas ini. Admin perlu menambahkan jadwal di menu penjadwalan.
          </p>
        )}
      </section>
    </div>
  )
}
