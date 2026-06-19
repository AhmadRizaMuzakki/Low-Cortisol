const db = require('../../config/database');

class PenilaianModel {
    static getAllPenilaian(idGuru, callback) {
        let query = `
            SELECT
                n.id_nilai,
                n.id_siswa,
                n.id_jadwal,
                n.semester,
                n.nilai_tugas,
                n.nilai_uts,
                n.nilai_uas,
                n.catatan_karakter,
                n.created_at,
                n.updated_at,
                s.nisn,
                s.nama_siswa,
                m.nama_mapel,
                g.nama_guru,
                g.id_guru,
                k.id_kelas,
                k.nama_kelas,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai
            FROM nilai n
            INNER JOIN siswa s ON n.id_siswa = s.id_siswa
            INNER JOIN jadwal_pelajaran jp ON n.id_jadwal = jp.id_jadwal
            INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
            INNER JOIN guru g ON jp.id_guru = g.id_guru
            INNER JOIN kelas k ON jp.id_kelas = k.id_kelas
        `;
        const params = [];

        if (idGuru) {
            query += ' WHERE jp.id_guru = ?';
            params.push(idGuru);
        }

        query += ' ORDER BY n.semester, k.nama_kelas, s.nama_siswa, m.nama_mapel';

        db.query(query, params, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results || []);
            }
        });
    }

    static getPenilaianById(id, callback) {
        db.query(
            `SELECT
                n.*,
                jp.id_mapel,
                jp.id_kelas
             FROM nilai n
             INNER JOIN jadwal_pelajaran jp ON n.id_jadwal = jp.id_jadwal
             WHERE n.id_nilai = ?`,
            [id],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results);
                }
            }
        );
    }

    static createPenilaian(penilaian, callback) {
        const query = `
            INSERT INTO nilai (id_siswa, id_jadwal, semester, nilai_tugas, nilai_uts, nilai_uas, catatan_karakter)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            penilaian.id_siswa,
            penilaian.id_jadwal,
            penilaian.semester,
            penilaian.nilai_tugas,
            penilaian.nilai_uts,
            penilaian.nilai_uas,
            penilaian.catatan_karakter,
        ];

        db.query(query, values, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static updatePenilaian(id, penilaian, callback) {
        const query = `
            UPDATE nilai
            SET id_siswa = ?, id_jadwal = ?, semester = ?, nilai_tugas = ?, nilai_uts = ?, nilai_uas = ?, catatan_karakter = ?
            WHERE id_nilai = ?
        `;
        const values = [
            penilaian.id_siswa,
            penilaian.id_jadwal,
            penilaian.semester,
            penilaian.nilai_tugas,
            penilaian.nilai_uts,
            penilaian.nilai_uas,
            penilaian.catatan_karakter,
            id,
        ];

        db.query(query, values, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getNilaiByUserId(userId, callback) {
        db.query(
            `SELECT
                n.id_nilai,
                n.semester,
                n.nilai_tugas,
                n.nilai_uts,
                n.nilai_uas,
                n.catatan_karakter,
                m.nama_mapel,
                g.nama_guru,
                k.id_kelas,
                k.nama_kelas,
                jp.hari,
                jp.jam_mulai,
                jp.jam_selesai
             FROM nilai n
             INNER JOIN siswa s ON n.id_siswa = s.id_siswa
             INNER JOIN jadwal_pelajaran jp ON n.id_jadwal = jp.id_jadwal
             INNER JOIN mapel m ON jp.id_mapel = m.id_mapel
             INNER JOIN guru g ON jp.id_guru = g.id_guru
             INNER JOIN kelas k ON jp.id_kelas = k.id_kelas
             WHERE s.user_id = ?
             ORDER BY n.semester, m.nama_mapel`,
            [userId],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results || []);
                }
            }
        );
    }

    static isJadwalOwnedByGuru(idJadwal, userId, callback) {
        db.query(
            `SELECT jp.id_jadwal
             FROM jadwal_pelajaran jp
             INNER JOIN guru g ON jp.id_guru = g.id_guru
             WHERE jp.id_jadwal = ? AND g.user_id = ?`,
            [idJadwal, userId],
            (err, results) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results.length > 0);
                }
            }
        );
    }

    static deletePenilaian(id, callback) {
        db.query('DELETE FROM nilai WHERE id_nilai = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = PenilaianModel;