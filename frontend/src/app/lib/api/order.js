// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach token
// API.interceptors.request.use((req) => {
//   const auth = localStorage.getItem("auth");
//   if (auth) {
//     const { token } = JSON.parse(auth);
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return req;
// });

// // 🧾 Create order (User/Admin)
// export const apiCreateOrder = (data) =>
//   API.post("/orders", data);

// // 👤 Get my orders (User/Admin)
// export const apiGetMyOrders = () =>
//   API.get("/orders/my");

// // 👨‍🍳 Get all orders (Staff/Admin)
// export const apiGetAllOrders = () =>
//   API.get("/orders");

// // 🔄 Update order status (Staff/Admin)
// export const apiUpdateOrderStatus = (id, status) =>
//   API.put(`/orders/${id}/status`, { status });

// export default API;

import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
// 🔐 Attach token safely (NO race condition)
API.interceptors.request.use(
  (req) => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth");

      if (auth) {
        try {
          const parsed = JSON.parse(auth);
          if (parsed?.token) {
            req.headers.Authorization = `Bearer ${parsed.token}`;
          }
        } catch (err) {
          console.error("Invalid auth in storage");
        }
      }
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// 🧾 Create order (User/Admin)
export const apiCreateOrder = (data) =>
  API.post("/orders", data);

// 👤 Get my orders (User/Admin)
export const apiGetMyOrders = () =>
  API.get("/orders/my");

// 👨‍🍳 Get all orders (Staff/Admin)
export const apiGetAllOrders = () =>
  API.get("/orders");

// 🔄 Update order status (Staff/Admin)
export const apiUpdateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, { status });

export default API;
