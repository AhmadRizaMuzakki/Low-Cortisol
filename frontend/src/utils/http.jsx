import axios from "axios"

const http = axios.create({
    baseURL: "/api/",
    headers: {
        "Content-Type" : "application/json",
    }
})

let unauthorizedHandler = null

export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler
}

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (unauthorizedHandler) {
                unauthorizedHandler()
            } else {
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                localStorage.removeItem("username")
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)

export default http
