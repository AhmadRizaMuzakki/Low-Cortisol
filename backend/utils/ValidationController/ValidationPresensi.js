function validationPresensi(data) {
    if (!data.id_kehadiran) {
        return { error: 'id_presensi tidak boleh kosong' };
    }
    if (!data.id_siswa) {
        return { error: 'id_siswa tidak boleh kosong' };
    }
    if (!data.id_jadwal) {
        return { error: 'id_jadwal tidak boleh kosong' };
    }
    if (!data.tanggal) {
    return { error: 'tanggal tidak boleh kosong' };
    }
    if (!data.status) {
        return { error: 'status tidak boleh kosong' };
    }
    return null;

}
module.exports = validationPresensi;