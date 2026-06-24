import http from '../http'

export const PENJADWALAN_PER_PAGE = 10

export const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export function getPenjadwalan() {
  return http.get('/penjadwalan')
}

export function getPenjadwalanById(id) {
  return http.get(`/penjadwalan/${id}`)
}

export function createPenjadwalan(data) {
  return http.post('/penjadwalan', data)
}

export function updatePenjadwalan(id, data) {
  return http.put(`/penjadwalan/${id}`, data)
}

export function deletePenjadwalan(id) {
  return http.delete(`/penjadwalan/${id}`)
}

export function formatJam(value) {
  if (!value) return '-'
  return String(value).slice(0, 5)
}

export function formatJamInput(value) {
  if (!value) return ''
  return String(value).slice(0, 5)
}

export function paginateList(list, page, perPage = PENJADWALAN_PER_PAGE) {
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