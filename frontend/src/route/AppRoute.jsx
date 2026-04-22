import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SiswaPage from "../pages/dashboard/induk-akademik/SiswaPage";
import GuruPage from "../pages/dashboard/induk-akademik/GuruPage";
import KelasPage from "../pages/dashboard/induk-akademik/KelasPage";
import MataPelajaranPage from "../pages/dashboard/induk-akademik/MataPelajaranPage";
import TahunAjaranPage from "../pages/dashboard/induk-akademik/TahunAjaranPage";
import PresensiPage from "../pages/dashboard/presensi/PresensiPage";
import PresensiRekapPage from "../pages/dashboard/presensi/PresensiRekapPage";
import NilaiPage from "../pages/dashboard/e-raport/NilaiPage";
import RaportPage from "../pages/dashboard/e-raport/RaportPage";
import JadwalPage from "../pages/dashboard/jadwal/JadwalPage";
import LaporanNilaiPage from "../pages/dashboard/laporan/LaporanNilaiPage";
import LaporanSiswaPage from "../pages/dashboard/laporan/LaporanSiswaPage";

function DashboardLayoutWrapper() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
          <Route index element={<DashboardPage />} />
          <Route path="induk-akademik/siswa" element={<SiswaPage />} />
          <Route path="induk-akademik/guru" element={<GuruPage />} />
          <Route path="induk-akademik/kelas" element={<KelasPage />} />
          <Route
            path="induk-akademik/mata-pelajaran"
            element={<MataPelajaranPage />}
          />
          <Route path="induk-akademik/tahun-ajaran" element={<TahunAjaranPage />} />
          <Route path="presensi" element={<PresensiPage />} />
          <Route path="presensi/rekap" element={<PresensiRekapPage />} />
          <Route path="e-raport/nilai" element={<NilaiPage />} />
          <Route path="e-raport/raport" element={<RaportPage />} />
          <Route path="jadwal" element={<JadwalPage />} />
          <Route path="laporan/nilai" element={<LaporanNilaiPage />} />
          <Route path="laporan/siswa" element={<LaporanSiswaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
