import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://krist-web-app.vercel.app/api"
      : "http://localhost:3600/api",
});
