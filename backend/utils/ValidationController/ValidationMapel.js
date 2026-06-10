function validationMapel(data) {
    if (!data.nama_mapel) {
        return { error: 'Nama mata pelajaran tidak boleh kosong' };
    }
    if (data.kkm === undefined || data.kkm === null || data.kkm === '') {
        return { error: 'KKM tidak boleh kosong' };
    }
    return null;
}

module.exports = validationMapel;
