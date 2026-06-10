export function parseListResponse(payload) {
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.error)) return payload.error
  return []
}

export function mapGenderToForm(value) {
  if (value === 'L') return 'Laki-laki'
  if (value === 'P') return 'Perempuan'
  return value ?? ''
}

export function generateUsername(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]+/g, '')
}

export function getAuthHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    ...extra,
  }
}

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || ''
}
