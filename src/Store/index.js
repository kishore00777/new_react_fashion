import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Reducer/ProductSlice";
// import ProductReducer from "./Reducers/ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
  },
});
