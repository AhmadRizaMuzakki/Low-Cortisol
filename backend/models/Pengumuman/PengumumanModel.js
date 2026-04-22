const db = require('../../config/database');

class PengumumanModel {
    // Mengambil semua data pengumuman
    static getAllPengumuman(callback) {
        db.query('SELECT * FROM pengumuman', (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mengambil data pengumuman berdasarkan ID
    static getPengumumanById(id, callback) {
        db.query('SELECT * FROM pengumuman WHERE id_pengumuman = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menambahkan pengumuman baru
    static createPengumuman(pengumuman, callback) {
        const query = 'INSERT INTO pengumuman (judul, deskripsi, tanggal, penulis_id) VALUES (?, ?, ?, ?)';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.penulis_id];
        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);    
            } else {
                callback(null, results);
            }   
        });
    }

    // Memperbarui data pengumuman berdasarkan ID
    static updatePengumuman(id, pengumuman, callback) {
        const query = 'UPDATE pengumuman SET judul = ?, deskripsi = ?, tanggal = ?, penulis_id = ? WHERE id_pengumuman = ?';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.penulis_id, id];
        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menghapus data pengumuman berdasarkan ID
    static deletePengumuman(id, callback) {
        db.query('DELETE FROM pengumuman WHERE id_pengumuman = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = PengumumanModel;