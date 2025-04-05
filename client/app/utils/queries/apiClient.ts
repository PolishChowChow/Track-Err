import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://192.168.251.55:3000",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
})

export default apiClient;