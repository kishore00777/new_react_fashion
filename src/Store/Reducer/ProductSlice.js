import { createSlice } from "@reduxjs/toolkit";
import { product } from "../../Data/Products";

const initialState = product;

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          cart: state[index].cart === "CART" ? null : "CART",
          productCount: state[index].productCount >= 1 ? null : 1,
        };
      }
    },
    plus(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1 && state[index].cart === "CART") {
        state[index] = {
          ...state[index],
          productCount: state[index].productCount + 1,
        };
      }
    },
    minus(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1 && state[index].cart === "CART") {
        state[index] = {
          ...state[index],
          productCount: state[index].productCount - 1,
          cart: state[index].productCount === 1 ? null : "CART",
        };
      }
    },
    filterProduct(state, action) {
      const { searchQuery } = action.payload;
      return product.filter((product) =>
        product.alt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    heart(state, action) {
      const { productId } = action.payload;
      const index = state.findIndex((product) => product.id === productId);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          fav: state[index].fav === "heart" ? null : "heart",
        };
      }
    },
  },
});

export const ProductsFromSlice = (state) => state.product;
export const { addToCart, plus, minus, filterProduct, heart } =
  ProductSlice.actions;
export default ProductSlice.reducer;
