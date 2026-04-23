const PenjadwalanModel = require('../../models/Jadwal/JadwalModel');
const AppError = require('../../utils/AppError');

class PenjadwalanController {
    
    // Mengambil semua data jadwal
    index(req, res) {
        PenjadwalanModel.getAllJadwal((err, results) => {
            if(err){
                return AppError(res, err, 500, err.message);
            } else {
                return AppError(res, results, 200, 'Jadwal berhasil diambil');
            }
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