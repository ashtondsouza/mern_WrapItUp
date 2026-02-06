"use client";
import styles from "./MenuGrid.module.css";

export default function MenuGrid({ items, onAdd }) {

    console.log("Menu items received:", items);  
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item._id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={item.image} alt={item.name} className={styles.image} />
          </div>

          <h4 className={styles.name}>{item.name}</h4>
          <p className={styles.desc}>{item.description}</p>

          <div className={styles.bottomRow}>
            <span className={styles.price}>₹{item.price}</span>
            <button className={styles.addBtn} onClick={() => onAdd(item)}>
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
