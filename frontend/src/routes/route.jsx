import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import DashboardAdmin from '../pages/DashboardAdmin.jsx'
import GuruAdmin from '../pages/AdminDashboard/Induk_Akademik/Guru.jsx'
import SiswaAdmin from '../pages/AdminDashboard/Induk_Akademik/Siswa.jsx'
import MapelAdmin from '../pages/AdminDashboard/Induk_Akademik/Mapel.jsx'
import KelasAdmin from '../pages/AdminDashboard/Induk_Akademik/Kelas.jsx'
import DashboardSiswa from '../pages/DashboardSiswa.jsx'
import EditSiswa from '../pages/AdminDashboard/Induk_Akademik/SiswaResource/EditSiswa.jsx'
import TambahSiswa from '../pages/AdminDashboard/Induk_Akademik/SiswaResource/TambahSiswa.jsx'
import EditGuru from '../pages/AdminDashboard/Induk_Akademik/GuruResource/EditGuru.jsx'
import TambahGuru from '../pages/AdminDashboard/Induk_Akademik/GuruResource/TambahGuru.jsx'
import TambahMapel from '../pages/AdminDashboard/Induk_Akademik/MapelResource/TambahMapel.jsx'
import EditMapel from '../pages/AdminDashboard/Induk_Akademik/MapelResource/EditMapel.jsx'
import TambahKelas from '../pages/AdminDashboard/Induk_Akademik/KelasResource/TambahKelas.jsx'
import EditKelas from '../pages/AdminDashboard/Induk_Akademik/KelasResource/EditKelas.jsx'
import PengumumanPage from '../pages/AdminDashboard/pengumuman/PengumumanPage.jsx'
import BiodataSiswa from '../pages/SiswaDashboard/Biodata/Biodata.jsx'
import EditBiodata from '../pages/SiswaDashboard/Biodata/BiodataResource/EditBiodata.jsx'
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/Induk_Akademik/Siswa" element={<SiswaAdmin />} />
        <Route path="/Induk_Akademik/Guru" element={<GuruAdmin />} />
        <Route path="/Induk_Akademik/GuruResource/TambahGuru" element={<TambahGuru />} />
        <Route path="/Induk_Akademik/GuruResource/EditGuru/:id" element={<EditGuru />} />
        <Route path="/Induk_Akademik/SiswaResource/EditSiswa/:id" element={<EditSiswa />} />
        <Route path="/Induk_Akademik/SiswaResource/TambahSiswa" element={<TambahSiswa />} />
        <Route path="/Induk_Akademik/Mapel" element={<MapelAdmin />} />
        <Route path="/Induk_Akademik/MapelResource/TambahMapel" element={<TambahMapel />} />
        <Route path="/Induk_Akademik/MapelResource/EditMapel/:id" element={<EditMapel />} />
        <Route path="/Induk_Akademik/Kelas" element={<KelasAdmin />} />
        <Route path="/Induk_Akademik/KelasResource/TambahKelas" element={<TambahKelas />} />
        <Route path="/Induk_Akademik/KelasResource/EditKelas/:id" element={<EditKelas />} />
        <Route path="/Pengumuman" element={<PengumumanPage />} />
        <Route path="/dashboard-siswa" element={<DashboardSiswa />} />
        <Route path="/dashboard-siswa/biodata" element={<BiodataSiswa />} />
        <Route path="/dashboard-siswa/biodata/EditBiodata/:id" element={<EditBiodata />} />
        
      </Routes>
    </BrowserRouter>
  )
}
