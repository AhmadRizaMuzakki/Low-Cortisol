import { useNavigate } from 'react-router-dom'
export default function SiswaComponent({ siswaList = [], loading = false, error = null }) {
  const navigate = useNavigate()
  if (loading) {
    return <p className="text-app-muted">Memuat data siswa...</p>
  }

  if (error) {
    return <p className="text-error">{error}</p>
  }

  if (siswaList.length === 0) {
    return <p className="text-app-muted">Belum ada data siswa.</p>
  }

  return (
    
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
                <th>Kelas</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {siswaList.map((siswa) => (
                <tr key={siswa.id_siswa}>
                  <td>{siswa.nisn ?? '-'}</td>
                  <td>{siswa.nama_siswa ?? '-'}</td>
                  <td>{siswa.tanggal_lahir ?? '-'}</td>
                  <td>{siswa.jenis_kelamin ?? '-'}</td>
                  <td>{siswa.alamat ?? '-'}</td>
                  <td>{siswa.nama_kelas ?? '-'}</td>
                  <td className="text-right">
                    <button onClick={() => navigate(`/Induk_Akademik/SiswaResource/EditSiswa/${siswa.id_siswa}`)} type="button" className="btn btn-primary btn-sm">
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
