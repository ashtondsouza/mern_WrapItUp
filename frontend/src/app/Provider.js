// "use client";

// import { Provider } from "react-redux";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import store from "./redux/store";
// import { loadAuthFromStorage } from "./redux/slices/authSlice";

// function AuthBootstrap() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadAuthFromStorage());
//   }, [dispatch]);

//   return null;
// }

// export default function ReduxProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <AuthBootstrap />
//       {children}
//     </Provider>
//   );
// }
"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import store from "./redux/store";
import { loadAuthFromStorage } from "./redux/slices/authSlice";
import { getAllOrders, getMyOrders } from "./redux/slices/orderSlice";
function Bootstrap() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // 🔐 Load auth once
  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  // 📦 Load data ONLY when auth is fully ready
  useEffect(() => {
    if (!user || !token) return;

    if (user.role === "admin" || user.role === "staff") {
      dispatch(getAllOrders());
    } else if (user.role === "customer") {
      dispatch(getMyOrders());
    }
  }, [user, token, dispatch]);

  return null;
}
export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <Bootstrap />
      {children}
    </Provider>
  );
}
