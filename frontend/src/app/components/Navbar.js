// "use client";
// import Link from "next/link";
// import styles from "./Navbar.module.css";
// import { useState } from "react";
// import AuthModal from "./AuthModel"; // ✅ make sure this exists

// const Navbar = () => {
//   const [showAuth, setShowAuth] = useState(false);

//   return (
//     <>
//     <nav className={styles.navbar}>
//       {/* ✅ Logo Section */}
//       <div className={styles.logoSection}>
//         <img src="/Logo.svg" alt="WrapItUp Logo" className={styles.logo} />
//         <h1 className={styles.brand}>
//           Wrap<span className={styles.second}>it</span>
//           <span className={styles.third}>up</span>
//         </h1>
//       </div>

//       {/* ✅ Nav Links */}
//       <div className={styles.links}>
//         <Link href="/">Home</Link>
//         <Link href="/menu">Menu</Link>

//         {/* ❌ Don’t wrap button with Link */}
//         {/* ✅ Use button separately, since it opens modal */}
//         <button
//           className={styles.authBtn}
//           onClick={() => setShowAuth(true)}
//         >
//           Login
//         </button>
//       </div>

    
//     </nav>
//       {/* ✅ Modal should not be inside Link or .links div */}
//       {showAuth && (
//     <AuthModal onClose={() => setShowAuth(false)} />
//   )}
//     </>
//   );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, openAuthModal } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src="/Logo.svg" alt="Logo" className={styles.logo} />
        <h1 className={styles.brand}>
          Wrap<span className={styles.second}>it</span>
          <span className={styles.third}>up</span>
        </h1>
      </div>

      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>

        {/* Logged in → Logout */}
        {user ? (
          <>
            <span className={styles.welcome}>
              Hi, {user.name?.split(" ")[0] || "User"}
            </span>

            <button className={styles.authBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // Not logged in → Login button
          <button
            className={styles.authBtn}
            onClick={() => dispatch(openAuthModal())}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
