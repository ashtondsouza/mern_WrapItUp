import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

// ✔ Get all categories
export const getCategories = async () => {
  const res = await axios.get(`${API_BASE}/api/categories`);
  return res.data;
};

// ✔ (Optional) Get category by slug
export const getCategoryBySlug = async (slug) => {
  const res = await axios.get(
    `${API_BASE}/api/categories/${slug}`
  );
  return res.data;
};
