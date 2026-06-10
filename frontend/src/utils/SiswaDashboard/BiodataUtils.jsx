import http from '../http'

export function getBiodataSiswa() {
  return http.get('/siswa/biodata')
}

export function updateBiodataSiswa(data) {
  return http.put('/siswa/biodata', data)
}
