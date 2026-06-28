import http from '../http'

export const PENILAIAN_PER_PAGE = 10

export function getPenilaian() {
  return http.get('/penilaian')
}

export function getPenilaianById(id) {
  return http.get(`/penilaian/${id}`)
}

export function createPenilaian(data) {
  return http.post('/penilaian', data)
}

export function updatePenilaian(id, data) {
  return http.put(`/penilaian/${id}`, data)
}

export function deletePenilaian(id) {
  return http.delete(`/penilaian/${id}`)
}

export function getMapelPenilaian() {
  return http.get('/mapel')
}

export const semesterOptions = [
  { value: 'ganjil', label: 'Ganjil' },
  { value: 'genap', label: 'Genap' },
]

export function formatSemesterLabel(value) {
  if (!value) return '-'
  const found = semesterOptions.find((item) => item.value === String(value).toLowerCase())
  return found?.label ?? value
}

export function normalizeSemester(value) {
  return String(value || '').toLowerCase()
}

export function hitungRataRata(tugas, uts, uas) {
  const values = [tugas, uts, uas].filter((v) => v !== null && v !== undefined && v !== '')
  if (values.length === 0) return '-'
  const total = values.reduce((sum, v) => sum + Number(v), 0)
  return Math.round(total / values.length)
}

export function paginateList(list, page, perPage = PENILAIAN_PER_PAGE) {
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