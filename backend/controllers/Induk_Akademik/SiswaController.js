const SiswaModel = require('../../models/induk_akademik/SiswaModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationSiswa = require('../../utils/ValidationController/ValidationSiswa');
const AppError = require('../../utils/AppError');

class SiswaController {
    index(req, res) {
        SiswaModel.getAllSiswa((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Siswa berhasil diambil');
            }
        });
    }
    store(req, res) {
        const data = req.body;
        const error = validationSiswa(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        SiswaModel.createSiswa(data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'Siswa berhasil ditambahkan');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const data = req.body;
        const bodyError = validationSiswa(data);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        SiswaModel.updateSiswa(id, data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Siswa berhasil diubah');
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        SiswaModel.deleteSiswa(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Siswa berhasil dihapus');
            }
        });
    }
}

module.exports = new SiswaController();