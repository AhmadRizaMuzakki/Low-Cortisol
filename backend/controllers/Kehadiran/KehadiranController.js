const KehadiranModel = require("../../models/Kehadiran/KehadiranModel");
const validationId = require('../../utils/ValidationController/ValidationId');
const validationPresensi = require('../../utils/ValidationController/ValidationPresensi');
const AppError = require('../../utils/AppError');


class KehadiranController {
     index(req, res) {
        KehadiranModel.getAllSiswa((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Siswa berhasil diambil');
            }
        });
    }
     store(req, res) {
        const {id_siswa, id_jadwal, tanggal, status} = req.body;
        const kehadiran = {id_siswa, id_jadwal, tanggal, status};
        KehadiranModel.createKehadiran(kehadiran, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 201, 'Kehadiran berhasil ditambahkan');
            }
        });
    }
     update(req, res) {
        const {id} = req.params;
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const {id_siswa, id_jadwal, tanggal, status} = req.body;
        const kehadiran = { id, id_siswa, id_jadwal, tanggal, status};
        const error = validationPresensi(kehadiran);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        KehadiranModel.updateKehadiran(id, kehadiran, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 201, 'Kehadiran berhasil diperbarui');
            }
        });
    }
     destroy(req, res) {
        const {id} = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        KehadiranModel.deleteKehadiran(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            }else{
                return AppError(res, results, 200, 'Kehadiran berhasil dihapus');
            }
        });
    }
}

module.exports = new KehadiranController();