function ValidationGuru(data) {
    if (!data.nip) {
        return { error: 'NIP guru tidak boleh kosong' };
    }
    if (!data.nama_guru) {
        return { error: 'Nama guru tidak boleh kosong' };
    }
    if (!data.jenis_kelamin) {
        return { error: 'Jenis kelamin guru tidak boleh kosong' };
    }
    if (!data.no_hp) {
        return { error: 'No HP guru tidak boleh kosong' };
    }
    if (!data.user_id) {
        return { error: 'User ID guru tidak boleh kosong' };
    }
    return null;
}

module.exports = ValidationGuru;