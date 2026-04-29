function validationPengumuman(data) {
    if (!data || typeof data !== 'object') {
        return { error: 'body request tidak valid' };
    }
    if (!data.judul) {
        return { error: 'judul tidak boleh kosong' };
    }
    if (!data.deskripsi) {
        return { error: 'isi tidak boleh kosong' };
    }
    if (!data.tanggal) {
        return { error: 'tanggal tidak boleh kosong' };
    }
    if (!data.id_users) {
        return { error: 'id_users tidak boleh kosong' };
    }
    return null;
}
module.exports = validationPengumuman;