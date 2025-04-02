import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://192.168.0.114:3000",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
})

export default apiClient;