import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import DashboardAdmin from '../pages/DashboardAdmin.jsx'
import Guru from '../pages/Induk_Akademik/Guru.jsx'
import Siswa from '../pages/Induk_Akademik/Siswa.jsx'
import Mapel from '../pages/Induk_Akademik/Mapel.jsx'
import Kelas from '../pages/Induk_Akademik/Kelas.jsx'
import DashboardSiswa from '../pages/DashboardSiswa.jsx'
import EditSiswa from '../pages/Induk_Akademik/SiswaResource/EditSiswa.jsx'
import TambahSiswa from '../pages/Induk_Akademik/SiswaResource/TambahSiswa.jsx'
import EditGuru from '../pages/Induk_Akademik/GuruResource/EditGuru.jsx'
import TambahGuru from '../pages/Induk_Akademik/GuruResource/TambahGuru.jsx'
import PengumumanPage from '../pages/Pengumuman/PengumumanPage.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/Induk_Akademik/Siswa" element={<Siswa />} />
        <Route path="/Induk_Akademik/Guru" element={<Guru />} />
        <Route path="/Induk_Akademik/GuruResource/TambahGuru" element={<TambahGuru />} />
        <Route path="/Induk_Akademik/GuruResource/EditGuru/:id" element={<EditGuru />} />
        <Route path="/Induk_Akademik/SiswaResource/EditSiswa/:id" element={<EditSiswa />} />
        <Route path="/Induk_Akademik/SiswaResource/TambahSiswa" element={<TambahSiswa />} />
        <Route path="/Induk_Akademik/Mapel" element={<Mapel />} />
        <Route path="/Induk_Akademik/Kelas" element={<Kelas />} />
        <Route path="/Pengumuman" element={<PengumumanPage />} />
        <Route path="/dashboard-siswa" element={<DashboardSiswa />} />
      </Routes>
    </BrowserRouter>
  )
}
