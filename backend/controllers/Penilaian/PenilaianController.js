const PenilaianModels = require('../../models/Penilaian/PenilaianModel');

class PenilaianController {
    index(req, res) {
        PenilaianModels.getAllPenilaian((err, results) => {
            if(err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
    store(req, res) {
        const penilaian = req.body;
        PenilaianModels.createPenilaian(penilaian, (err, results) => {
            if(err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json(results);
            }
        });
    }
    update(req, res) {
        const id = req.params.id;
        const penilaian = req.body;
        PenilaianModels.updatePenilaian(id, penilaian, (err, results) => {
            if(err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
    destroy(req, res) {
        const id = req.params.id;
        PenilaianModels.deletePenilaian(id, (err, results) => {
            if(err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(results);
            }
        });
    }
}

module.exports = new PenilaianController();