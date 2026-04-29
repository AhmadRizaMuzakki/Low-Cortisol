-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 16, 2026 at 08:33 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_sekolah`
--

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id_guru` bigint NOT NULL,
  `nip` varchar(50) NOT NULL,
  `nama_guru` varchar(100) NOT NULL,
  `jenis_kelamin` enum('L','P') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id_guru`, `nip`, `nama_guru`, `jenis_kelamin`, `no_hp`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '198001', 'Drs. Ahmad Subarjo', 'L', '08123456701', 2, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, '198002', 'Siti Aminah, S.Pd', 'P', '08123456702', 3, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, '198003', 'Budi Santoso, M.Si', 'L', '08123456703', 4, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, '198004', 'Rina Melati, S.Pd', 'P', '08123456704', 5, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, '198005', 'Eko Prasetyo, S.T', 'L', '08123456705', 6, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, '198006', 'Dewi Lestari, M.Pd', 'P', '08123456706', 7, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, '198007', 'Farhan Malik, S.Kom', 'L', '08123456707', 8, '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_pelajaran`
--

CREATE TABLE `jadwal_pelajaran` (
  `id_jadwal` bigint NOT NULL,
  `id_kelas` bigint NOT NULL,
  `id_mapel` bigint NOT NULL,
  `id_guru` bigint NOT NULL,
  `hari` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu') NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal_pelajaran`
--

INSERT INTO `jadwal_pelajaran` (`id_jadwal`, `id_kelas`, `id_mapel`, `id_guru`, `hari`, `jam_mulai`, `jam_selesai`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Senin', '07:30:00', '09:00:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, 1, 2, 2, 'Senin', '09:15:00', '10:45:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 2, 3, 3, 'Selasa', '07:30:00', '09:00:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 2, 4, 1, 'Selasa', '09:15:00', '10:45:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 3, 5, 2, 'Rabu', '08:00:00', '10:00:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 1, 6, 3, 'Kamis', '07:30:00', '09:00:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 2, 7, 4, 'Jumat', '07:30:00', '09:00:00', '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` bigint NOT NULL,
  `nama_kelas` varchar(50) NOT NULL,
  `tahun_ajaran` varchar(20) NOT NULL,
  `id_guru_wali` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`, `tahun_ajaran`, `id_guru_wali`, `created_at`, `updated_at`) VALUES
(1, 'X-IPA-1', '2023/2024', 1, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, 'X-IPA-2', '2023/2024', 2, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 'X-IPS-1', '2023/2024', 3, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 'XI-IPA-1', '2024/2025', 4, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 'XI-IPA-2', '2024/2025', 5, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 'XII-IPA-1', '2024/2025', 6, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 'XII-IPS-1', '2024/2025', 7, '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id_mapel` bigint NOT NULL,
  `nama_mapel` varchar(100) NOT NULL,
  `kkm` int NOT NULL COMMENT '0 - 100',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id_mapel`, `nama_mapel`, `kkm`, `created_at`, `updated_at`) VALUES
(1, 'Matematika', 75, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, 'Bahasa Indonesia', 70, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 'Bahasa Inggris', 70, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 'IPA Fisika', 75, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 'IPA Biologi', 75, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 'IPS Sejarah', 70, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 'PJOK', 80, '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `id_nilai` bigint NOT NULL,
  `id_siswa` bigint NOT NULL,
  `id_jadwal` bigint NOT NULL,
  `semester` varchar(10) NOT NULL COMMENT '1 | 2',
  `nilai_tugas` int DEFAULT NULL COMMENT '0 - 100',
  `nilai_uts` int DEFAULT NULL COMMENT '0 - 100',
  `nilai_uas` int DEFAULT NULL COMMENT '0 - 100',
  `catatan_karakter` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nilai`
--

INSERT INTO `nilai` (`id_nilai`, `id_siswa`, `id_jadwal`, `semester`, `nilai_tugas`, `nilai_uts`, `nilai_uas`, `catatan_karakter`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Ganjil', 85, 80, 90, 'Sangat aktif dalam diskusi kelompok.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, 2, 1, 'Ganjil', 78, 85, 82, 'Mampu memahami materi dengan baik.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 3, 3, 'Ganjil', 90, 88, 85, 'Disiplin dan selalu tepat waktu.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 4, 3, 'Ganjil', 70, 75, 80, 'Perlu ditingkatkan lagi belajarnya.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 5, 5, 'Ganjil', 82, 80, 84, 'Sangat sopan dan rajin menolong.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 6, 5, 'Ganjil', 88, 90, 87, 'Memiliki jiwa kepemimpinan.', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 7, 1, 'Ganjil', 65, 60, 70, 'Kurangi absensi tanpa keterangan.', '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `presensi`
--

CREATE TABLE `presensi` (
  `id_presensi` bigint NOT NULL,
  `id_siswa` bigint NOT NULL,
  `id_jadwal` bigint NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('hadir','izin','sakit','alpha') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `presensi`
--

INSERT INTO `presensi` (`id_presensi`, `id_siswa`, `id_jadwal`, `tanggal`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-05-20', 'hadir', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, 2, 1, '2024-05-20', 'hadir', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 3, 3, '2024-05-21', 'sakit', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 4, 3, '2024-05-21', 'hadir', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 5, 5, '2024-05-22', 'izin', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 6, 5, '2024-05-22', 'hadir', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 7, 1, '2024-05-20', 'alpha', '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` bigint NOT NULL,
  `nisn` varchar(20) NOT NULL,
  `nama_siswa` varchar(100) NOT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('L','P') NOT NULL,
  `alamat` text,
  `id_kelas` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `nisn`, `nama_siswa`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `id_kelas`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '00112233', 'Budi Doremi', '2008-01-10', 'L', 'Jl. Merdeka No. 1', 1, 9, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(2, '00112244', 'Ani Batari', '2008-05-15', 'P', 'Jl. Mawar No. 12', 1, 10, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, '00112255', 'Cici Paramida', '2008-11-20', 'P', 'Jl. Kenanga No. 5', 2, 11, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, '00112266', 'Dedi Cahyadi', '2007-03-12', 'L', 'Jl. Melati No. 8', 2, 12, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, '00112277', 'Eka Putra', '2007-07-25', 'L', 'Jl. Dahlia No. 2', 3, 13, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, '00112288', 'Fanya Gita', '2009-02-14', 'P', 'Jl. Anggrek No. 10', 3, 14, '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, '00112299', 'Gilang Ramadhan', '2008-09-30', 'L', 'Jl. Kamboja No. 3', 1, 15, '2026-04-14 15:23:53', '2026-04-14 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','guru','siswa','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'root', 'admin', '2026-04-16 08:33:06', '2026-04-16 08:33:06'),
(2, 'guru_ahmad', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(3, 'guru_siti', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(4, 'guru_budi', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(5, 'guru_rina', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(6, 'guru_eko', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(7, 'guru_dewi', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(8, 'guru_farhan', 'pass123', 'guru', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(9, 'siswa_budi', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(10, 'siswa_ani', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(11, 'siswa_cici', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(12, 'siswa_dedi', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(13, 'siswa_eka', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(14, 'siswa_fanya', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53'),
(15, 'siswa_gilang', 'pass123', 'siswa', '2026-04-14 15:23:53', '2026-04-14 15:23:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id_guru`),
  ADD UNIQUE KEY `nip` (`nip`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `jadwal_pelajaran`
--
ALTER TABLE `jadwal_pelajaran`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD UNIQUE KEY `unique_jadwal` (`id_kelas`,`hari`,`jam_mulai`),
  ADD KEY `id_mapel` (`id_mapel`),
  ADD KEY `id_guru` (`id_guru`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD KEY `id_guru_wali` (`id_guru_wali`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id_mapel`),
  ADD UNIQUE KEY `nama_mapel` (`nama_mapel`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id_nilai`),
  ADD UNIQUE KEY `unique_nilai` (`id_siswa`,`id_jadwal`,`semester`),
  ADD KEY `id_jadwal` (`id_jadwal`);

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD UNIQUE KEY `unique_presensi` (`id_siswa`,`id_jadwal`,`tanggal`),
  ADD KEY `id_jadwal` (`id_jadwal`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD UNIQUE KEY `nisn` (`nisn`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id_guru` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `jadwal_pelajaran`
--
ALTER TABLE `jadwal_pelajaran`
  MODIFY `id_jadwal` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id_mapel` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `id_nilai` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id_presensi` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id_siswa` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guru`
--
ALTER TABLE `guru`
  ADD CONSTRAINT `guru_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `jadwal_pelajaran`
--
ALTER TABLE `jadwal_pelajaran`
  ADD CONSTRAINT `jadwal_pelajaran_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE CASCADE,
  ADD CONSTRAINT `jadwal_pelajaran_ibfk_2` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`id_mapel`) ON DELETE CASCADE,
  ADD CONSTRAINT `jadwal_pelajaran_ibfk_3` FOREIGN KEY (`id_guru`) REFERENCES `guru` (`id_guru`) ON DELETE CASCADE;

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_guru_wali`) REFERENCES `guru` (`id_guru`) ON DELETE SET NULL;

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `nilai_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `nilai_ibfk_2` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_pelajaran` (`id_jadwal`) ON DELETE CASCADE;

--
-- Constraints for table `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `presensi_ibfk_2` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_pelajaran` (`id_jadwal`) ON DELETE CASCADE;

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE SET NULL,
  ADD CONSTRAINT `siswa_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
-- --------------------------------------------------------

--
-- Table structure for table `pengumuman`
--

<<<<<<< HEAD
CREATE TABLE `pengumuman` (
=======
CREATE TABLE pengumuman (
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    tanggal DATE NOT NULL,
<<<<<<< HEAD
    id_users BIGINT NOT NULL,
=======
    penulis_id INT NOT NULL,
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- Dumping data for table `pengumuman`
--

<<<<<<< HEAD
INSERT INTO `pengumuman` (`judul`, `deskripsi`, `tanggal`, `id_users`) VALUES
=======
INSERT INTO pengumuman (judul, deskripsi, tanggal, penulis_id) VALUES
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
('Pengumuman Pelaksanaan Ujian Sekolah', 'Ujian Sekolah (US) akan dilaksanakan pada tanggal 15-20 Mei 2026. Harap seluruh siswa mempersiapkan diri dengan baik.', '2026-04-20', 1),
('Libur Hari Raya Idul Fitri', 'Sehubungan dengan Hari Raya Idul Fitri, kegiatan belajar mengajar diliburkan mulai tanggal 25 April hingga 5 Mei 2026.', '2026-04-22', 1),
('Pendaftaran Ulang Siswa Lama', 'Diberitahukan kepada seluruh siswa kelas X dan XI untuk melakukan daftar ulang pada minggu pertama bulan Juli 2026.', '2026-04-25', 1);

<<<<<<< HEAD
ALTER TABLE `pengumuman`
  ADD KEY `id_users` (`id_users`),
  ADD CONSTRAINT `pengumuman_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE CASCADE;

=======
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
