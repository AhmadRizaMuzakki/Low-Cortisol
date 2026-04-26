const PenilaianModels = require('../../models/Penilaian/PenilaianModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationPenilaian = require('../../utils/ValidationController/ValidationPenilaian');
const AppError = require('../../utils/AppError');

class PenilaianController {
    index(req, res) {
        PenilaianModels.getAllPenilaian((err, results) => {
            if(err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Penilaian berhasil diambil');
            }
        });
    }
    store(req, res) {
        const penilaian = req.body;
        const bodyError = validationPenilaian(penilaian);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        PenilaianModels.createPenilaian(penilaian, (err, results) => {
            if(err) {
               return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 201, 'Penilaian berhasil ditambahkan');
            }
        });
    }
    update(req, res) {
        const {id} = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const penilaian = req.body;
        const bodyError = validationPenilaian(penilaian);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        PenilaianModels.updatePenilaian(id, penilaian, (err, results) => {
            if(err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Penilaian berhasil diubah');
            }
        });
    }
    destroy(req, res) {
        const {id} = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        PenilaianModels.deletePenilaian(id, (err, results) => {
            if(err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Penilaian berhasil dihapus');
            }
        });
    }
}
module.exports = new PenilaianController();