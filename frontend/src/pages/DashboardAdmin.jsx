import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Navbar from '../layouts/Navbar'
import Header from '../layouts/header'
import http from '../utils/http'
export default function DashboardAdmin() {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [guruCount, setGuruCount] = useState(0)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    const fetchGuruCount = async () => {
      try {
        const response = await http.get('/guru')
        const dataGuru = response.data?.data

        let jumlahGuru = 0
        if (Array.isArray(dataGuru)) {
          jumlahGuru = dataGuru.length
        }

        setGuruCount(jumlahGuru)
      } catch (error) {
        console.error('Gagal mengambil jumlah guru:', error)
        setGuruCount(0)
      }
    }
    fetchGuruCount()
  }, [])
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
            {/* Judul ringkasan + badge tahun ajaran */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">RINGKASAN SEKOLAH</h1>
              </div>
              <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-app-primary/20 bg-app-primary/10 px-4 py-2 text-sm font-semibold text-app-primary">
                <span className="text-base leading-none" aria-hidden="true">
                  ⓘ
                </span>
                Tahun Ajaran 2024/2025 Genap
              </div>
            </div>

            {/* Kartu statistik */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                    <p className="text-sm font-medium text-app-muted">Guru & Staf</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">{guruCount}</p>
                    <p className="mt-2 text-xs text-app-muted">Aktif Semester ini</p>
                  </div>
                  <div className="rounded-xl bg-app-primary/10 p-3 text-app-primary">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-app-muted">Kehadiran Hari Ini</p>
                    <p className="mt-1 text-3xl font-bold text-app-navy">96.4%</p>
                    <p className="mt-2 text-xs font-medium text-emerald-600">Sangat Baik</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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

            {/* Dua kolom: tabel siswa | pengumuman */}
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="rounded-xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-app-primary/10 p-2 text-app-primary">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <h2 className="text-base font-bold text-app-navy">Siswa Baru Terdaftar</h2>
                  </div>
                  <button type="button" className="text-sm font-semibold text-app-primary hover:text-app-primary-dark">
                    Lihat Semua
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-xs font-semibold uppercase tracking-wide text-app-muted">
                        <th className="px-5 py-3">Siswa</th>
                        <th className="px-5 py-3">NISN</th>
                        <th className="px-5 py-3">Kelas</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-app-primary/30 to-app-primary/5 ring-2 ring-white" />
                            <span className="font-medium text-app-navy">Ahmad Fauzi</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-app-muted">0012345678</td>
                        <td className="px-5 py-3 font-medium">4A</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            Lengkap
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-app-muted hover:bg-gray-100 hover:text-app-navy"
                            aria-label="Menu aksi"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-app-primary/30 to-app-primary/5 ring-2 ring-white" />
                            <span className="font-medium text-app-navy">Siti Nurhaliza</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-app-muted">0012345679</td>
                        <td className="px-5 py-3 font-medium">4B</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                            Foto Kurang
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-app-muted hover:bg-gray-100 hover:text-app-navy"
                            aria-label="Menu aksi"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-app-primary/30 to-app-primary/5 ring-2 ring-white" />
                            <span className="font-medium text-app-navy">Budi Santoso</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-app-muted">0012345680</td>
                        <td className="px-5 py-3 font-medium">5A</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                            Lengkap
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-app-muted hover:bg-gray-100 hover:text-app-navy"
                            aria-label="Menu aksi"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 px-5 py-4">
                  <h2 className="text-base font-bold text-app-navy">Pengumuman Internal</h2>
                </div>
                <div className="flex flex-1 flex-col divide-y divide-gray-100 px-5 py-2">
                  <div className="flex gap-3 py-4 first:pt-2">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-app-primary" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-app-navy">Upacara Bendera</p>
                      <p className="mt-1 text-sm text-app-muted">
                        Memperingati hari kemerdekaan, seluruh siswa wajib berpakaian batik.
                      </p>
                      <p className="mt-2 text-xs text-app-muted">12 Mei 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-3 py-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-app-navy">Imunisasi MR</p>
                      <p className="mt-1 text-sm text-app-muted">Kelas 1-3 diwajibkan membawa surat izin orang tua.</p>
                      <p className="mt-2 text-xs text-app-muted">10 Mei 2026</p>
                    </div>
                  </div>
                  <div className="flex gap-3 py-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-app-navy">Libur Semester</p>
                      <p className="mt-1 text-sm text-app-muted">Mulai tanggal 20 Juni hingga 10 Juli 2026.</p>
                      <p className="mt-2 text-xs text-app-muted">05 Mei 2026</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    className="w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-bold tracking-wide text-app-muted transition-colors hover:border-app-primary/40 hover:bg-app-primary/5 hover:text-app-primary"
                  >
                    + TAMBAH PENGUMUMAN
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
