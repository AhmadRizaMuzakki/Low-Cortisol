function validationJadwal(data) {
    if (!data.id_kelas) {
        return { error: 'id_kelas tidak boleh kosong' };
    }
    if (!data.id_mapel) {
        return { error: 'id_mapel tidak boleh kosong' };
    }
    if (!data.id_guru) {
        return { error: 'id_guru tidak boleh kosong' };
    }
    if (!data.hari) {
        return { error: 'hari tidak boleh kosong' };
    }
    if (!data.jam_mulai) {
        return { error: 'jam_mulai tidak boleh kosong' };
    }
    if (!data.jam_selesai) {
        return { error: 'jam_selesai tidak boleh kosong' };
    }
    
    return null;
}

module.exports = validationJadwal;