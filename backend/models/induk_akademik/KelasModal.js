const db = require('../../config/database');

class KelasModel {
    static getAllKelas(callback){
        db.query(
            `SELECT 
                k.*,
                COALESCE(g_by_id.nama_guru, g_by_user.nama_guru) AS nama_guru
             FROM kelas k
             LEFT JOIN guru g_by_id ON k.id_guru_wali = g_by_id.id_guru
             LEFT JOIN guru g_by_user ON k.id_guru_wali = g_by_user.user_id`,
            (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getKelasById(id, callback){
        db.query(
            `SELECT 
                k.*,
                COALESCE(g_by_id.nama_guru, g_by_user.nama_guru) AS nama_guru
             FROM kelas k
             LEFT JOIN guru g_by_id ON k.id_guru_wali = g_by_id.id_guru
             LEFT JOIN guru g_by_user ON k.id_guru_wali = g_by_user.user_id
             WHERE k.id_kelas = ?`,
            [id],
            (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static createKelas(kelas, callback){
        db.query('INSERT INTO kelas (nama_kelas, tahun_ajaran, id_guru_wali) VALUES (?, ?, ?)', [kelas.nama_kelas, kelas.tahun_ajaran, kelas.id_guru_wali], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static updateKelas(id, kelas, callback){
            db.query('UPDATE kelas SET nama_kelas = ?, tahun_ajaran = ?, id_guru_wali = ? WHERE id_kelas = ?', [kelas.nama_kelas, kelas.tahun_ajaran, kelas.id_guru_wali, id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static deleteKelas(id, callback){
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