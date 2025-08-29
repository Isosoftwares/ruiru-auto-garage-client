import axios from "axios";

// const BASE_URL = "https://website-api.febwin.co.ke";
const BASE_URL = "http://localhost:3501/api";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
