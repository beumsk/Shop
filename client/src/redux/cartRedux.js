import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let added = false;
      state.products.forEach((p) => {
        if (
          p._id === action.payload._id &&
          p.size === action.payload.size &&
          p.color === action.payload.color
        ) {
          p.quantity += action.payload.quantity;
          added = true;
        }
      });
      if (!added) {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.total -= state.products[action.payload.index].price;
      state.products.splice(action.payload.index, 1);
    },
    updateProductInc: (state, action) => {
      state.products[action.payload.index].quantity += 1;
      state.total += state.products[action.payload.index].price;
    },
    updateProductDec: (state, action) => {
      state.products[action.payload.index].quantity -= 1;
      state.total -= state.products[action.payload.index].price;
    },
    emptyCart: (state) => {
      state.products.length = 0;
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProductInc,
  updateProductDec,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
