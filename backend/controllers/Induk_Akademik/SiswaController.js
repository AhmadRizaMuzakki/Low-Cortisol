const bcrypt = require('bcryptjs');
const SiswaModel = require('../../models/induk_akademik/SiswaModel');
const UserModel = require('../../models/Authtentication/UserModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationSiswa = require('../../utils/ValidationController/ValidationSiswa');
const AppError = require('../../utils/AppError');

function mapJenisKelamin(value) {
    if (value === 'Laki-laki' || value === 'L') return 'L';
    if (value === 'Perempuan' || value === 'P') return 'P';
    return value;
}

class SiswaController {
    index(req, res) {
        SiswaModel.getAllSiswa((err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Siswa berhasil diambil');
        });
    }

    showById(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        SiswaModel.getSiswaById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data siswa tidak ditemukan',
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Siswa berhasil diambil',
                data: results[0],
            });
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
                jenis_kelamin: mapJenisKelamin(jenis_kelamin),
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
        const error = validationSiswa(data, { isCreate: true });
        if (error) {
            return AppError(res, error, 400, error.error);
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        UserModel.createUser(data.username, hashedPassword, data.role, (userErr, userResults) => {
            if (userErr) {
                return AppError(res, userErr, 500, userErr.message);
            }

            const siswaData = {
                nisn: data.nisn,
                nama_siswa: data.nama_siswa,
                tanggal_lahir: data.tanggal_lahir,
                jenis_kelamin: mapJenisKelamin(data.jenis_kelamin),
                alamat: data.alamat,
                id_kelas: data.id_kelas,
                user_id: userResults.insertId,
            };

            SiswaModel.createSiswa(siswaData, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 201, 'Siswa berhasil ditambahkan');
            });
        });
    }

    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        SiswaModel.getSiswaById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data siswa tidak ditemukan',
                    data: null,
                });
            }

            const existing = existingRows[0];
            const data = {
                ...req.body,
                jenis_kelamin: mapJenisKelamin(req.body.jenis_kelamin),
                user_id: req.body.user_id ?? existing.user_id,
            };
            const bodyError = validationSiswa(data);
            if (bodyError) {
                return AppError(res, bodyError, 400, bodyError.error);
            }

            SiswaModel.updateSiswa(id, data, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Siswa berhasil diubah');
            });
        });
    }

    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        SiswaModel.getSiswaById(id, (fetchErr, existingRows) => {
            if (fetchErr) {
                return AppError(res, fetchErr, 500, fetchErr.message);
            }
            if (!existingRows || existingRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data siswa tidak ditemukan',
                    data: null,
                });
            }

            const userId = existingRows[0].user_id;

            SiswaModel.deleteSiswa(id, (err) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }

                if (!userId) {
                    return res.status(200).json({
                        success: true,
                        message: 'Siswa berhasil dihapus',
                    });
                }

                UserModel.deleteUser(userId, (userErr) => {
                    if (userErr) {
                        return AppError(res, userErr, 500, userErr.message);
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Siswa dan akun login berhasil dihapus',
                    });
                });
            });
        });
    }
}

module.exports = new SiswaController();
