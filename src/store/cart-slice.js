import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
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

// Note:- Here the learning is we cant make any side effect work inside our reducers and making
//an api call is one of that because our reducers should be pure function , means it should
// return same output on same input and that will easy for testing too. Reducers are meant to be predictable , making api calls
// introduces asynchronous behaviour which can lead to unpredictable state changes. Reducers
// are time consuming making call inside reducers can make delay of state changes. Since reducers
// call frequently during state updates , making api call within them can lead to inconsistent state results

// Now we have two options to make that call 1.) Inside the components (e.g useEffect()) ,
// 2.) inside the action creators.

//We should not update state when using useselector because useselector responsibility to only
// read the state , 2. redux follows the unidirectional data flow. It is necessary to maintain
// predcitability of changes and maintainability of it.

// we also have option to get hold on state using useSelector make a copy of that object then
// without mutating the state we can make changes to copy of state and then define a reducer which will
// update this copy of state with the pre-existing state

// We would always have these option where to keep our major changes inside , 1.) inside fat components
// 2.) fat reducers , 3.) fat actions

// Synchronous and side-effect free code should go inside reducers instead of action creators or components.
// Async code or code with side effects prefer action creators or components , never use reducers

//Thunk is a function that delays an action until later. An action creator function that does not
// return the action but a function which will return the action. THis is action {type:"" , payload:""}
//which redux toolkit in action creators automatically creates for us.
