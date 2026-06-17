const db = require('../../config/database');
const PenjadwalanModel = require('../Jadwal/JadwalModel');

class SiswaModel {
    static getAllSiswa(callback){
        db.query(
            `SELECT siswa.*, kelas.nama_kelas
             FROM siswa
             LEFT JOIN kelas ON siswa.id_kelas = kelas.id_kelas`,
            (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getSiswaById(id, callback){
        db.query(
            `SELECT siswa.*, kelas.nama_kelas
             FROM siswa
             LEFT JOIN kelas ON siswa.id_kelas = kelas.id_kelas
             WHERE siswa.id_siswa = ?`,
            [id],
            (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getSiswaByUserId(userId, callback){
        db.query(
            `SELECT siswa.*, kelas.nama_kelas
             FROM siswa
             LEFT JOIN kelas ON siswa.id_kelas = kelas.id_kelas
             WHERE siswa.user_id = ?`,
            [userId],
            (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getKelasDetailByUserId(userId, callback) {
        db.query(
            `SELECT
                k.id_kelas,
                k.nama_kelas,
                k.tahun_ajaran,
                COALESCE(g_by_id.nama_guru, g_by_user.nama_guru) AS nama_guru_wali
             FROM siswa s
             LEFT JOIN kelas k ON s.id_kelas = k.id_kelas
             LEFT JOIN guru g_by_id ON k.id_guru_wali = g_by_id.id_guru
             LEFT JOIN guru g_by_user ON k.id_guru_wali = g_by_user.user_id
             WHERE s.user_id = ?`,
            [userId],
            (err, kelasResults) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                if (!kelasResults?.length || !kelasResults[0].id_kelas) {
                    callback(null, {
                        nama_kelas: null,
                        tahun_ajaran: null,
                        nama_guru_wali: null,
                        jadwal_pelajaran: [],
                    });
                    return;
                }

                const kelas = kelasResults[0];
                PenjadwalanModel.getJadwalDetailByKelasId(kelas.id_kelas, (jadwalErr, jadwalResults) => {
                    if (jadwalErr) {
                        callback(jadwalErr, null);
                        return;
                    }

                    callback(null, {
                        nama_kelas: kelas.nama_kelas,
                        tahun_ajaran: kelas.tahun_ajaran,
                        nama_guru_wali: kelas.nama_guru_wali,
                        jadwal_pelajaran: jadwalResults || [],
                    });
                });
            }
        );
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