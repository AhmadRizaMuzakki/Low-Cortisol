export default function MapelComponent({ mapelList = [], loading = false, error = null }) {
    if (loading) {
        return <p className="text-app-muted">Memuat data mata pelajaran...</p>
    }
    if (error) {
        return <p className="text-error">{error}</p>
    }
    if (mapelList.length === 0) {
        return <p className="text-app-muted">Belum ada data mata pelajaran.</p>
    }
    return (
        <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Nama Mata Pelajaran</th>
                  <th>KKM</th>
                  <th className="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mapelList.map((mapel) => (
                  <tr key={mapel.id_mapel}>
                    <td className="font-medium">{mapel.nama_mapel}</td>
                    <td>{mapel.kkm}</td>
                  <td className="flex justify-end gap-2">
                    <button type="button" className="btn btn-primary btn-sm">
                      Edit
                    </button>
                    <button type="button" className="btn btn-error btn-sm">
                      Hapus
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}