const DOT_COLORS = ['bg-app-primary', 'bg-emerald-500', 'bg-amber-500']

function formatTanggal(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function PengumumanComponent({ pengumuman = [], loading = false, limit }) {
  const items = limit ? pengumuman.slice(0, limit) : pengumuman

  return (
    <div className="mt-5 mx-auto max-w-[1500px]">
      <section className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-bold text-app-navy">Pengumuman</h2>
        </div>
        <div className="flex flex-1 flex-col divide-y divide-gray-100 px-5 py-2">
          {loading ? (
            <p className="py-6 text-center text-sm text-app-muted">Memuat pengumuman...</p>
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id} className="flex gap-3 py-4 first:pt-2">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${DOT_COLORS[index % DOT_COLORS.length]}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-app-navy">{item.judul}</p>
                  <p className="mt-1 text-sm text-app-muted">{item.deskripsi}</p>
                  <p className="mt-2 text-xs text-app-muted">
                    {formatTanggal(item.tanggal || item.created_at)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-app-muted">Belum ada pengumuman.</p>
          )}
        </div>
      </section>
    </div>
  )
}
