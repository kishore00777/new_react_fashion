import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    Loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.Loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.Loading = false;
      state.isAuth = true;
    },
    loginFail(state, action) {
      state.Loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.Loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.Loading = false;
      state.isAuth = false;
    },
    logoutFail(state, action) {
      state.Loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = AuthSlice.actions;
export default AuthSlice.reducer;
