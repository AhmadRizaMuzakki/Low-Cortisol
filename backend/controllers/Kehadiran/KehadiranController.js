const KehadiranModel = require("../../models/Kehadiran/KehadiranModel");
const validationId = require('../../utils/ValidationController/ValidationId');
const validationPresensi = require('../../utils/ValidationController/ValidationPresensi');
const AppError = require('../../utils/AppError');

class KehadiranController {
    index(req, res) {
        KehadiranModel.getAllKehadiran((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Data presensi berhasil diambil');
        });
    }

    show(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        KehadiranModel.getKehadiranById(id, (err, data) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Data presensi tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Data presensi berhasil diambil',
                data,
            });
        });
    }

    store(req, res) {
        const { id_siswa, id_jadwal, tanggal, status } = req.body;
        const kehadiran = { id_siswa, id_jadwal, tanggal, status };
        const error = validationPresensi(kehadiran);
        if (error) {
            return AppError(res, error, 400, error.error);
        }

        KehadiranModel.createKehadiran(kehadiran, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 201, 'Presensi berhasil ditambahkan');
        });
    }

    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        const { id_siswa, id_jadwal, tanggal, status } = req.body;
        const kehadiran = { id_siswa, id_jadwal, tanggal, status };
        const bodyError = validationPresensi(kehadiran);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }

        KehadiranModel.updateKehadiran(id, kehadiran, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Presensi berhasil diperbarui');
        });
    }

    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        KehadiranModel.deleteKehadiran(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Presensi berhasil dihapus');
        });
    }
}

module.exports = new KehadiranController();