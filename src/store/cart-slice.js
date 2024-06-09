import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 1,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((iteem) => iteem.id == newItem.id);
      console.log("NewItem 13", newItem, state.items, action);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        state.totalQuantity++;
        state.totalAmount = newItem.price + state.totalAmount;
        console.log("24", state.items);
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice = newItem.price + existingItem.totalPrice;
        state.totalQuantity++;
        state.totalAmount = newItem.price + state.totalAmount;
        console.log(
          "28",
          state.items,
          existingItem.quantity,
          existingItem.totalPrice
        );
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      console.log("AT REMOV ITEM", action.payload, state.items, existingItem);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});
export const cartSliceActions = cartSlice.actions;
export default cartSlice;
