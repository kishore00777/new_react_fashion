import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Reducer/ProductSlice";
import AuthSlice from "./Reducer/AuthSlice";
// import ProductReducer from "./Reducers/ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    auth: AuthSlice,
  },
});
