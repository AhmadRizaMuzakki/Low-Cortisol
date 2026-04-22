function ValidationKelas(data) {
    if (!data.id_kelas) {
        return { error: 'ID kelas tidak boleh kosong' };
    }
    if (!data.nama_kelas) {
        return { error: 'Nama kelas tidak boleh kosong' };
    }
    if (!data.tahun_ajaran) {
        return { error: 'Tahun ajaran tidak boleh kosong' };
    }
    if (!data.id_guru_wali) {
        return { error: 'ID guru wali tidak boleh kosong' };
    }
    return null;
}
module.exports = ValidationKelas;