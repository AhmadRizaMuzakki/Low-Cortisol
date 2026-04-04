const GuruModel = require('../../models/induk_akademik/GuruModel');

class GuruController {
    index(req, res) {
        GuruModel.getAllGuru((err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Guru berhasil diambil', data: results });
            }
        });
    }
    store(req, res) {
        const { nip, nama_guru,jenis_kelamin, no_hp, user_id } = req.body;
        const guru = { nip, nama_guru, jenis_kelamin, no_hp, user_id };
        GuruModel.createGuru(guru, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Guru berhasil ditambahkan', data: results });
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const { nip, nama_guru, jenis_kelamin, no_hp, user_id } = req.body;
        const guru = { id, nip, nama_guru, jenis_kelamin, no_hp, user_id };
        GuruModel.updateGuru(id, guru, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Guru berhasil diubah', data: results });
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        GuruModel.deleteGuru(id, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Guru berhasil dihapus', data: results });
            }
        });
    }
}
module.exports = new GuruController();