const db = require('../../config/database');

class PenjadwalanModel {
    
    // Mengambil semua data jadwal
    static getAllJadwal(callback) {
        db.query('SELECT * FROM jadwal_pelajaran', (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getAllJadwalDetail(guruUserId, callback) {
        let query = `
            SELECT
                jp.id_jadwal,
                jp.id_kelas,
                jp.id_mapel,
                jp.id_guru,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai,
                m.nama_mapel,
                k.nama_kelas,
                g.nama_guru
            FROM jadwal_pelajaran jp
            INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
            INNER JOIN kelas k ON jp.id_kelas = k.id_kelas
            INNER JOIN guru g ON jp.id_guru = g.id_guru
        `;
        const params = [];

        if (guruUserId) {
            query += ' WHERE g.user_id = ?';
            params.push(guruUserId);
        }

        query += " ORDER BY k.nama_kelas, m.nama_mapel, FIELD(jp.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'), jp.jam_mulai";

        db.query(query, params, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results || []);
            }
        });
    }

    static findJadwalByMapelKelasGuru(idMapel, idKelas, idGuru, callback) {
        let query = `
            SELECT id_jadwal
            FROM jadwal_pelajaran
            WHERE id_mapel = ? AND id_kelas = ?
        `;
        const params = [idMapel, idKelas];

        if (idGuru) {
            query += ' AND id_guru = ?';
            params.push(idGuru);
        }

        query += ' ORDER BY id_jadwal ASC LIMIT 1';

        db.query(query, params, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results || []);
            }
        });
    }

    static createJadwalSlot(idKelas, idMapel, idGuru, callback) {
        const slots = [
            ['Senin', '07:30:00', '09:00:00'],
            ['Senin', '09:15:00', '10:45:00'],
            ['Selasa', '07:30:00', '09:00:00'],
            ['Selasa', '09:15:00', '10:45:00'],
            ['Rabu', '07:30:00', '09:00:00'],
            ['Rabu', '09:15:00', '10:45:00'],
            ['Kamis', '07:30:00', '09:00:00'],
            ['Kamis', '09:15:00', '10:45:00'],
            ['Jumat', '07:30:00', '09:00:00'],
            ['Sabtu', '07:30:00', '09:00:00'],
        ];

        const trySlot = (index) => {
            if (index >= slots.length) {
                callback(new Error('Tidak ada slot jadwal tersedia untuk kelas ini'), null);
                return;
            }

            const [hari, jam_mulai, jam_selesai] = slots[index];
            const query = `
                INSERT INTO jadwal_pelajaran (id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(query, [idKelas, idMapel, idGuru, hari, jam_mulai, jam_selesai], (err, results) => {
                if (err && err.code === 'ER_DUP_ENTRY') {
                    trySlot(index + 1);
                    return;
                }
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, results.insertId);
            });
        };

        trySlot(0);
    }

    static getOrCreateJadwalForPenilaian(idSiswa, idMapel, idGuru, callback) {
        db.query('SELECT id_kelas FROM siswa WHERE id_siswa = ?', [idSiswa], (siswaErr, siswaRows) => {
            if (siswaErr) {
                callback(siswaErr, null);
                return;
            }
            if (!siswaRows || siswaRows.length === 0) {
                callback(new Error('Siswa tidak ditemukan'), null);
                return;
            }

            const idKelas = siswaRows[0].id_kelas;
            if (!idKelas) {
                callback(new Error('Siswa belum memiliki kelas'), null);
                return;
            }

            const resolveGuru = (next) => {
                if (idGuru) {
                    next(idGuru);
                    return;
                }

                db.query('SELECT id_guru_wali FROM kelas WHERE id_kelas = ?', [idKelas], (kelasErr, kelasRows) => {
                    if (kelasErr) {
                        callback(kelasErr, null);
                        return;
                    }

                    const waliGuru = kelasRows?.[0]?.id_guru_wali;
                    if (waliGuru) {
                        next(waliGuru);
                        return;
                    }

                    db.query('SELECT id_guru FROM guru ORDER BY id_guru ASC LIMIT 1', (guruErr, guruRows) => {
                        if (guruErr) {
                            callback(guruErr, null);
                            return;
                        }
                        if (!guruRows || guruRows.length === 0) {
                            callback(new Error('Data guru tidak ditemukan'), null);
                            return;
                        }
                        next(guruRows[0].id_guru);
                    });
                });
            };

            resolveGuru((resolvedGuruId) => {
                PenjadwalanModel.findJadwalByMapelKelasGuru(idMapel, idKelas, idGuru || null, (findErr, jadwalRows) => {
                    if (findErr) {
                        callback(findErr, null);
                        return;
                    }
                    if (jadwalRows.length > 0) {
                        callback(null, jadwalRows[0].id_jadwal);
                        return;
                    }

                    PenjadwalanModel.createJadwalSlot(idKelas, idMapel, resolvedGuruId, callback);
                });
            });
        });
    }

    // Mengambil data jadwal berdasarkan ID
    static getJadwalById(id, callback) {
        db.query('SELECT * FROM jadwal_pelajaran WHERE id_jadwal = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menambahkan jadwal baru
    // Catatan: id_jadwal biasanya Auto Increment, jadi tidak dimasukkan di INSERT
    static createJadwal(jadwal, callback) {
        const query = 'INSERT INTO jadwal_pelajaran (id_kelas, id_mapel, id_guru, hari, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [jadwal.id_kelas, jadwal.id_mapel, jadwal.id_guru, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai];
        
        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Memperbarui data jadwal berdasarkan ID
    static updateJadwal(id, jadwal, callback) {
        const query = 'UPDATE jadwal_pelajaran SET id_kelas = ?, id_mapel = ?, id_guru = ?, hari = ?, jam_mulai = ?, jam_selesai = ? WHERE id_jadwal = ?';
        const values = [jadwal.id_kelas, jadwal.id_mapel, jadwal.id_guru, jadwal.hari, jadwal.jam_mulai, jadwal.jam_selesai, id];

        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menghapus data jadwal berdasarkan ID
    static deleteJadwal(id, callback) {
        db.query('DELETE FROM jadwal_pelajaran WHERE id_jadwal = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // FITUR TAMBAHAN: Mengambil data jadwal berdasarkan Hari tertentu
    static getJadwalByHari(hari, callback) {
        db.query('SELECT * FROM jadwal_pelajaran WHERE hari = ?', [hari], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getJadwalDetailByKelasId(idKelas, callback) {
        db.query(
            `SELECT
                jp.id_jadwal,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai,
                m.nama_mapel,
                g.nama_guru
             FROM jadwal_pelajaran jp
             INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
             INNER JOIN guru g ON jp.id_guru = g.id_guru
             WHERE jp.id_kelas = ?
             ORDER BY FIELD(jp.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'), jp.jam_mulai`,
            [idKelas],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results || []);
                }
            }
        );
    }
}

module.exports = PenjadwalanModel;