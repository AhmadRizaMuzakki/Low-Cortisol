import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

const schoolName = 'SD Negeri 1 Merah Putih'
const tagline =
  'Sekolah Dasar Negeri yang mendidik siswa berprestasi, berakhlak mulia, dan cinta tanah air.'

/** Satu “beranda” = rute `/` (tanpa hash); anchor lain memakai `/#id` agar konsisten dari route mana pun. */
const navLinks = [
  { to: '/', label: 'Beranda', home: true },
  { to: '/#profil', label: 'Profil' },
  { to: '/#program', label: 'Program' },
  { to: '/#fasilitas', label: 'Fasilitas' },
  { to: '/#kontak', label: 'Kontak' },
]

function MenuIcon({ open }) {
  return (
    <span className="relative block h-3.5 w-5">
      <span
        className={`absolute left-0 block h-0.5 w-full rounded-full bg-red-900 transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
      />
      <span
        className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-red-900 transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-full rounded-full bg-red-900 transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
      />
    </span>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  /** Di halaman utama: selalu ke puncak + URL bersih `/` (bukan `/#beranda`). */
  function handleHomeClick(e) {
    setMenuOpen(false)
    if (location.pathname !== '/') return
    e.preventDefault()
    navigate({ pathname: '/', hash: '' }, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-dvh bg-white text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-red-100 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={handleHomeClick}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-lg font-bold text-white shadow-md shadow-red-600/30">
              SD
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-semibold text-red-900 sm:text-base">
                {schoolName}
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                Kab. / Kota · Dinas Pendidikan
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) =>
              item.home ? (
                <Link
                  key={item.to}
                  to="/"
                  onClick={handleHomeClick}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-800"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-800"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition hover:bg-red-700"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    navigate('/', { replace: true })
                  }}
                  className="rounded-lg border-2 border-red-200 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border-2 border-red-600 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Masuk
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border border-red-600 px-3 py-1.5 text-xs font-semibold text-red-700"
              >
                Masuk
              </Link>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-900 hover:bg-red-50"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-red-100 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((item) =>
                item.home ? (
                  <Link
                    key={item.to}
                    to="/"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-800"
                    onClick={handleHomeClick}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="mt-2 rounded-lg bg-red-600 py-2.5 text-center text-sm font-semibold text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="rounded-lg border border-red-200 py-2.5 text-center text-sm font-semibold text-red-800"
                    onClick={() => {
                      setMenuOpen(false)
                      logout()
                      navigate('/', { replace: true })
                    }}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="mt-2 rounded-lg border-2 border-red-600 py-2.5 text-center text-sm font-semibold text-red-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main id="beranda" className="scroll-mt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-red-100">
              <span className="h-2 w-2 rounded-full bg-white" aria-hidden />
              Merdeka Belajar · Kurikulum Merdeka
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Pendidikan dasar yang membentuk karakter bangsa
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-red-100 sm:text-lg">
              {tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#profil"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-red-800 shadow-lg transition hover:bg-red-50"
              >
                Kenali sekolah kami
              </Link>
              <Link
                to="/#kontak"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Hubungi kami
              </Link>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-10 text-center sm:text-left">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-red-200">
                  Siswa
                </dt>
                <dd className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  280+
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-red-200">
                  Guru &amp; tenaga
                </dt>
                <dd className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  18
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-red-200">
                  Akreditasi
                </dt>
                <dd className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  A
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          id="profil"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-red-900 sm:text-3xl">
              Profil sekolah
            </h2>
            <p className="mt-3 text-slate-600">
              {schoolName} berkomitmen pada pembelajaran bermakna, lingkungan
              yang aman, serta kerja sama orang tua dan masyarakat.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Visi',
                text: 'Terwujudnya peserta didik yang beriman, bertaqwa, berprestasi, dan berwawasan lingkungan.',
              },
              {
                title: 'Misi',
                text: 'Menyelenggarakan pembelajaran aktif, membina budaya literasi, dan memperkuat nilai kebangsaan.',
              },
              {
                title: 'Tujuan',
                text: 'Mencapai kompetensi lulusan sesuai standar Kurikulum Merdeka dan kebutuhan zaman.',
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-red-100 bg-red-50/40 p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-red-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="program"
          className="scroll-mt-20 border-y border-red-100 bg-red-50/50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-red-900 sm:text-3xl">
                  Program unggulan
                </h2>
                <p className="mt-2 max-w-xl text-slate-600">
                  Kegiatan yang mendukung tumbuh kembang siswa SD sesuai
                  perkembangan usia di Indonesia.
                </p>
              </div>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Literasi & numerasi berbasis proyek',
                'Pembiasaan sholat dhuha dan adab islami',
                'Pramuka dan kegiatan kepemimpinan',
                'Seni budaya nusantara & tari daerah',
                'Olahraga rutin & mini atletik',
                'Gerakan sekolah ramah anak',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-red-100 bg-white p-4 shadow-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="fasilitas"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <h2 className="text-center text-2xl font-bold text-red-900 sm:text-3xl">
            Fasilitas pendukung
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Sarana yang memenuhi standar untuk pembelajaran tatap muka yang
            nyaman dan aman.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Ruang kelas representatif',
              'Perpustakaan digital & fisik',
              'Laboratorium sederhana',
              'Halaman bermain & lapangan',
              'UKM kesehatan & konseling',
              'Mushola & ruang ibadah',
              'Kantin sehat bergizi',
              'Akses internet pembelajaran',
            ].map((name) => (
              <div
                key={name}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-800 shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        <section
          id="kontak"
          className="scroll-mt-20 bg-red-900 py-16 text-white sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Hubungi sekolah
                </h2>
                <p className="mt-3 text-red-100">
                  Kami terbuka untuk kunjungan orang tua calon peserta didik dan
                  kerja sama dengan komunitas setempat.
                </p>
                <address className="mt-8 space-y-3 not-italic text-sm text-red-50">
                  <p>
                    <span className="font-semibold text-white">Alamat:</span>
                    <br />
                    Jl. Pendidikan No. 10, Kelurahan, Kecamatan, Provinsi
                  </p>
                  <p>
                    <span className="font-semibold text-white">Telepon:</span>{' '}
                    (021) 0000-0000
                  </p>
                  <p>
                    <span className="font-semibold text-white">Email:</span>{' '}
                    info@sdn1merahputih.sch.id
                  </p>
                </address>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-medium text-red-100">
                  Akses layanan digital
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Orang tua &amp; siswa dapat masuk ke portal informasi.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-50"
                    >
                      Buka dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-50"
                    >
                      Masuk ke portal
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-red-950 bg-red-950 py-8 text-center text-xs text-red-200">
        <p className="font-medium text-white">{schoolName}</p>
        <p className="mt-1">
          NPSN 00000000 · © {new Date().getFullYear()} — Tema warna kebangsaan
          untuk pendidikan dasar Indonesia
        </p>
      </footer>
    </div>
  )
}
