function validationSiswa(data) {
    if (!data.id_siswa) {
        return { error: 'id_siswa tidak boleh kosong' };
    }
    if (!data.nisn) {
        return { error: 'nisn tidak boleh kosong' };
    }
    if (!data.nama_siswa) {
        return { error: 'nama_siswa tidak boleh kosong' };
    }
    if (!data.tanggal_lahir) {
        return { error: 'tanggal_lahir tidak boleh kosong' };
    }
    if (!data.jenis_kelamin) {
        return { error: 'jenis_kelamin tidak boleh kosong' };
    }
    if (!data.alamat) {
        return { error: 'alamat tidak boleh kosong' };
    }
    if (!data.id_kelas) {
        return { error: 'id_kelas tidak boleh kosong' };
    }
    if (!data.user_id) {
        return { error: 'user_id tidak boleh kosong' };
    }
    return null;
}
module.exports = validationSiswa;