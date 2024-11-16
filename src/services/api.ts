import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTenants = async () => {
    const response = await api.get("/tenants");
    return response.data;
  };

  export const removeTenant = async (id) => {
    const response = await api.delete(`/tenants/${id}`);
    return response.data;
  };

export const fetchDelinquencyReport = async () => {
    const response = await api.get("/tenants/delinquencyReport");
    return response.data;
  };

export default api;