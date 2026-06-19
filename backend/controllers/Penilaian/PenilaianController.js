const PenilaianModel = require('../../models/Penilaian/PenilaianModel');
const PenjadwalanModel = require('../../models/Jadwal/JadwalModel');
const GuruModel = require('../../models/induk_akademik/GuruModel');
const validationId = require('../../utils/ValidationController/ValidationId');
const validationPenilaian = require('../../utils/ValidationController/ValidationPenilaian');
const AppError = require('../../utils/AppError');

function resolveGuruIdForUser(user, callback) {
    if (!user || user.role !== 'guru') {
        callback(null, null);
        return;
    }

    GuruModel.getGuruByUserId(user.id, (err, guruRows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, guruRows?.[0]?.id_guru ?? null);
    });
}

function ensureGuruCanAccessJadwal(user, idJadwal, res, onAllowed) {
    if (user?.role !== 'guru') {
        onAllowed();
        return;
    }

    GuruModel.getGuruByUserId(user.id, (err, guruRows) => {
        if (err) {
            AppError(res, err, 500, err.message);
            return;
        }

        if (!guruRows || guruRows.length === 0) {
            onAllowed();
            return;
        }

        PenilaianModel.isJadwalOwnedByGuru(idJadwal, user.id, (checkErr, owned) => {
            if (checkErr) {
                AppError(res, checkErr, 500, checkErr.message);
                return;
            }
            if (!owned) {
                AppError(res, 'Akses ditolak untuk jadwal ini', 403, 'Akses ditolak untuk jadwal ini');
                return;
            }
            onAllowed();
        });
    });
}

function preparePenilaianData(req, data, callback) {
    const payload = { ...data };

    if (payload.id_jadwal) {
        callback(null, payload);
        return;
    }

    if (!payload.id_mapel) {
        callback({ error: 'Mata pelajaran tidak boleh kosong' });
        return;
    }

    const attachJadwal = (idGuru) => {
        PenjadwalanModel.getOrCreateJadwalForPenilaian(
            payload.id_siswa,
            payload.id_mapel,
            idGuru,
            (err, idJadwal) => {
                if (err) {
                    callback(err);
                    return;
                }
                payload.id_jadwal = idJadwal;
                callback(null, payload);
            }
        );
    };

    resolveGuruIdForUser(req.user, (err, idGuru) => {
        if (err) {
            callback(err);
            return;
        }
        attachJadwal(idGuru);
    });
}

class PenilaianController {
    index(req, res) {
        const { role, id: userId } = req.user || {};

        if (role === 'siswa') {
            PenilaianModel.getNilaiByUserId(userId, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Penilaian berhasil diambil');
            });
            return;
        }

        const sendList = (idGuru) => {
            PenilaianModel.getAllPenilaian(idGuru, (err, results) => {
                if (err) {
                    return AppError(res, err, 500, err.message);
                }
                return AppError(res, results, 200, 'Penilaian berhasil diambil');
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

        PenilaianModel.getPenilaianById(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data penilaian tidak ditemukan',
                    data: null,
                });
            }

            const data = results[0];

            if (req.user?.role === 'guru') {
                GuruModel.getGuruByUserId(req.user.id, (guruErr, guruRows) => {
                    if (guruErr) {
                        return AppError(res, guruErr, 500, guruErr.message);
                    }
                    if (!guruRows || guruRows.length === 0) {
                        return res.status(200).json({
                            success: true,
                            message: 'Penilaian berhasil diambil',
                            data,
                        });
                    }

                    PenilaianModel.isJadwalOwnedByGuru(data.id_jadwal, req.user.id, (checkErr, owned) => {
                        if (checkErr) {
                            return AppError(res, checkErr, 500, checkErr.message);
                        }
                        if (!owned) {
                            return AppError(res, 'Akses ditolak', 403, 'Akses ditolak untuk penilaian ini');
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Penilaian berhasil diambil',
                            data,
                        });
                    });
                });
                return;
            }

            return res.status(200).json({
                success: true,
                message: 'Penilaian berhasil diambil',
                data,
            });
        });
    }

    store(req, res) {
        preparePenilaianData(req, req.body, (prepareErr, data) => {
            if (prepareErr) {
                const message = prepareErr.error || prepareErr.message || 'Gagal menyiapkan data penilaian';
                return AppError(res, prepareErr, 400, message);
            }

            const error = validationPenilaian(data);
            if (error) {
                return AppError(res, error, 400, error.error);
            }

            const create = () => {
                PenilaianModel.createPenilaian(data, (err, results) => {
                    if (err) {
                        return AppError(res, err, 500, err.message);
                    }
                    return AppError(res, results, 201, 'Penilaian berhasil ditambahkan');
                });
            };

            ensureGuruCanAccessJadwal(req.user, data.id_jadwal, res, create);
        });
    }

    update(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        preparePenilaianData(req, req.body, (prepareErr, data) => {
            if (prepareErr) {
                const message = prepareErr.error || prepareErr.message || 'Gagal menyiapkan data penilaian';
                return AppError(res, prepareErr, 400, message);
            }

            const bodyError = validationPenilaian(data);
            if (bodyError) {
                return AppError(res, bodyError, 400, bodyError.error);
            }

            const save = () => {
                PenilaianModel.updatePenilaian(id, data, (err, results) => {
                    if (err) {
                        return AppError(res, err, 500, err.message);
                    }
                    return AppError(res, results, 200, 'Penilaian berhasil diubah');
                });
            };

            ensureGuruCanAccessJadwal(req.user, data.id_jadwal, res, save);
        });
    }

    destroy(req, res) {
        const { id } = req.params;
        const idError = validationId(id);
        if (idError) {
            return AppError(res, idError, 400, idError.error);
        }

        PenilaianModel.deletePenilaian(id, (err, results) => {
            if (err) {
                return AppError(res, err, 500, err.message);
            }
            return AppError(res, results, 200, 'Penilaian berhasil dihapus');
        });
    }
}

module.exports = new PenilaianController();