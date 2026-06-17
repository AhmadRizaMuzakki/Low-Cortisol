const STATUS_STYLES = {
  hadir: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  izin: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  sakit: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  alpha: 'bg-red-50 text-red-700 ring-red-600/20',
}

const PRESENSI_ACTIONS = [
  { value: 'hadir', label: 'Hadir', className: 'bg-emerald-600 hover:bg-emerald-700' },
  { value: 'izin', label: 'Izin', className: 'bg-amber-500 hover:bg-amber-600' },
  { value: 'sakit', label: 'Sakit', className: 'bg-blue-600 hover:bg-blue-700' },
]

function formatTanggal(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatJam(value) {
  if (!value) return '-'
  return String(value).slice(0, 5)
}

function formatStatus(value) {
  if (!value) return '-'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        STATUS_STYLES[status] || 'bg-gray-50 text-gray-700 ring-gray-600/20'
      }`}
    >
      {formatStatus(status)}
    </span>
  )
}

export default function PresensiComponent({
  presensi = [],
  jadwalHariIni = null,
  loading = false,
  loadingHariIni = false,
  error = null,
  errorHariIni = null,
  submittingId = null,
  submitError = null,
  onSubmitPresensi,
}) {
  if (loading && loadingHariIni) {
    return <p className="text-app-muted">Memuat data presensi...</p>
  }

  const list = Array.isArray(presensi) ? presensi : []
  const jadwalList = Array.isArray(jadwalHariIni?.jadwal) ? jadwalHariIni.jadwal : []

  return (
    <div className="space-y-6">
      <section className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-app-navy">Presensi Hari Ini</h2>
          {jadwalHariIni?.hari && (
            <p className="mt-1 text-sm text-app-muted">
              {jadwalHariIni.hari}
              {jadwalHariIni.tanggal ? `, ${formatTanggal(jadwalHariIni.tanggal)}` : ''}
            </p>
          )}
        </div>

        {loadingHariIni ? (
          <p className="px-5 py-6 text-sm text-app-muted">Memuat jadwal hari ini...</p>
        ) : errorHariIni ? (
          <p className="px-5 py-6 text-sm text-red-600">{errorHariIni}</p>
        ) : jadwalList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    No
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
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jadwalList.map((item, index) => {
                  const sudahPresensi = Boolean(item.status_presensi)
                  const isSubmitting = submittingId === item.id_jadwal

                  return (
                    <tr key={item.id_jadwal ?? `${item.nama_mapel}-${index}`}>
                      <td className="px-5 py-3 text-sm text-app-navy">{index + 1}</td>
                      <td className="px-5 py-3 text-sm text-app-muted">
                        {formatJam(item.jam_mulai)} - {formatJam(item.jam_selesai)}
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-app-navy">{item.nama_mapel}</td>
                      <td className="px-5 py-3 text-sm text-app-muted">{item.nama_guru}</td>
                      <td className="px-5 py-3 text-sm">
                        {sudahPresensi ? (
                          <StatusBadge status={item.status_presensi} />
                        ) : (
                          <span className="text-app-muted">Belum presensi</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-sm">
                        {sudahPresensi ? (
                          <span className="text-xs text-app-muted">Selesai</span>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {PRESENSI_ACTIONS.map((action) => (
                              <button
                                key={action.value}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => onSubmitPresensi?.(item.id_jadwal, action.value)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow transition disabled:opacity-60 ${action.className}`}
                              >
                                {isSubmitting ? 'Menyimpan...' : action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 py-6 text-center text-sm text-app-muted">
            Tidak ada jadwal pelajaran hari ini.
          </p>
        )}

        {submitError && (
          <p className="border-t border-gray-100 px-5 py-3 text-sm text-red-600">{submitError}</p>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-app-navy">Riwayat Presensi</h2>
        </div>

        {loading ? (
          <p className="px-5 py-6 text-sm text-app-muted">Memuat data presensi...</p>
        ) : error ? (
          <p className="px-5 py-6 text-sm text-red-600">{error}</p>
        ) : list.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    No
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Tanggal
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
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-app-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list.map((item, index) => (
                  <tr key={item.id_presensi ?? `${item.tanggal}-${item.nama_mapel}-${index}`}>
                    <td className="px-5 py-3 text-sm text-app-navy">{index + 1}</td>
                    <td className="px-5 py-3 text-sm text-app-navy">{formatTanggal(item.tanggal)}</td>
                    <td className="px-5 py-3 text-sm text-app-muted">{item.hari || '-'}</td>
                    <td className="px-5 py-3 text-sm text-app-muted">
                      {formatJam(item.jam_mulai)} - {formatJam(item.jam_selesai)}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-app-navy">{item.nama_mapel}</td>
                    <td className="px-5 py-3 text-sm text-app-muted">{item.nama_guru}</td>
                    <td className="px-5 py-3 text-sm">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 py-6 text-center text-sm text-app-muted">
            Belum ada data presensi.
          </p>
        )}
      </section>
    </div>
  )
}
