import { useNavigate } from 'react-router-dom'

export default function GuruComponent({ guruList = [], loading = false, error = null }) {
    const navigate = useNavigate()
    if (loading) {
        return <p className="text-app-muted">Memuat data guru...</p>
      }
    
      if (error) {
        return <p className="text-error">{error}</p>
      }
    
      if (guruList.length === 0) {
        return <p className="text-app-muted">Belum ada data guru.</p>
      }
    
      return (
        
        <div className="card w-full bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>NIP</th>
                    <th>Nama Guru</th>
                    <th>Jenis Kelamin</th>
                    <th>No HP</th>
                    <th className="text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guruList.map((guru) => (
                    <tr key={   guru.id_guru}>
                      <td>{guru.nip ?? '-'}</td>
                      <td>{guru.nama_guru ?? '-'}</td>
                      <td>{guru.jenis_kelamin ?? '-'}</td>
                      <td>{guru.no_hp ?? '-'}</td>
                      <td className="text-right">
                        <button onClick={() => navigate(`/Induk_Akademik/GuruResource/EditGuru/${guru.id_guru}`)} type="button" className="btn btn-primary btn-sm">
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