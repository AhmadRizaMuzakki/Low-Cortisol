function validationMapel(data) {
    if (!data.id_mapel) {
        return { error: 'id_mapel tidak boleh kosong' };
    }
    if (!data.nama_mapel) {
        return { error: 'nama_mapel tidak boleh kosong' };
    }
    if (!data.kkm) {
        return { error: 'kkm tidak boleh kosong' };
    }
    return null;
}
module.exports = validationMapel;