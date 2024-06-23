import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token-fashion");

export const setToken = (token) => {
  if (token) {
    Instance.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete Instance.defaults.headers.common["x-auth-token"];
  }
};

export const baseurl = "https://new-fashion-backend.onrender.com";
// export const baseurl = "http://localhost:9999";

export const Instance = axios.create({
  baseURL: baseurl,
  headers: { "x-auth-token": token },
});
