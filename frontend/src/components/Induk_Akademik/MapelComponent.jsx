export default function MapelComponent() {
    return (
        <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>NISN</th>
                  <th>Kelas</th>
                  <th>Status</th>
                  <th className="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Ahmad Fauzi</td>
                  <td>0012345678</td>
                  <td>4A</td>
                  <td>
                    <span className="badge badge-success badge-sm">Aktif</span>
                  </td>
                  <td className="flex justify-end gap-2">
                    <button type="button" className="btn btn-primary btn-sm">
                      Edit
                    </button>
                    <button type="button" className="btn btn-error btn-sm">
                      Hapus
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Siti Nurhaliza</td>
                  <td>0012345679</td>
                  <td>4B</td>
                  <td>
                    <span className="badge badge-success badge-sm">Aktif</span>
                  </td>
                  <td className="flex justify-end gap-2">
                    <button type="button" className="btn btn-primary btn-sm">
                      Edit
                    </button>
                    <button type="button" className="btn btn-error btn-sm">
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}