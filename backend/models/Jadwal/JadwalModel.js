    const db = require('../../config/database');

class PenjadwalanModel {
    
    // Mengambil semua data jadwal
    static getAllJadwal(callback) {
        db.query('SELECT * FROM jadwal_pelajaran', (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mengambil data jadwal berdasarkan ID
    static getJadwalById(id, callback) {
        db.query('SELECT * FROM jadwal_pelajaran WHERE id_jadwal = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menambahkan jadwal baru
    // Catatan: id_jadwal biasanya Auto Increment, jadi tidak dimasukkan di INSERT
    static createJadwal(jadwal, callback) {
        const query = 'INSERT INTO jadwal_pelajaran (id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [jadwal.id_kelas, jadwal.id_mapel, jadwal.id_guru, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai];
        
        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Memperbarui data jadwal berdasarkan ID
    static updateJadwal(id, jadwal, callback) {
        const query = 'UPDATE jadwal_pelajaran SET id_kelas = ?, id_mapel = ?, id_guru = ?, hari = ?, jam_mulai = ?, jam_selesai = ? WHERE id_jadwal = ?';
        const values = [jadwal.id_kelas, jadwal.id_mapel, jadwal.id_guru, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, id];

        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menghapus data jadwal berdasarkan ID
    static deleteJadwal(id, callback) {
        db.query('DELETE FROM jadwal_pelajaran WHERE id_jadwal = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // FITUR TAMBAHAN: Mengambil data jadwal berdasarkan Hari tertentu
    static getJadwalByHari(hari, callback) {
        db.query('SELECT * FROM jadwal_pelajaran WHERE hari = ?', [hari], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = PenjadwalanModel;