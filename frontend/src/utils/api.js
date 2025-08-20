import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL.endsWith("/")
  ? import.meta.env.VITE_BACKEND_API_URL
  : import.meta.env.VITE_BACKEND_API_URL + "/";

export const getUsers = () => axios.get(`${API_URL}api/users`);
