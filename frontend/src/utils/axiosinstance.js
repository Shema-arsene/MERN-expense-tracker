import axios from "axios"
import { BASE_URL, API_PATHS } from "./apiPaths"

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request interceptor
axiosinstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosinstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // redirect to login page
        window.location.href = "/login"
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.")
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again")
    }

    return Promise.reject(error)
  }
)

export default axiosinstance
