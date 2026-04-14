const PenjadwalanModel = require('../../models/Jadwal/JadwalModel');

class PenjadwalanController {
    
    // Mengambil semua data jadwal
    index(req, res) {
        PenjadwalanModel.getAllJadwal((err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Jadwal berhasil diambil', data: results });
            }
        });
    }

    // Menambahkan jadwal baru
    store(req, res) {
        const { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai } = req.body;
        const jadwal = { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai };
        
        PenjadwalanModel.createJadwal(jadwal, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Jadwal berhasil ditambahkan', data: results });
            }
        });
    }

    // Memperbarui data jadwal
    update(req, res) {
        const { id } = req.params;
        const { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai } = req.body;
        const jadwal = { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai };
        
        PenjadwalanModel.updateJadwal(id, jadwal, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Jadwal berhasil diubah', data: results });
            }
        });
    }

    // Menghapus data jadwal
    destroy(req, res) {
        const { id } = req.params;
        
        PenjadwalanModel.deleteJadwal(id, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Jadwal berhasil dihapus', data: results });
            }
        });
    }
}

module.exports = new PenjadwalanController();