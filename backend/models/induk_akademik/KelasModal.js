const db = require('../../config/database');

class KelasModel {
    static getAllKelas(callback){
        db.query('SELECT * FROM kelas', (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getKelasById(id, callback){
        db.query('SELECT * FROM kelas WHERE id_kelas = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    createKelas(kelas, callback){
        db.query('INSERT INTO kelas (nama_kelas, tahun_ajaran, id_guru_wali) VALUES (?, ?, ?)', [kelas.nama_kelas, kelas.tahun_ajaran, kelas.id_guru_wali], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    updateKelas(id, kelas, callback){
            db.query('UPDATE kelas SET nama_kelas = ?, tahun_ajaran = ?, id_guru_wali = ? WHERE id_kelas = ?', [kelas.nama_kelas, kelas.tahun_ajaran, kelas.id_guru_wali, id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    deleteKelas(id, callback){
        db.query('DELETE FROM kelas WHERE id_kelas = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
}   

module.exports = KelasModel;