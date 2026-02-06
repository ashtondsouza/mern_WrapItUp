// frontend/src/lib/api/auth.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔑 Get logged-in user using token

export const apiGetProfile = () => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return axios.get(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Register
export const apiRegister = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

// Login
export const apiLogin = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};
