// Controller untuk mengatur data guru (tambah, tampil, update, hapus)
const bcrypt = require('bcryptjs');
const GuruModel = require('../../models/induk_akademik/GuruModel');
const UserModel = require('../../models/Authtentication/UserModel');
const AppError = require('../../utils/AppError');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationGuru = require('../../utils/ValidationController/ValidationGuru');

function mapJenisKelamin(value) {
    if (value === 'Laki-laki' || value === 'L') return 'L';
    if (value === 'Perempuan' || value === 'P') return 'P';
    return value;
}

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

    // Ambil satu data guru berdasarkan id
    show(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        GuruModel.getGuruById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data guru tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Guru berhasil diambil',
                data: results[0],
            });
        });
    }

    // Tambah data guru baru
    store(req, res) {
        const data = req.body;
        const error = validationGuru(data, { isCreate: true });
        if (error) {
            return AppError(res, error, 400, error.error);
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        UserModel.createUser(data.username, hashedPassword, data.role, (userErr, userResults) => {
            if (userErr) {
                return AppError(res, userErr, 500, userErr.message);
            }

            const guruData = {
                nip: data.nip,
                nama_guru: data.nama_guru,
                jenis_kelamin: mapJenisKelamin(data.jenis_kelamin),
                no_hp: data.no_hp,
                user_id: userResults.insertId,
            };

            GuruModel.createGuru(guruData, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 201, 'Guru berhasil ditambahkan');
            });
        });
    }

    // Update data guru berdasarkan id
    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        GuruModel.getGuruById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data guru tidak ditemukan',
                    data: null,
                });
            }

            const existing = existingRows[0];
            const data = {
                ...req.body,
                jenis_kelamin: mapJenisKelamin(req.body.jenis_kelamin),
                user_id: req.body.user_id ?? existing.user_id,
            };
            const bodyError = validationGuru(data);
            if (bodyError) {
                return AppError(res, bodyError, 400, bodyError.error);
            }

            GuruModel.updateGuru(id, data, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Guru berhasil diubah');
            });
        });
    }

    // Hapus data guru berdasarkan id beserta akun login-nya
    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        GuruModel.getGuruById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data guru tidak ditemukan',
                    data: null,
                });
            }

            const userId = existingRows[0].user_id;

            GuruModel.deleteGuru(id, (err) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }

                if (!userId) {
                    return res.status(200).json({
                        success: true,
                        message: 'Guru berhasil dihapus',
                    });
                }

                UserModel.deleteUser(userId, (userErr) => {
                    if (userErr) {
                        return AppError(res, userErr, 500, userErr.message);
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Guru dan akun login berhasil dihapus',
                    });
                });
            });
        });
    }
}

module.exports = new GuruController();