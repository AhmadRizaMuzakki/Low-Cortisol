function validatePenilain(data) {
    if (!data.id_nilai) {
        return { error: 'id_nilai tidak boleh kosong' };
    }
    if (!data.id_siswa) {
        return { error: 'id_siswa tidak boleh kosong' };
    }   
    if (!data.id_jadwal) {
        return { error: 'id_jadwal tidak boleh kosong' };
    }
    if (!data.semester) {
        return { error: 'Semester tidak boleh kosong' };
    }
    if (!data.nilai_tugas) {
        return { error: 'Nilai tugas tidak boleh kosong' };
    }
    if (!data.nilai_uts) {
        return { error: 'Nilai UTS tidak boleh kosong' };
    }
    if (!data.nilai_uas) {
        return { error: 'Nilai UAS tidak boleh kosong' };
    }
    if (!data.catatan_karakter) {
        return { error: 'Catatan karakter tidak boleh kosong' };
    }
    return null;
}
module.exports = validatePenilain;