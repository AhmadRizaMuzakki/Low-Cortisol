const db = require('../../config/database');

class MapelModel {
    static getAllMapels(callback){
        db.query('SELECT * FROM mapel', (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static getMapelById(id, callback){
        db.query('SELECT * FROM mapel WHERE id_mapel = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static createMapel(mapel, callback){
        db.query('INSERT INTO mapel (nama_mapel, kkm) VALUES (?, ?)', [mapel.nama_mapel, mapel.kkm], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static updateMapel(id, mapel, callback){
        db.query('UPDATE mapel SET nama_mapel = ?, kkm = ? WHERE id_mapel = ?', [mapel.nama_mapel, mapel.kkm, id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
    static deleteMapel(id, callback){
        db.query('DELETE FROM mapel WHERE id_mapel = ?', [id], (err, results) => {
            if(err){
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
}

module.exports = MapelModel;