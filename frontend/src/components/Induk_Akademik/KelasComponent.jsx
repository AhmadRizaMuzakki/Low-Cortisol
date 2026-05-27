export default function KelasComponent({ kelasList = [], loading = false, error = null }) {
    if (loading) {
        return <p className="text-app-muted">Memuat data kelas...</p>
    }
    if (error) {
        return <p className="text-error">{error}</p>
    }
    if (kelasList.length === 0) {
        return <p className="text-app-muted">Belum ada data kelas.</p>
    }
    return (
        <div className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Nama Kelas</th>
                                <th>Tahun Ajaran</th>
                                <th>Guru Wali</th>
                                <th className="text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelasList.map((kelas) => (
                                <tr key={kelas.id_kelas}>
                                    <td className="font-medium">{kelas.nama_kelas}</td>
                                    <td>{kelas.tahun_ajaran}</td>
                                    <td>{kelas.nama_guru ?? '-'}</td>
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