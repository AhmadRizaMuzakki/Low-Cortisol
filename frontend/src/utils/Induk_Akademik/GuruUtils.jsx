import http from "../../utils/http"

export function getGuru() {
    return http.get("/guru");
}
export function getGuruById(id) {
    return http.get(`/guru/${id}`);
}
export function createGuru(guru) {
    return http.post("/guru", guru);
}
export function updateGuru(id, guru) {
    return http.put(`/guru/${id}`, guru);
}