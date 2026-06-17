const db=require('../../config/database');

class PenilaianModel {
    // Mengambil semua data penilaian
    static getAllPenilaian(callback) {
        db.query('SELECT * FROM nilai', (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mengambil data penilaian berdasarkan ID
    static getPenilaianById(id, callback) {
        db.query('SELECT * FROM nilai WHERE id_nilai = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Menambahkan penilaian baru
    static createPenilaian(penilaian, callback) {
        const query = 'INSERT INTO nilai (id_siswa, id_jadwal, semester, nilai_tugas, nilai_uts, nilai_uas, catatan_karakter) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [penilaian.id_siswa, penilaian.id_jadwal, penilaian.semester, penilaian.nilai_tugas, penilaian.nilai_uts, penilaian.nilai_uas, penilaian.catatan_karakter];
        db.query(query, values, (err, results) => {
            if(err) {
                callback(err, null);    
            } else {
                callback(null, results);
            }   
        });
    }

    // Memperbarui data penilaian berdasarkan ID
    static updatePenilaian(id, penilaian, callback) {
        const query = 'UPDATE nilai SET id_siswa = ?, id_jadwal = ?, semester = ?, nilai_tugas = ?, nilai_uts = ?, nilai_uas = ?, catatan_karakter = ? WHERE id_nilai = ?';
        const values = [penilaian.id_siswa, penilaian.id_jadwal, penilaian.semester, penilaian.nilai_tugas, penilaian.nilai_uts, penilaian.nilai_uas, penilaian.catatan_karakter, id];
        db.query(query, values, (err, results) => {
            if(err) {
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

    // Menghapus data penilaian berdasarkan ID
    static deletePenilaian(id, callback) {
        db.query('DELETE FROM nilai WHERE id_nilai = ?', [id], (err, results) => {
            if(err) {
                callback(err, null);
            } else {

                callback(null, results);
            }
        });
    }
}

module.exports = PenilaianModel;