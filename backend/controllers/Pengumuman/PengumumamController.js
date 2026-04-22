const PengumumanModel = require('../../models/Pengumuman/PengumumanModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationPengumuman = require('../../utils/ValidationController/ValidationPengumuman');
const AppError = require('../../utils/AppError');

class PengumumanController {
    index(req, res) {
        PengumumanModel.getAllPengumuman((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Pengumuman berhasil diambil');
            }
        });
    }
    store(req, res) {
        const data = req.body;
        const error = validationPengumuman(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        PengumumanModel.createPengumuman(data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'Pengumuman berhasil ditambahkan');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }
        const data = req.body;
        const bodyError = validationPengumuman(data);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        PengumumanModel.updatePengumuman(id, data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Pengumuman berhasil diubah');
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }
        PengumumanModel.deletePengumuman(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Pengumuman berhasil dihapus');
            }
        });
    }
}

module.exports = new PengumumanController();
