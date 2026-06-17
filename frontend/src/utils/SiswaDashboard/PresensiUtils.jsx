import http from '../http'

export function getPresensiSiswa() {
  return http.get('/siswa/presensi')
}

export function getPresensiHariIniSiswa() {
  return http.get('/siswa/presensi/hari-ini')
}

export function submitPresensiSiswa(data) {
  return http.post('/siswa/presensi', data)
}
