import http from '../http'

export function getNilaiSiswa() {
  return http.get('/siswa/nilai')
}
