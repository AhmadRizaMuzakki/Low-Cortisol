function ValidationGuru(data, { isCreate = false } = {}) {
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
    if (isCreate) {
        if (!data.username) {
            return { error: 'Username tidak boleh kosong' };
        }
        if (!data.password) {
            return { error: 'Password tidak boleh kosong' };
        }
        if (!data.role) {
            return { error: 'Role tidak boleh kosong' };
        }
    }
    return null;
}

module.exports = ValidationGuru;