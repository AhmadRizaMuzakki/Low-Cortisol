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
}
module.exports = KehadiranModel;