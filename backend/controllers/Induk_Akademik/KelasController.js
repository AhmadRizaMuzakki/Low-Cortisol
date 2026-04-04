const KelasModal = require('../../models/induk_akademik/KelasModal');

class KelasController {
    index(req, res) {
        KelasModal.getAllKelas((err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Kelas berhasil diambil', data: results });
            }
        });
    }
    store(req, res) {
        const { nama_kelas, tahun_ajaran, id_guru_kelas } = req.body;
        const kelas = { nama_kelas, tahun_ajaran, id_guru_kelas };
        KelasModal.createKelas(kelas, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Kelas berhasil ditambahkan', data: results });
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const { nama_kelas, tahun_ajaran, id_guru_kelas } = req.body;
        const kelas = { id, nama_kelas, tahun_ajaran, id_guru_kelas };
        KelasModal.updateKelas(id, kelas, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Kelas berhasil diubah', data: results });
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        KelasModal.deleteKelas(id, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Kelas berhasil dihapus', data: results });
            }
        });
    }
}
module.exports = new KelasController();