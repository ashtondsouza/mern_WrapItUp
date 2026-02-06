"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  selectCartItems,
  selectCartTotalQty,
  selectCartTotalPrice,
} from "../redux/selectors/cartSelector";

import {
  removeFromCart,
  updateQty,
  clearCart,
} from "../redux/slices/cartSlice";

import styles from "./cartPage.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector(selectCartItems);
  const totalQty = useSelector(selectCartTotalQty);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQty({ id, qty }));
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Cart</h2>

      <div className={styles.list}>
        {items.map((item) => (
          <div key={item._id} className={styles.item}>
            <img src={item.image} alt={item.name} />

            <div className={styles.info}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              <div className={styles.qtyRow}>
                <button
                  onClick={() =>
                    handleQtyChange(item._id, item.qty - 1)
                  }
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() =>
                    handleQtyChange(item._id, item.qty + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={styles.remove}
              onClick={() => dispatch(removeFromCart(item._id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <p>
          Total Items: <strong>{totalQty}</strong>
        </p>
        <p>
          Total Price: <strong>₹{totalPrice}</strong>
        </p>

        <button
          className={styles.checkoutBtn}
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>

        <button
          className={styles.clearBtn}
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
