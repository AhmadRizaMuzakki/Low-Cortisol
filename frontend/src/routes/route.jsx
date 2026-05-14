import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import DashboardAdmin from '../pages/DashboardAdmin.jsx'
import Guru from '../pages/Induk_Akademik/Guru.jsx'
import Siswa from '../pages/Induk_Akademik/Siswa.jsx'
import Mapel from '../pages/Induk_Akademik/Mapel.jsx'
import Kelas from '../pages/Induk_Akademik/Kelas.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/Induk_Akademik/Siswa" element={<Siswa />} />
        <Route path="/Induk_Akademik/Guru" element={<Guru />} />
        <Route path="/Induk_Akademik/Mapel" element={<Mapel />} />
        <Route path="/Induk_Akademik/Kelas" element={<Kelas />} />
      </Routes>
    </BrowserRouter>
  )
}
