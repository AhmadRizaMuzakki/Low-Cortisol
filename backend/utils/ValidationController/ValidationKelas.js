function ValidationKelas(data) {
    if (!data.nama_kelas) {
        return { error: 'Nama kelas tidak boleh kosong' };
    }
    if (!data.tahun_ajaran) {
        return { error: 'Tahun ajaran tidak boleh kosong' };
    }
    if (!data.id_guru_wali) {
        return { error: 'Guru wali tidak boleh kosong' };
    }
    return null;
}

module.exports = ValidationKelas;
