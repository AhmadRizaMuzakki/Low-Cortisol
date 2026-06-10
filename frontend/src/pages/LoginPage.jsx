import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import http from '../utils/http.jsx'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Cek auth setelah render
  useEffect(() => {
    setCheckingAuth(false)
  }, [])

  // Loading state sambil cek auth
  if (checkingAuth) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-red-50 via-white to-red-100/60 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 shadow-xl shadow-red-900/10 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-xl font-bold text-white shadow-md shadow-red-600/30">
            SD
          </div>
          <p className="text-slate-600">Memeriksa sesi login...</p>
        </div>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { username, password } = formData
    if (!username || !password) {
      setError('Username dan password wajib diisi!')
      setLoading(false)
      return
    }

    try {
      const response = await http.post('/login', { username, password })
      const result = response.data
      const token = result.data?.token || result.token

      if (token) {
        const userRole = result.data?.user?.role
        const userName = result.data?.user?.username
        login(token, userName, userRole)
        alert('Login Berhasil!')
        if (userRole === 'admin' || userRole === 'guru') {
          navigate('/dashboard', { replace: true })
        } else if (userRole === 'siswa') {
          navigate('/dashboard-siswa', { replace: true })
        } else {
          setError('Role tidak dikenali.')
        }
      } else {
        setError('Token tidak ditemukan dalam respon server.')
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Gagal masuk, periksa koneksi atau akun Anda.')
      }
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
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-red-500/30 transition focus:border-red-500 focus:ring-2"
              placeholder="masukan username anda"
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
                value={formData.password}
                onChange={handleChange}
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
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-red-700 hover:underline">
            Daftar
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-slate-600">
          <Link to="/" className="font-medium text-red-700 hover:underline">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  )
}