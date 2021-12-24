import axios from "axios";

/**
 * Axios instance for application use
 */
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL
})
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axiosInstance
