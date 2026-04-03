const SiswaModel = require('../../models/induk_akademik/SiswaModel');


class SiswaController {
    index(req, res) {
        SiswaModel.getAllSiswa((err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Siswa berhasil diambil', data: results });
            }
        });
    }
    store(req, res) {
        const { nisn, nama_siswa, tanggal_lahir, jenis_kelamin, alamat, id_kelas, user_id } = req.body;
        const siswa = { nisn, nama_siswa, tanggal_lahir, jenis_kelamin, alamat, id_kelas, user_id };
        SiswaModel.createSiswa(siswa, (err, results) => {
            if(err){
                res.status(500).json({ error: err.message });
            }else{
                res.status(200).json({ message: 'Siswa berhasil ditambahkan', data: results });
            }
        });
    }
    update(req, res) {
        res.send('Hello World');
    }
    destroy(req, res) {
        res.send('Hello World');
    }
}

module.exports = new SiswaController();