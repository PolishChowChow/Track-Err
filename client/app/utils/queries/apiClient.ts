import axios from "axios";
import Constants from "expo-constants";
const { API_URL_LOCAL, API_URL_REMOTE, LOC } =
  Constants.expoConfig?.extra ?? {};

const apiClient = axios.create({
  baseURL: LOC === "local" ? API_URL_LOCAL : API_URL_REMOTE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default apiClient;
