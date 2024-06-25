import React, { useEffect } from "react";
import SideBar from "../../Component/Admin/SideBar";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../../Store/Reducer/AuthSlice";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { Instance } from "../../Config/Common";
import { useLocation, useNavigate } from "react-router-dom";

export default function Admin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const CookieToken = cookies.get("token-fashion");
  const LocalToken = localStorage.getItem("token");
  const onReload = async () => {
    dispatch(loginStart());
    try {
      const response = await Instance.get("/api/auth/user/getme", {
        headers: { "x-auth-token": CookieToken || LocalToken },
      });
      dispatch(loginSuccess(response.data));
      navigate("/admin/addproduct");
    } catch (error) {
      dispatch(loginFail(error));
      console.error(error);
    }
  };

  useEffect(() => {
    onReload();
  }, []);
  return (
    <>
      <SideBar />
    </>
  );
}
