import http from '../http'

export function getBiodataSiswa() {
  return http.get('/siswa/biodata')
}
