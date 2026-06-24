const PenjadwalanModel = require('../../models/Jadwal/JadwalModel');
const GuruModel = require('../../models/induk_akademik/GuruModel');
const AppError = require('../../utils/AppError');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationJadwal = require('../../utils/ValidationController/ValidationJadwal');

class PenjadwalanController {
    
    // Mengambil semua data jadwal
    index(req, res) {
        const { role, id: userId } = req.user || {};

        const sendList = (idGuru) => {
            PenjadwalanModel.getAllJadwalDetail(idGuru, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Jadwal berhasil diambil');
            });
        };

        if (role === 'guru') {
            GuruModel.getGuruByUserId(userId, (guruErr, guruRows) => {
                if (guruErr) {
                    return AppError(res, guruErr, 500, guruErr.message);
                }
                const idGuru = guruRows?.[0]?.id_guru ?? null;
                sendList(idGuru);
            });
            return;
        }

        sendList(null);
    }

    show(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        PenjadwalanModel.getJadwalDetailById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data jadwal tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Jadwal berhasil diambil',
                data: results[0],
            });
        });
    }

    // Menambahkan jadwal baru
    store(req, res) {
        const { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai } = req.body;
        const jadwal = { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai };
        const error = validationJadwal(jadwal);
        if (error) {
            return AppError(res, error, 400, error.error);
        }
        
        PenjadwalanModel.createJadwal(jadwal, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 201, 'Jadwal berhasil ditambahkan');
            }
        });
    }

    // Memperbarui data jadwal
    update(req, res) {
        const { id } = req.params;
        const { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai } = req.body;
        const jadwal = { id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai };
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        const bodyError = validationJadwal(jadwal);
        if (bodyError) {
            return AppError(res, bodyError, 400, bodyError.error);
        }
        PenjadwalanModel.updateJadwal(id, jadwal, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Jadwal berhasil diubah');
            }
        });
    }

    // Menghapus data jadwal
    destroy(req, res) {
        const { id } = req.params;
        const AppError = validationId(id);
        if (AppError) {
            return AppError(res, AppError, 400, AppError.error);
        }
        
        PenjadwalanModel.deleteJadwal(id, (err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Jadwal berhasil dihapus');
            }
        });
    }
}

module.exports = new PenjadwalanController();