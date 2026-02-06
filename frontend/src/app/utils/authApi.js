// src/lib/api/auth.js
import API from "@/utils/axiosInstance";

// backend endpoints: POST /api/auth/register and POST /api/auth/login
export const apiRegister = (payload) => API.post("/auth/register", payload);
export const apiLogin = (payload) => API.post("/auth/login", payload);
