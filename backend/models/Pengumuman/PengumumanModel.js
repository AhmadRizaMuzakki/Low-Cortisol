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
<<<<<<< HEAD
        db.query('SELECT * FROM pengumuman WHERE id = ?', [id], (err, results) => {
=======
        db.query('SELECT * FROM pengumuman WHERE id_pengumuman = ?', [id], (err, results) => {
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menambahkan pengumuman baru
    static createPengumuman(pengumuman, callback) {
<<<<<<< HEAD
        const query = 'INSERT INTO pengumuman (judul, deskripsi, tanggal, id_users) VALUES (?, ?, ?, ?)';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.id_users];
=======
        const query = 'INSERT INTO pengumuman (judul, deskripsi, tanggal, penulis_id) VALUES (?, ?, ?, ?)';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.penulis_id];
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
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
<<<<<<< HEAD
        const query = 'UPDATE pengumuman SET judul = ?, deskripsi = ?, tanggal = ?, id_users = ? WHERE id = ?';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.id_users, id];
=======
        const query = 'UPDATE pengumuman SET judul = ?, deskripsi = ?, tanggal = ?, penulis_id = ? WHERE id_pengumuman = ?';
        const values = [pengumuman.judul, pengumuman.deskripsi, pengumuman.tanggal, pengumuman.penulis_id, id];
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
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
<<<<<<< HEAD
        db.query('DELETE FROM pengumuman WHERE id = ?', [id], (err, results) => {
=======
        db.query('DELETE FROM pengumuman WHERE id_pengumuman = ?', [id], (err, results) => {
>>>>>>> e304616d2c3c683b8c03cc4987054871de4439c8
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = PengumumanModel;