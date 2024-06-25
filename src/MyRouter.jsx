import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyAppBar from "./Component/MyAppBar";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import AddProduct from "./pages/Admin/AddProduct";
import ShippingPolicy from "./pages/ShippingPolicy";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import { Instance } from "./Config/Common";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginStart, loginSuccess } from "./Store/Reducer/AuthSlice";
import Admin from "./pages/Admin";
import ViewProducts from "./pages/Admin/ViewProducts";
import Loading from "./Component/Loading";
import Cart from "./pages/Cart";
import TriggerModal from "./Component/Auth/TriggerModal";

export default function MyRouter() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuth);

  const cookies = new Cookies();
  const CookieToken = cookies.get("token-fashion");
  const mail = cookies.get("email-fashion");
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
    if (CookieToken || LocalToken) {
      onReload();
    }
  }, []);

  useEffect(() => {
    function updateOnlineStatus() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <BrowserRouter>
      <TriggerModal />
      {!isOnline ? (
        <Loading />
      ) : (
        <>
          <MyAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!auth ? <SignUp /> : <Navigate to={"/"} />}
            />
            <Route path="/shippingPolicy" element={<ShippingPolicy />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/termsAndConditions" element={<Terms />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route
              path="/cancellationPolicy"
              element={<CancellationPolicy />}
            />
            <Route
              path="/admin"
              element={
                mail === "kishoremurgan0077@gmail.com" ? (
                  <Admin />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            >
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="viewproduct" element={<ViewProducts />} />
            </Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
