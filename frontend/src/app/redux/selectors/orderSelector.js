// redux/selectors/orderSelectors.js
export const selectActiveOrder = (orders) =>
  orders.find((o) =>
    ["PENDING", "PREPARING", "READY", "COMPLETED"].includes(o.status)
  );
