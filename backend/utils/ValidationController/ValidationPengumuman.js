function validationPengumuman(data) {
    if (!data.judul) {
        return { error: 'judul tidak boleh kosong' };
    }
    if (!data.deskripsi) {
        return { error: 'isi tidak boleh kosong' };
    }
    if (!data.tanggal) {
        return { error: 'tanggal tidak boleh kosong' };
    }
    return null;
}
module.exports = validationPengumuman;