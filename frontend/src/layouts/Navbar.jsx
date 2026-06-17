import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const linkActive = 'mx-3 flex items-center gap-3 rounded-lg bg-white/15 px-3 py-2.5 text-sm font-medium text-white shadow-sm'
const linkInactive = 'mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white'

const subLinkInactive = 'flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/80 hover:text-slate-900'
const subLinkActive = 'flex items-center rounded-md px-3 py-2.5 text-sm font-semibold text-app-primary bg-white shadow-sm ring-1 ring-slate-200/80'

export default function Navbar({ mobileOpen = false, onNavigate }) {
  const [indukOpen, setIndukOpen] = useState(false)
  const closeMobile = () => onNavigate?.()
  const { role } = useAuth()

  const isAdminOrGuru = role === 'admin' || role === 'guru'
  const isSiswa = role === 'siswa'
  const dashboardPath = isSiswa ? '/dashboard-siswa' : '/dashboard'

  function closeIndukAndMobile() {
    setIndukOpen(false)
    closeMobile()
  }

  return (
    <aside className={['z-30 flex h-screen w-64 shrink-0 flex-col bg-app-primary text-white', 'fixed inset-y-0 left-0 transition-transform duration-200 ease-out md:static md:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',].join(' ')}>
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
        <div className="flex items-center gap-3 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">SISDA</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-0.5">
          <NavLink to={dashboardPath} end onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </NavLink>

          {isAdminOrGuru && (
            <>
              <div>
                <button type="button" aria-expanded={indukOpen} aria-controls="nav-induk-akademik" id="nav-induk-akademik-trigger" onClick={() => setIndukOpen((open) => !open)} className={`${linkInactive} flex w-60 items-center justify-between`}>
                  <span className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Induk Akademik</span>
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-200 ${indukOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {indukOpen && (
                  <div
                    id="nav-induk-akademik"
                    role="region"
                    aria-labelledby="nav-induk-akademik-trigger"
                    className="mx-3 mt-2 rounded-lg border border-slate-200/30 bg-slate-50 p-2 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="flex flex-col gap-0.5">
                      <NavLink to="/Induk_Akademik/Guru" onClick={closeIndukAndMobile} className={({ isActive }) => (isActive ? subLinkActive : subLinkInactive)}>
                        Guru
                      </NavLink>
                      <NavLink to="/Induk_Akademik/Siswa" onClick={closeIndukAndMobile} className={({ isActive }) => (isActive ? subLinkActive : subLinkInactive)}>
                        Siswa
                      </NavLink>
                      <NavLink to="/Induk_Akademik/Kelas" onClick={closeIndukAndMobile} className={({ isActive }) => (isActive ? subLinkActive : subLinkInactive)}>
                        Kelas
                      </NavLink>
                      <NavLink to="/Induk_Akademik/Mapel" onClick={closeIndukAndMobile} className={({ isActive }) => (isActive ? subLinkActive : subLinkInactive)}>
                        Mapel
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/Penilaian" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Penilaian</span>
              </NavLink>

              <NavLink to="/Pengumuman" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Pengumuman</span>
              </NavLink>
            </>
          )}
          {isSiswa && (
            <NavLink to="/dashboard-siswa/biodata" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Biodata</span>
            </NavLink>
          )}
          {isSiswa && (
            <NavLink to="/dashboard-siswa/kelas" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Kelas</span>
            </NavLink>
          )}
          {isSiswa && (
            <NavLink to="/dashboard-siswa/presensi" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Presensi</span>
            </NavLink>
          )}
          {isSiswa && (
            <NavLink to="/dashboard-siswa/nilai" onClick={closeMobile} className={({ isActive }) => (isActive ? linkActive : linkInactive)}>
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Nilai</span>
            </NavLink>
          )}
        </nav>
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-center text-[11px] text-white/60">© 2026 SISDA</p>
    </aside>
  )
}
