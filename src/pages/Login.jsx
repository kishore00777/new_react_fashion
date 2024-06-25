import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Instance, setToken } from "../Config/Common";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../Store/Reducer/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login() {
  const [data, setData] = useState({
    mail: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const onLogin = async () => {
    try {
      dispatch(loginStart());
      const response = await Instance.post(`/api/auth/user/logIn`, {
        email: data.mail,
        password: data.Password,
      });
      const { token } = response.data;
      const { id } = response.data;
      const { email } = response.data;
      dispatch(loginSuccess(response.data));
      setToken(token);
      cookies.set("token-fashion", token);
      cookies.set("email-fashion", email);
      cookies.set("id", id);
      navigate("/shop");
    } catch (err) {
      dispatch(loginFail(err));
      console.error(err);
    }
  };
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="mail"
              autoComplete="email"
              autoFocus
              value={data.mail}
              onChange={HandleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.Password}
              onChange={HandleChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                onLogin();
              }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
