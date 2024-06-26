import { createSlice } from "@reduxjs/toolkit";
import { Instance, setToken } from "../../Config/Common";
import Cookies from "universal-cookie";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    Loading: false,
    error: null,
    trigger: false,
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
    TriggerOn(state) {
      state.trigger = true;
    },
    TriggerOff(state) {
      state.trigger = false;
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
  TriggerOn,
  TriggerOff,
} = AuthSlice.actions;
export default AuthSlice.reducer;

const cookies = new Cookies();

export const onLogin = async (dispatch, navigate, email, password) => {
  try {
    dispatch(loginStart());
    const response = await Instance.post(`/api/auth/user/logIn`, {
      email,
      password,
    });
    const { token } = response.data;
    const { id } = response.data;
    dispatch(loginSuccess(response.data));
    dispatch(TriggerOff());
    setToken(token);
    cookies.set("token-fashion", token);
    cookies.set("id", id);
    navigate("/shop");
    onReload(dispatch);
  } catch (err) {
    dispatch(loginFail(err));
    console.error(err);
  }
};

export const onReload = async (dispatch) => {
  const CookieToken = cookies.get("token-fashion");
  const LocalToken = localStorage.getItem("token");
  dispatch(loginStart());
  try {
    const response = await Instance.get("/api/auth/user/getme", {
      headers: { "x-auth-token": CookieToken || LocalToken },
    });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail(error));
    console.error(error);
  }
};
