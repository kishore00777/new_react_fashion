import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Reducer/ProductSlice";
import AuthSlice from "./Reducer/AuthSlice";
import CartSlice from "./Reducer/CartSlice";
// import ProductReducer from "./Reducers/ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    auth: AuthSlice,
    cart: CartSlice,
  },
});
