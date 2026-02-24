import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.response.use(
  (response) => {
    console.log(`response...`);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
