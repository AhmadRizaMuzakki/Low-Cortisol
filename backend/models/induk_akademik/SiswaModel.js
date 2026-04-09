const db = require('../../config/database');

class SiswaModel {
    static getAllSiswa(callback){
        db.query('SELECT * FROM siswa', (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getSiswaById(id, callback){
        db.query('SELECT * FROM siswa WHERE id_siswa = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static createSiswa(siswa, callback){
        db.query('INSERT INTO siswa (nisn, nama_siswa, tanggal_lahir, jenis_kelamin, alamat, id_kelas, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [siswa.nisn, siswa.nama_siswa, siswa.tanggal_lahir, siswa.jenis_kelamin, siswa.alamat, siswa.id_kelas, siswa.user_id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static updateSiswa(id, siswa, callback){
        db.query('UPDATE siswa SET nisn = ?, nama_siswa = ?, tanggal_lahir = ?, jenis_kelamin = ?, alamat = ?, id_kelas = ?, user_id = ? WHERE id_siswa = ?', [siswa.nisn, siswa.nama_siswa, siswa.tanggal_lahir, siswa.jenis_kelamin, siswa.alamat, siswa.id_kelas, siswa.user_id, id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static deleteSiswa(id, callback){
        db.query('DELETE FROM siswa WHERE id_siswa = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
}

module.exports = SiswaModel;