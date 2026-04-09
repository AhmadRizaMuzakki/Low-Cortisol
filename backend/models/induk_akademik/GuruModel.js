const db = require('../../config/database');

class GuruModel {
    static getAllGurus(callback){
        db.query('SELECT * FROM guru', (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getGuruById(id, callback){
        db.query('SELECT * FROM guru WHERE id_guru = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static createGuru(guru, callback){
        db.query('INSERT INTO guru (nip, nama_guru, jenis_kelamin, no_hp, user_id) VALUES (?, ?, ?, ?, ?)', [guru.nip, guru.nama_guru, guru.jenis_kelamin, guru.no_hp, guru.user_id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static updateGuru(id, guru, callback){
        db.query('UPDATE guru SET nip = ?, nama_guru = ?, jenis_kelamin = ?, no_hp = ?, user_id = ? WHERE id_guru = ?', [guru.nip, guru.nama_guru, guru.jenis_kelamin, guru.no_hp, guru.user_id, id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static deleteGuru(id, callback){
        db.query('DELETE FROM guru WHERE id_guru = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
}

module.exports = GuruModel;