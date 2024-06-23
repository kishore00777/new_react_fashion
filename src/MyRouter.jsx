import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyAppBar from "./Component/MyAppBar";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import AddProduct from "./Component/Admin/AddProduct";
import ShippingPolicy from "./pages/ShippingPolicy";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import Footer from "./Component/Footer";
import { Instance } from "./Config/Common";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "./Store/Reducer/AuthSlice";

export default function MyRouter() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const auth = useSelector((state) => state.auth.isAuth);

  const NoAuth = ({ children }) => {
    return auth ? <Navigate to={"/shop"} /> : children;
  };

  const CookieToken = cookies.get("token-fashion");
  const LocalToken = localStorage.getItem("token");

  const onReload = async () => {
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

  useEffect(() => {
    onReload();
  }, []);

  return (
    <BrowserRouter>
      <MyAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route
          path="/login"
          element={
            <NoAuth>
              <Login />
            </NoAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <NoAuth>
              <SignUp />
            </NoAuth>
          }
        />
        <Route path="/shippingPolicy" element={<ShippingPolicy />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/termsAndConditions" element={<Terms />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/cancellationPolicy" element={<CancellationPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
