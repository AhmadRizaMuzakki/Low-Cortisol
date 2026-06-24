import { useState, useEffect, useCallback } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext.jsx'

import Navbar from '../../layouts/Navbar'

import Header from '../../layouts/header'

import PresensiComponent from '../../components/Presensi/PresensiComponent.jsx'

import {

  getPresensiSiswa,

  getPresensiHariIniSiswa,

  submitPresensiSiswa,

} from '../../utils/SiswaDashboard/PresensiUtils.jsx'



export default function PresensiSiswa() {

  const { isAuthenticated } = useAuth()

  const [presensi, setPresensi] = useState([])

  const [jadwalHariIni, setJadwalHariIni] = useState(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [loading, setLoading] = useState(true)

  const [loadingHariIni, setLoadingHariIni] = useState(true)

  const [error, setError] = useState(null)

  const [errorHariIni, setErrorHariIni] = useState(null)

  const [submittingId, setSubmittingId] = useState(null)

  const [submitError, setSubmitError] = useState(null)



  const fetchPresensi = useCallback(async () => {

    try {

      const response = await getPresensiSiswa()

      setPresensi(response.data?.data ?? [])

      setError(null)

    } catch (err) {

      console.error('Error fetching presensi:', err)

      const message = err.response?.data?.message

      setError(message || 'Gagal memuat data presensi.')

    } finally {

      setLoading(false)

    }

  }, [])



  const fetchJadwalHariIni = useCallback(async () => {

    try {

      const response = await getPresensiHariIniSiswa()

      setJadwalHariIni(response.data?.data ?? null)

      setErrorHariIni(null)

    } catch (err) {

      console.error('Error fetching jadwal hari ini:', err)

      const message = err.response?.data?.message

      setErrorHariIni(message || 'Gagal memuat jadwal hari ini.')

    } finally {

      setLoadingHariIni(false)

    }

  }, [])



  useEffect(() => {

    fetchPresensi()

    fetchJadwalHariIni()

  }, [fetchPresensi, fetchJadwalHariIni])



  async function handleSubmitPresensi(idJadwal, status) {

    setSubmittingId(idJadwal)

    setSubmitError(null)



    try {

      await submitPresensiSiswa({ id_jadwal: idJadwal, status })

      await Promise.all([fetchPresensi(), fetchJadwalHariIni()])

    } catch (err) {

      console.error('Error submitting presensi:', err)

      const message = err.response?.data?.message

      setSubmitError(message || 'Gagal menyimpan presensi.')

    } finally {

      setSubmittingId(null)

    }

  }



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

            <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">

              Presensi Siswa

            </h1>

            <PresensiComponent

              presensi={presensi}

              jadwalHariIni={jadwalHariIni}

              loading={loading}

              loadingHariIni={loadingHariIni}

              error={error}

              errorHariIni={errorHariIni}

              submittingId={submittingId}

              submitError={submitError}

              onSubmitPresensi={handleSubmitPresensi}

            />

          </div>

        </main>

      </div>

    </div>

  )

}

