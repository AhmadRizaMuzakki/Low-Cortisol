import Navbar from '../../layouts/Navbar'
import Header from '../../layouts/header'

export default function Siswa() {
  return (
    <div className="flex h-screen min-h-0 bg-app-secondary text-app-navy">
      <Navbar />
      <Header />
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:py-8">
          <h1 className="text-xl font-bold tracking-tight text-app-navy sm:text-2xl">Data Siswa</h1>
        </div>
      </main>
    </div>
  )
}   