function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

function validationPenilaian(data) {
    if (!data.id_siswa) {
        return { error: 'id_siswa tidak boleh kosong' };
    }
    if (!data.id_jadwal && !data.id_mapel) {
        return { error: 'Mata pelajaran tidak boleh kosong' };
    }
    if (!data.semester) {
        return { error: 'Semester tidak boleh kosong' };
    }
    if (isEmpty(data.nilai_tugas)) {
        return { error: 'Nilai tugas tidak boleh kosong' };
    }
    if (isEmpty(data.nilai_uts)) {
        return { error: 'Nilai UTS tidak boleh kosong' };
    }
    if (isEmpty(data.nilai_uas)) {
        return { error: 'Nilai UAS tidak boleh kosong' };
    }
    const scores = [data.nilai_tugas, data.nilai_uts, data.nilai_uas];
    for (const score of scores) {
        const num = Number(score);
        if (Number.isNaN(num) || num < 0 || num > 100) {
            return { error: 'Nilai harus berupa angka antara 0 dan 100' };
        }
    }
    return null;
}

module.exports = validationPenilaian;