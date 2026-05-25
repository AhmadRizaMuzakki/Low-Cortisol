import http from "../../utils/http"

export function getSiswa() {
    return http.get("/siswa");
}

export function getSiswaById(id) {
    return http.get(`/siswa/${id}`);
}

export function createSiswa(siswa) {
    return http.post("/siswa", siswa);
}

export function updateSiswa(id, siswa) {
    return http.put(`/siswa/${id}`, siswa);
}

export function deleteSiswa(id) {
    return http.delete(`/siswa/${id}`);
}
