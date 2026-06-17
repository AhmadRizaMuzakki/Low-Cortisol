const db = require('../../config/database');

class KehadiranModel {
    static getAllKehadiran(callback) {
        db.query('SELECT * FROM presensi', (err, results) => {
            if (err) {
                callback (err, null);
            } else {
                callback (null, results);
            }
        });
    }
    static getKehadiranById(id, callback) {
        db.query('SELECT * FROM presensi WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback (err, null);
            } else {
                callback (null, results[0]);
            }
        });
    }
    static createKehadiran(kehadiran, callback) {
        db.query('INSERT INTO presensi (id_siswa, id_jadwal, tanggal, status) VALUES (?, ?, ?, ?)', 
            [kehadiran.id_siswa, kehadiran.id_jadwal, kehadiran.tanggal, kehadiran.status], 
            (err, results) => {
            if (err) {
                callback (err, null);
            } else {
                callback (null, results);
            }
        });
    }
    static updateKehadiran(id, kehadiran, callback) {
        db.query('UPDATE presensi SET id_siswa = ?, id_jadwal = ?, tanggal = ?, status = ? WHERE id_presensi = ?', 
            [kehadiran.id_siswa, kehadiran.id_jadwal, kehadiran.tanggal, kehadiran.status, id], 
            (err, results) => {
            if (err) {
                callback (err, null);
            } else {
                callback (null, results);
            }
        });
    }
    static deleteKehadiran(id, callback) {
        db.query('DELETE FROM presensi WHERE id_presensi = ?', [id], (err, results) => {
            if (err) {
                callback (err, null);
            } else {
                callback (null, results);
            }
        });
    }

    static getPresensiByUserId(userId, callback) {
        db.query(
            `SELECT
                p.id_presensi,
                p.tanggal,
                p.status,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai,
                m.nama_mapel,
                g.nama_guru
             FROM presensi p
             INNER JOIN siswa s ON p.id_siswa = s.id_siswa
             INNER JOIN jadwal_pelajaran jp ON p.id_jadwal = jp.id_jadwal
             INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
             INNER JOIN guru g ON jp.id_guru = g.id_guru
             WHERE s.user_id = ?
             ORDER BY p.tanggal DESC, jp.jam_mulai`,
            [userId],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results || []);
                }
            }
        );
    }

    static getJadwalHariIniByUserId(userId, hari, tanggal, callback) {
        db.query(
            `SELECT
                jp.id_jadwal,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai,
                m.nama_mapel,
                g.nama_guru,
                p.id_presensi,
                p.status AS status_presensi
             FROM siswa s
             INNER JOIN jadwal_pelajaran jp ON jp.id_kelas = s.id_kelas
             INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
             INNER JOIN guru g ON jp.id_guru = g.id_guru
             LEFT JOIN presensi p ON p.id_jadwal = jp.id_jadwal
                AND p.id_siswa = s.id_siswa
                AND p.tanggal = ?
             WHERE s.user_id = ? AND jp.hari = ?
             ORDER BY jp.jam_mulai`,
            [tanggal, userId, hari],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results || []);
                }
            }
        );
    }

    static getPresensiBySiswaJadwalTanggal(idSiswa, idJadwal, tanggal, callback) {
        db.query(
            `SELECT id_presensi, status FROM presensi
             WHERE id_siswa = ? AND id_jadwal = ? AND tanggal = ?`,
            [idSiswa, idJadwal, tanggal],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results?.[0] || null);
                }
            }
        );
    }
}
module.exports = KehadiranModel;