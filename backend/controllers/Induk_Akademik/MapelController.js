const MapelModel = require('../../models/induk_akademik/MapelModel');

class MapelController {
    index(req, res) {
        MapelModel.getAllMapel((err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Mapel berhasil diambil', data: results });
            }
        });
    }
    store(req, res) {
        const { nama_mapel, kkm } = req.body;
        const mapel = { nama_mapel, kkm };
        MapelModel.createMapel(mapel, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Mapel berhasil ditambahkan', data: results });
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const { nama_mapel, kkm } = req.body;
        const mapel = { id, nama_mapel, kkm };
        MapelModel.updateMapel(id, mapel, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Mapel berhasil diubah', data: results });
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        MapelModel.deleteMapel(id, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Mapel berhasil dihapus', data: results });
            }
        });
    }
}
module.exports = new MapelController();