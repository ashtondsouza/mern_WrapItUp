// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   apiCreateOrder,
//   apiGetMyOrders,
//   apiGetAllOrders,
//   apiUpdateOrderStatus,
// } from "../../lib/api/order";

// /* =======================
//    THUNKS
// ======================= */

// // 🧾 Create order (USER)
// export const createOrder = createAsyncThunk(
//   "order/create",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const res = await apiCreateOrder(orderData);
//       return res.data || res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 👤 Get logged-in user's orders
// export const getMyOrders = createAsyncThunk(
//   "order/myOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await apiGetMyOrders();
//       return res.data || res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 👨‍🍳 Staff/Admin — get all orders
// export const getAllOrders = createAsyncThunk(
//   "order/allOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await apiGetAllOrders();
//       return res.data || res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔄 Update order status (STAFF / ADMIN)
// export const updateOrderStatus = createAsyncThunk(
//   "order/updateStatus",
//   async ({ orderId, status }, { rejectWithValue }) => {
//     try {
//       const res = await apiUpdateOrderStatus(orderId, status);
//       return res.data || res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// /* =======================
//    SLICE
// ======================= */

// const orderSlice = createSlice({
//   name: "order",
//   initialState: {
//     orders: [],
//     currentOrder: null,
//     loading: false,
//     error: null,
//     success: false,
//   },

//   reducers: {
//     clearOrderState(state) {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // CREATE ORDER
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrder = action.payload;
//         state.success = true;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // MY ORDERS
//       .addCase(getMyOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getMyOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(getMyOrders.rejected, (state, action) => {
//   state.loading = false;
//   state.error =
//     typeof action.payload === "string"
//       ? action.payload
//       : action.payload?.message;
// })


//       // ALL ORDERS (STAFF / ADMIN)
//       .addCase(getAllOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(getAllOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // UPDATE STATUS
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         const updated = action.payload;
//         state.orders = state.orders.map((order) =>
//           order._id === updated._id ? updated : order
//         );
//       });
//   },
// });

// export const { clearOrderState } = orderSlice.actions;
// export default orderSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateOrder,
  apiGetMyOrders,
  apiGetAllOrders,
  apiUpdateOrderStatus,
} from "../../lib/api/order";

/* =======================
   THUNKS
======================= */

// 🧾 Create order (USER)
export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await apiCreateOrder(orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 👤 Get logged-in user's orders
export const getMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetMyOrders();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 👨‍🍳 Staff/Admin — get all orders
export const getAllOrders = createAsyncThunk(
  "order/allOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetAllOrders();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔄 Update order status (STAFF / ADMIN)
export const updateOrderStatus = createAsyncThunk(
  "order/updateStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await apiUpdateOrderStatus(orderId, status);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearOrderState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // MY ORDERS
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message;
      })

      // ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updated._id ? updated : order
        );
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
