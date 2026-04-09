const KehadiranModel = require("../../models/Kehadiran/KehadiranModel");

class KehadiranController {
     index(req, res) {
        KehadiranModel.getAllKehadiran((err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
     store(req, res) {
        const {id_siswa, id_jadwal, tanggal, status} = req.body;
        const kehadiran = {id_siswa, id_jadwal, tanggal, status};
        KehadiranModel.createKehadiran(kehadiran, (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json(results);
            }
        });
    }
     update(req, res) {
        const {id} = req.params;
        const {id_siswa, id_jadwal, tanggal, status} = req.body;
        const kehadiran = { id, id_siswa, id_jadwal, tanggal, status};
        KehadiranModel.updateKehadiran(id, kehadiran, (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
     destroy(req, res) {
        const {id} = req.params;
        KehadiranModel.deleteKehadiran(id, (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
}

module.exports = new KehadiranController();