const MapelModel = require('../../models/induk_akademik/MapelModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationMapel = require('../../utils/ValidationController/ValidationMapel');
const AppError = require('../../utils/AppError');

class MapelController {
    index(req, res) {
        MapelModel.getAllMapel((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Mapel berhasil diambil');
            }
        });
    }
    store(req, res) {
        const data = req.body;
        const error = validationMapel(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        MapelModel.createMapel(data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'Mapel berhasil ditambahkan');
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
        const bodyError = validationMapel(data);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        MapelModel.updateMapel(id, data, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Mapel berhasil diubah');
            }
        });
    }
    destroy(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        MapelModel.deleteMapel(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Mapel berhasil dihapus');
            }
        });
    }
}
module.exports = new MapelController();