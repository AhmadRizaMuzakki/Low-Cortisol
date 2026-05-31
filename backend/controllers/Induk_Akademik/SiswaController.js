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
    show(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return AppError(res, 'User tidak ditemukan', 401, 'User tidak ditemukan');
        }
        SiswaModel.getSiswaByUserId(userId, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Biodata berhasil diambil',
                data: results[0],
            });
        });
    }
    updateBiodata(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return AppError(res, 'User tidak ditemukan', 401, 'User tidak ditemukan');
        }
        const { nisn, nama_siswa, tanggal_lahir, jenis_kelamin, alamat } = req.body || {};
        if (!nisn || !nama_siswa || !tanggal_lahir || !jenis_kelamin || !alamat) {
            return AppError(res, 'Semua field wajib diisi', 400, 'Semua field wajib diisi');
        }
        SiswaModel.getSiswaByUserId(userId, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Biodata tidak ditemukan',
                    data: null,
                });
            }
            const siswa = results[0];
            const updateData = {
                nisn,
                nama_siswa,
                tanggal_lahir,
                jenis_kelamin,
                alamat,
                id_kelas: siswa.id_kelas,
                user_id: siswa.user_id,
            };
            SiswaModel.updateSiswa(siswa.id_siswa, updateData, (updateErr) => {
                if (updateErr) {
                    return AppError(res, updateErr, 500, updateErr.message);
                }
                return res.status(200).json({
                    success: true,
                    message: 'Biodata berhasil diperbarui',
                    data: { id_siswa: siswa.id_siswa },
                });
            });
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