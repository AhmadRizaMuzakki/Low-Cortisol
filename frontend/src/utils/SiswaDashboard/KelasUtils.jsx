import http from '../http'

export function getKelasSiswa() {
  return http.get('/siswa/kelas')
}
