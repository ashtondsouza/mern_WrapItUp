// // src/redux/slices/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiLogin, apiRegister } from "../../lib/api/auth";

// // Thunks
// // in the login thunk
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await apiLogin(credentials); // axios response or fetch result
//       console.log("THUNK raw response:", res);
//       // if res.data exists (axios), use res.data, else use res
//       const data = res.data ? res.data : res;
//       console.log("THUNK parsed data:", data);
//       return data;
//     } catch (err) {
//       console.error("THUNK error:", err);
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await apiRegister(credentials); // axios response or fetch result
//       console.log("THUNK raw response:", res);
//       // if res.data exists (axios), use res.data, else use res
//       const data = res.data ? res.data : res;
//       console.log("THUNK parsed data:", data);
//       return data;
//     } catch (err) {
//       console.error("THUNK error:", err);
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       const res = await apiRegister(payload);
// //       return res.data;
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data || { message: err.message });
// //     }
// //   }
// // );

// export const fetchUserProfile = createAsyncThunk(
//   "auth/fetchUserProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await apiGetProfile();
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// // initial state
// const initialState = {
//   user: null,
//   token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
//   loading: false,
//   error: null,
//   success: false,
//   isAuthOpen: false,
//     redirectTo: null, 
// };



// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       state.success = false;
//       if (typeof window !== "undefined") localStorage.removeItem("token");
//     },
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//      openAuthModal(state, action) {
//   state.isAuthOpen = true;
//   state.redirectTo = action.payload?.redirectTo || null;
// },
//     closeAuthModal(state) {
//       state.isAuthOpen = false;
//        state.redirectTo = null;
//     }
//   },
//   extraReducers: (builder) => {
//     // login
//     builder.addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; s.success = false; });
//   builder.addCase(loginUser.fulfilled, (s, a) => {
//   s.loading = false;

//   const data = a.payload || {};

//   s.user = data.user ?? null;
//   s.token = data.token ?? null;
//   s.success = true;

//   if (typeof window !== "undefined" && data.token) {
//     localStorage.setItem("token", data.token);
//   }
// });

//     builder.addCase(loginUser.rejected, (s, a) => {
//       s.loading = false;
//       s.error = a.payload?.message || a.error?.message || "Login failed";
//       s.success = false;
//     });

//     // register
//     builder.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; s.success = false; });
//     builder.addCase(registerUser.fulfilled, (s, a) => {
//   s.loading = false;

//   const data = a.payload || {};   // ✅ prevents crash

//   s.user = data.user || null;
//   s.token = data.token || null;
//   s.success = true;

//   if (typeof window !== "undefined" && data.token) {
//     localStorage.setItem("token", data.token);
//   }
// });
//     builder.addCase(registerUser.rejected, (s, a) => {
//       s.loading = false;
//       s.error = a.payload?.message || a.error?.message || "Registration failed";
//       s.success = false;
//     });
//    builder.addCase(fetchUserProfile.fulfilled, (s, a) => {
//   s.user = a.payload.user || null;
//   s.token = localStorage.getItem("token");
// });

//   }
// });

// export const { logout, setUser,openAuthModal, closeAuthModal, } = authSlice.actions;
// export default authSlice.reducer;




// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiRegister } from "../../lib/api/auth";
import { getAllOrders } from "./orderSlice";
// =======================
// THUNKS
// =======================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiLogin(credentials);
      const data = res.data ? res.data : res;

      // ✅ fetch orders immediately after login
      dispatch(getAllOrders());

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiRegister(credentials);
      const data = res.data ? res.data : res;
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// =======================
// INITIAL STATE
// =======================

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,

   authReady: false, // 🔑 ADD THIS

  isAuthOpen: false,
  redirectTo: null,
};

// =======================
// SLICE
// =======================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔑 Load auth on refresh
    loadAuthFromStorage(state) {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        state.user = parsed.user || null;
        state.token = parsed.token || null;
      }
    },

    // 🚪 Logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = false;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    openAuthModal(state, action) {
      state.isAuthOpen = true;
      state.redirectTo = action.payload?.redirectTo || null;
    },

    closeAuthModal(state) {
      state.isAuthOpen = false;
      state.redirectTo = null;
    },
  },

  extraReducers: (builder) => {
    // =======================
    // LOGIN
    // =======================
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const data = action.payload || {};

      state.user = data.user || null;
      state.token = data.token || null;
      state.success = true;

      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Login failed";
      state.success = false;
    });

    // =======================
    // REGISTER
    // =======================
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;

      const data = action.payload || {};

      state.user = data.user || null;
      state.token = data.token || null;
      state.success = true;

      if (typeof window !== "undefined" && data.token) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message ||
        action.error?.message ||
        "Registration failed";
      state.success = false;
    });
  },
});

// =======================
// EXPORTS
// =======================

export const {
  logout,
  setUser,
  openAuthModal,
  closeAuthModal,
  loadAuthFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiLogin, apiRegister } from "../../lib/api/auth";
// import { setAuthToken } from "../../lib/api/axios";

// // =======================
// // THUNKS
// // =======================
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await apiLogin(credentials);
//       return res.data ?? res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const res = await apiRegister(credentials);
//       return res.data ?? res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: err.message });
//     }
//   }
// );

// // =======================
// // INITIAL STATE
// // =======================
// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
//   success: false,
//   authLoaded: false, // ✅ new flag
//   isAuthOpen: false,
//   redirectTo: null,
// };

// // =======================
// // SLICE
// // =======================
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // 🔐 Load auth on refresh
//     loadAuthFromStorage(state) {
//       if (typeof window === "undefined") return;

//       const token = localStorage.getItem("token");
//       const user = localStorage.getItem("user");

//       if (token && user) {
//         try {
//           const parsedUser = JSON.parse(user);
//           if (parsedUser && parsedUser.role) {
//             state.token = token;
//             state.user = parsedUser;
//           } else {
//             // invalid user object in storage
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             state.token = null;
//             state.user = null;
//           }
//         } catch {
//           // corrupted data
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           state.token = null;
//           state.user = null;
//         }
//       }
//       state.authLoaded = true; // ✅ mark auth as loaded
//     },

//     // 🚪 Logout
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       state.success = false;
//       state.authLoaded = false;

//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//        setAuthToken(null);
//     },

//     openAuthModal(state, action) {
//       state.isAuthOpen = true;
//       state.redirectTo = action.payload?.redirectTo || null;
//     },

//     closeAuthModal(state) {
//       state.isAuthOpen = false;
//       state.redirectTo = null;
//     },
//   },

//   extraReducers: (builder) => {
//     // =======================
//     // LOGIN
//     // =======================
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         const data = action.payload || {};
//         state.loading = false;
//         state.user = data.user || null;
//         state.token = data.token || null;
//         state.success = true;
//         state.authLoaded = true;

    
//         if (data.token && data.user) {
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));
//              setAuthToken(data.token);
//         }
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload?.message ||
//           action.error?.message ||
//           "Login failed";
//         state.authLoaded = true;
//       });

//     // =======================
//     // REGISTER
//     // =======================
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         const data = action.payload || {};
//         state.loading = false;
//         state.user = data.user || null;
//         state.token = data.token || null;
//         state.success = true;
//         state.authLoaded = true;

//         if (data.token && data.user) {
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("user", JSON.stringify(data.user));
//         }
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           action.payload?.message ||
//           action.error?.message ||
//           "Registration failed";
//         state.authLoaded = true;
//       });
//   },
// });

// export const { logout, openAuthModal, closeAuthModal, loadAuthFromStorage } =
//   authSlice.actions;

// export default authSlice.reducer;
