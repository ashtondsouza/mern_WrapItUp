
"use client";

import { useState } from "react";
import styles from "./AuthModel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser,closeAuthModal } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthOpen, loading, error, redirectTo } = useSelector(
  (s) => s.auth
);


    if (!isAuthOpen) return null;

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      // LOGIN OR REGISTER
      if (isLogin) {
        result = await dispatch(loginUser({ email, password }));
      } else {
        if (!name.trim()) return alert("Please enter your full name");
        result = await dispatch(registerUser({ name, email, password }));
      }

      if (!result.type.endsWith("fulfilled")) {
        alert(result.payload?.message || "Something went wrong");
        return;
      }

const payload = result.payload || {};
const role = payload.user?.role || "customer";

// 🔑 PRIORITY 1: admin / staff dashboards
if (role === "admin") {
  await router.push("/dashboard/admin");
} else if (role === "staff") {
  await router.push("/staff/orders");
}
// 🔑 PRIORITY 2: return user to previous page
else if (redirectTo) {
  await router.push(redirectTo);
}
// 🔑 FALLBACK
else {
  await router.push("/");
}


      // Close modal AFTER routing is finished
       dispatch(closeAuthModal());
        // onClose?.();
        resetForm();
      

    } catch (err) {
      console.error(err);
      alert("Unexpected error, try again.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
  className={styles.closeBtn}
  onClick={() => dispatch(closeAuthModal())}
>
  ✕
</button>

{/* 🔐 Demo / Staff Login Info */}
{isLogin && (
  <div className={styles.loginInfoBox}>
    <p className={styles.infoTitle}>Quick Login</p>


    <div
  className={styles.infoRow}
  onClick={() => {
    setEmail("ardy20@gmail.com");
    setPassword("123456789");
  }}
>
  <span>👤 Customer:</span>
  <code> ardy20@gmail.com / 123456789 </code>
</div>


    <div
  className={styles.infoRow}
  onClick={() => {
    setEmail("ryan@gmail.com");
    setPassword("admin1234");
  }}
>
  <span>👨‍🍳 Staff:</span>
  <code>ryan@gmail.com / admin1234</code>
</div>



<div
  className={styles.infoRow}
  onClick={() => {
    setEmail("andrea@gmail.com");
    setPassword("admin123");
  }}
>
  <span>🤴 Admin:</span>
  <code> andrea@gmail.com / admin123 </code>
</div>
   

    <p className={styles.infoNote}>
      Use pre-registered IDs to explore dashboards.
    </p>
  </div>
)}


        <h2>{isLogin ? "Login" : "Create an account"}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
              ? "Login"
              : "Sign up"}
          </button>

          {error && <div className={styles.error}>{error.message || error}</div>}
        </form>

        <p className={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className={styles.toggle}
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

