import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    count: null,
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    AddtoCart(state) {
      state.loading = true;
      state.error = null;
    },
    AddedtoCart(state) {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    FailedtoAdd(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getTotalCount(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchedTotalCount(state, action) {
      state.loading = false;
      state.error = null;
      state.count = action.payload;
    },
    failedtogetTotalCount(state, action) {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const {
  AddedtoCart,
  AddtoCart,
  FailedtoAdd,
  getTotalCount,
  fetchedTotalCount,
  failedtogetTotalCount,
} = CartSlice.actions;

export default CartSlice.reducer;
