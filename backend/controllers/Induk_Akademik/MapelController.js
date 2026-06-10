const MapelModel = require('../../models/induk_akademik/MapelModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationMapel = require('../../utils/ValidationController/ValidationMapel');
const AppError = require('../../utils/AppError');

class MapelController {
    index(req, res) {
        MapelModel.getAllMapel((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Mapel berhasil diambil');
        });
    }

    show(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        MapelModel.getMapelById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data mata pelajaran tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Mata pelajaran berhasil diambil',
                data: results[0],
            });
        });
    }

    store(req, res) {
        const data = req.body;
        const error = validationMapel(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        MapelModel.createMapel(data, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 201, 'Mapel berhasil ditambahkan');
        });
    }

    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        MapelModel.getMapelById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data mata pelajaran tidak ditemukan',
                    data: null,
                });
            }

            const data = req.body;
            const bodyError = validationMapel(data);
            if (bodyError) {
                return AppError(res, bodyError, 400, bodyError.error);
            }

            MapelModel.updateMapel(id, data, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Mapel berhasil diubah');
            });
        });
    }

    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        MapelModel.getMapelById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data mata pelajaran tidak ditemukan',
                    data: null,
                });
            }

            MapelModel.deleteMapel(id, (err) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return res.status(200).json({
                    success: true,
                    message: 'Mata pelajaran berhasil dihapus',
                });
            });
        });
    }
}

module.exports = new MapelController();
