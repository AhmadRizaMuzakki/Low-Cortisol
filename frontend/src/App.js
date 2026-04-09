import './App.css';

function App() {
  return (
    <div className="landing-page">
      <header className="hero">
        <nav className="navbar">
          <h1 className="brand">Sistem Sekolah</h1>
          <button className="nav-button" type="button">Masuk Portal</button>
        </nav>
        <div className="hero-content">
          <p className="badge">Platform Manajemen Sekolah Modern</p>
          <h2 className="hero-title">Kelola sekolah lebih cepat, rapi, dan terintegrasi</h2>
          <p className="hero-subtitle">
            Satu dashboard untuk data siswa, kehadiran, nilai, jadwal, hingga komunikasi orang tua.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button">Coba Demo</button>
            <button className="secondary-button" type="button">Lihat Fitur</button>
          </div>
        </div>
      </header>

      <main>
        <section className="stats">
          <div className="stat-card">
            <h3>1.200+</h3>
            <p>Siswa aktif terkelola</p>
          </div>
          <div className="stat-card">
            <h3>150+</h3>
            <p>Guru dan staf terhubung</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>Akurasi rekap kehadiran</p>
          </div>
        </section>

        <section className="features">
          <h2>Fitur Unggulan</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Administrasi Siswa</h3>
              <p>Pendaftaran, mutasi, dan riwayat akademik siswa tersimpan otomatis.</p>
            </article>
            <article className="feature-card">
              <h3>Absensi Real-time</h3>
              <p>Pantau kehadiran harian lengkap dengan laporan per kelas dan semester.</p>
            </article>
            <article className="feature-card">
              <h3>Manajemen Nilai</h3>
              <p>Input nilai lebih cepat, lengkap dengan analisis perkembangan siswa.</p>
            </article>
            <article className="feature-card">
              <h3>Komunikasi Orang Tua</h3>
              <p>Kirim pengumuman dan progres belajar langsung ke wali murid.</p>
            </article>
          </div>
        </section>

        <section className="cta">
          <h2>Siap digitalisasi sekolah Anda?</h2>
          <p>
            Gunakan Sistem Sekolah untuk meningkatkan efisiensi operasional dan kualitas layanan pendidikan.
          </p>
          <button className="primary-button" type="button">Mulai Sekarang</button>
        </section>
      </main>
    </div>
  );
}

export default App;
