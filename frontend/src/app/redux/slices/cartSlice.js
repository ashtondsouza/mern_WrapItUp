import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";
const saved = isBrowser ? JSON.parse(localStorage.getItem("cart") || "null") : null;

const initialState = {
  items: saved || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(i => i._id === action.payload._id);

      if (existing) {
        existing.qty = (existing.qty || 1) + (action.payload.qty || 1);
      } else {
        state.items.push({
          ...action.payload,
          // 🔑 store category as slug
          category: action.payload.category?.slug || action.payload.category,
          qty: action.payload.qty || 1
        });
      }

      if (isBrowser) localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i._id !== action.payload);
      if (isBrowser) localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQty(state, action) {
      const { id, qty } = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) item.qty = qty;
      if (isBrowser) localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      if (isBrowser) localStorage.setItem("cart", JSON.stringify([]));
    },

    setCart(state, action) {
      state.items = action.payload;
      if (isBrowser) localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
