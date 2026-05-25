import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../layouts/Navbar'
import Header from '../layouts/header'
export default function DashboardSiswa() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Navbar mobileOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Dashboard Siswa</h1>
          </div>
          {/* kartu statistik */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mx-auto max-w-[1500px]">
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-app-muted">Total Siswa</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">842</p>
                    <p className="mt-2 text-xs font-medium text-emerald-600">↑ 12% dari tahun lalu</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-app-muted">jadwal pelajaran</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">42</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-app-muted">semester ini</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">Ganjil 2026</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-app-muted">Tunggakan SPP</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">14</p>
                    <p className="mt-2 text-xs font-medium text-amber-600">Perlu Tindak Lanjut</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  )
}