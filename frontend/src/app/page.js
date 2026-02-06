import Image from "next/image";
import styles from "./page.module.css";
import MenuPage from "./components/menu/Menu";
import OrderStatusBar from "./components/OrderStatusBar";

export default function Home() {
  return (
    <div className={styles.page}>
 <MenuPage/>
 <OrderStatusBar/>
    </div>
  );
}
