export const selectCartItems = state =>
  state.cart?.items || [];

export const selectCartTotalQty = state =>
   state.cart?.items?.reduce((sum, item) => sum + item.qty, 0) ?? 0;

export const selectCartTotalPrice = state =>
  state.cart?.items?.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  ) || 0;
