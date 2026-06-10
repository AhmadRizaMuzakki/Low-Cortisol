function validationSiswa(data, { isCreate = false } = {}) {
    if (!data.nisn) {
        return { error: 'NISN tidak boleh kosong' };
    }
    if (!data.nama_siswa) {
        return { error: 'Nama siswa tidak boleh kosong' };
    }
    if (!data.tanggal_lahir) {
        return { error: 'Tanggal lahir tidak boleh kosong' };
    }
    if (!data.jenis_kelamin) {
        return { error: 'Jenis kelamin tidak boleh kosong' };
    }
    if (!data.alamat) {
        return { error: 'Alamat tidak boleh kosong' };
    }
    if (!data.id_kelas) {
        return { error: 'Kelas tidak boleh kosong' };
    }
    if (isCreate) {
        if (!data.username) {
            return { error: 'Username tidak boleh kosong' };
        }
        if (!data.password) {
            return { error: 'Password tidak boleh kosong' };
        }
        if (!data.role) {
            return { error: 'Role tidak boleh kosong' };
        }
    }
    return null;
}

module.exports = validationSiswa;
