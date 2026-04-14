const KelasModal = require('../../models/induk_akademik/KelasModal');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationKelas = require('../../utils/ValidationController/ValidationKelas');
const AppError = require('../../utils/AppError');

class KelasController {
    index(req, res) {
        KelasModal.getAllKelas((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Kelas berhasil diambil');
            }
        });
    }
    store(req, res) {
        const data = req.body;
        const error = validationKelas(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        KelasModal.createKelas(data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'Kelas berhasil ditambahkan');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const data= req.body;
        const bodyError = validationKelas(data);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        KelasModal.updateKelas(id, data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Kelas berhasil diubah');
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        KelasModal.deleteKelas(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Kelas berhasil dihapus');
            }
        });
    }
}
module.exports = new KelasController();