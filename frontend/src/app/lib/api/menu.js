import axios from "axios";

const API_BASE =
  // process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
  process.env.NEXT_PUBLIC_API_BASE;


// ✔ Fetch ALL menu items
export const apiGetAllMenu = async () => {
  const res = await axios.get(`${API_BASE}/api/menuItems`);
  return res.data;
};

// ✔ Fetch menu items by CATEGORY SLUG
export const apiGetMenuByCategory = async (slug) => {
  const res = await axios.get(
    `${API_BASE}/api/menuItems/category/${slug}`
  );
  return res.data;
};
