import http from "../../utils/http"

export function getKelas() {
    return http.get("/kelas");
}
export function getKelasById(id) {
    return http.get(`/kelas/${id}`);
}
export function createKelas(kelas) {
    return http.post("/kelas", kelas);
}
export function updateKelas(id, kelas) {
    return http.put(`/kelas/${id}`, kelas);
}