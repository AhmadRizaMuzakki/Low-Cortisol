import http from "../../utils/http"

export function getMapel() {
    return http.get("/mapel");
}
export function getMapelById(id) {
    return http.get(`/mapel/${id}`);
}
export function createMapel(mapel) {
    return http.post("/mapel", mapel);
}
export function updateMapel(id, mapel) {
    return http.put(`/mapel/${id}`, mapel);
}
export function deleteMapel(id) {
    return http.delete(`/mapel/${id}`);
}