import http from '../http'

export const PRESENSI_PER_PAGE = 10

export const statusPresensiOptions = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'izin', label: 'Izin' },
  { value: 'sakit', label: 'Sakit' },
  { value: 'alpha', label: 'Alpha' },
]

export function getPresensi() {
  return http.get('/kehadiran')
}

export function getPresensiById(id) {
  const normalizedId = String(id ?? '').trim()
  if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
    return Promise.reject(new Error('ID presensi tidak valid'))
  }
  return http.get(`/kehadiran/${normalizedId}`)
}

export function createPresensi(data) {
  return http.post('/kehadiran', data)
}

export function updatePresensi(id, data) {
  const normalizedId = String(id ?? '').trim()
  if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
    return Promise.reject(new Error('ID presensi tidak valid'))
  }
  return http.put(`/kehadiran/${normalizedId}`, data)
}

export function deletePresensi(id) {
  const normalizedId = String(id ?? '').trim()
  if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
    return Promise.reject(new Error('ID presensi tidak valid'))
  }
  return http.delete(`/kehadiran/${normalizedId}`)
}

export function formatTanggal(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTanggalInput(value) {
  if (!value) return ''
  const raw = String(value)
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10)
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

export function formatJam(value) {
  if (!value) return '-'
  return String(value).slice(0, 5)
}

export function formatStatus(value) {
  if (!value) return '-'
  const found = statusPresensiOptions.find(
    (item) => item.value === String(value).toLowerCase(),
  )
  return found?.label ?? value
}

export function paginateList(list, page, perPage = PRESENSI_PER_PAGE) {
  const total = list.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * perPage

  return {
    items: list.slice(start, start + perPage),
    total,
    totalPages,
    currentPage,
  }
}