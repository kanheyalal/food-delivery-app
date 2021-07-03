import { createSlice } from "@reduxjs/toolkit";

const cartItems = createSlice({
  name: "cartItems",
  initialState: {
    items: [], 
    totalQuantiy: 0,
    totalAmount: 0,
  },
  reducers: {
    setCartItem(state, action) {
      const items = action.payload.items;
      const totalAmount = action.payload.totalAmount;
      state.items = items;
      state.totalQuantiy = state.items.length;
      state.totalAmount = totalAmount;
    },
    removeCartItem(state, action) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantiy = 0;
    }
  },
});

export const cartActions = cartItems.actions;
export default cartItems;
