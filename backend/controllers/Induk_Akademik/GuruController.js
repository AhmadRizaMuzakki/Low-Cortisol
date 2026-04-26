// Controller untuk mengatur data guru (tambah, tampil, update, hapus)
const GuruModel = require('../../models/induk_akademik/GuruModel');
const AppError = require('../../utils/AppError');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationGuru = require('../../utils/ValidationController/ValidationGuru');

class GuruController {
    // Ambil semua data guru
    index(req, res) {
        GuruModel.getAllGurus((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Guru berhasil diambil');
            }
        });
    }

    // Tambah data guru baru
    store(req, res) {
        const data = req.body;
        const error = validationGuru(data);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        GuruModel.createGuru(data, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 201, 'Guru berhasil ditambahkan');
            }
        });
    }

    // Update data guru berdasarkan id
    update(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const data = req.body;
        const bodyError = validationGuru(data);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        GuruModel.updateGuru(id, data, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Guru berhasil diubah');
            }
        });
    }

    // Hapus data guru berdasarkan id
    destroy(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        GuruModel.deleteGuru(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Guru berhasil dihapus');
            }
        });
    }
}

module.exports = new GuruController();