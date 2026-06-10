import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Header({ onOpenSidebar }) {
  const [dropdownToggle, setDropdownToggle] = useState(false)
  const { logout } = useAuth()
  const { username, role } = useAuth()
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate('/login')
  }
  return (
    <header className="shrink-0 border-b border-gray-200/80 bg-white px-4 py-3 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Kiri: Tombol buka sidebar dan search */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Tombol buka sidebar (hanya mobile) */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-lg p-2 text-app-navy hover:bg-gray-100 md:hidden"
            aria-label="Buka menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Form pencarian */}
          <div className="relative flex-1 max-w-lg min-w-0">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-app-muted">
              <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Cari data siswa atau guru..."
              aria-label="Cari"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-11 text-sm text-app-navy placeholder:text-app-muted transition-colors focus:border-app-primary/40 focus:bg-white focus:ring-2 focus:ring-app-primary/20 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-3 flex shrink-0 items-center justify-end gap-4 sm:mt-0 sm:gap-5">
          <button
            type="button"
            className="relative rounded-lg p-2 text-app-muted transition-colors hover:bg-gray-100 hover:text-app-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-app-primary"
            aria-label="Notifikasi"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-app-primary px-1 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownToggle((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 py-1 pr-2 pl-1 transition-colors hover:bg-gray-100"
            >
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold leading-tight text-app-navy">{username}</p>
              </div>
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-app-primary text-sm font-bold text-white ring-2 ring-white"
                aria-hidden="true"
              >
                {role === 'admin' ? 'AD' : role === 'guru' ? 'GU' : 'ST'}
              </div>
            </button>
            {dropdownToggle && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-10">
                <ul className="py-1 flex flex-col gap-2 items-center justify-center">
                  <li className="w-full flex justify-center">
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-center">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
         
            )}
          </div>
        </div>
      </div>
    </header>
  )
}