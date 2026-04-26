function validationId(id) {
    if (!id || isNaN(id)) {
        return { error: 'ID tidak boleh kosong dan harus berupa angka' };
    }
    return null;
}
module.exports = validationId;