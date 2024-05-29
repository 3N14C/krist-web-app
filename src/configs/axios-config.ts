import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://boss-web-app.vercel.app/api"
      : "http://localhost:3600/api",
});
