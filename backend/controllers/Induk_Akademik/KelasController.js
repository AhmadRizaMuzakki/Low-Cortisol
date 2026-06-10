const KelasModal = require('../../models/induk_akademik/KelasModal');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationKelas = require('../../utils/ValidationController/ValidationKelas');
const AppError = require('../../utils/AppError');

class KelasController {
    index(req, res) {
        KelasModal.getAllKelas((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Kelas berhasil diambil');
        });
    }

    show(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        KelasModal.getKelasById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data kelas tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Kelas berhasil diambil',
                data: results[0],
            });
        });
    }

    store(req, res) {
        const data = req.body;
        const error = validationKelas(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        KelasModal.createKelas(data, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 201, 'Kelas berhasil ditambahkan');
        });
    }

    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        KelasModal.getKelasById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data kelas tidak ditemukan',
                    data: null,
                });
            }

            const data = req.body;
            const bodyError = validationKelas(data);
            if (bodyError) {
                return AppError(res, bodyError, 400, bodyError.error);
            }

            KelasModal.updateKelas(id, data, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Kelas berhasil diubah');
            });
        });
    }

    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        KelasModal.getKelasById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data kelas tidak ditemukan',
                    data: null,
                });
            }

            KelasModal.deleteKelas(id, (err) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return res.status(200).json({
                    success: true,
                    message: 'Kelas berhasil dihapus',
                });
            });
        });
    }
}

module.exports = new KelasController();
