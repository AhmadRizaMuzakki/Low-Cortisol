import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getApiBaseUrl } from '../services/api'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      const token =
        (typeof data.error === 'object' && data.error?.token) || data.token

      if (!res.ok || !token) {
        setError(
          data.message ||
            'Login gagal. Periksa username dan sandi, lalu coba lagi.',
        )
        return
      }
      login(token)
      navigate('/dashboard', { replace: true })
    } catch {
      setError(
        'Tidak dapat menghubungi server. Pastikan API berjalan dan coba lagi.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-red-50 via-white to-red-100/60 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 shadow-xl shadow-red-900/10">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-xl font-bold text-white shadow-md shadow-red-600/30">
            SD
          </div>
          <h1 className="text-2xl font-bold text-red-900">Masuk</h1>
          <p className="mt-1 text-sm text-slate-600">
            Portal SD Negeri 1 Merah Putih
          </p>
        </div>

        {error && (
          <div
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-red-500/30 transition focus:border-red-500 focus:ring-2"
              placeholder="contoh: budi_santoso"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 pr-11 text-slate-900 outline-none ring-red-500/30 transition focus:border-red-500 focus:ring-2"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link to="/" className="font-medium text-red-700 hover:underline">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  )
}
