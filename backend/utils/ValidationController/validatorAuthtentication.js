function validatorLogin(data) {
    if (!data.username) {
        return { error: 'Username tidak boleh kosong' };
    }
    if (!data.password) {
        return { error: 'Password tidak boleh kosong' };
    }
    if (!data.role) {
        return { error: 'Role tidak boleh kosong' };
    }
    return null;
}

function validatorRegister(data) {
    if (!data.username) {
        return { error: 'Username tidak boleh kosong' };
    }
    if (!data.password) {
        return { error: 'Password tidak boleh kosong' };
    }
    if (!data.role) {
        return { error: 'Role tidak boleh kosong' };
    }
    return null;
}
module.exports = { validatorLogin, validatorRegister };