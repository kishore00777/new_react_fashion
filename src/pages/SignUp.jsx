import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Instance, setToken } from "../Config/Common";
import { useDispatch } from "react-redux";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../Store/Reducer/AuthSlice";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [check, setCheck] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const Signup = async () => {
    dispatch(loginStart());
    try {
      const response = await Instance.post(`/api/auth/user/signUp`, {
        userName: data.userName,
        email: data.email,
        password: data.password,
      });
      const { token } = response.data;
      const { id } = response.data;
      dispatch(loginSuccess(response.data));
      setToken(token);
      cookies.set("token-fashion", token);
      cookies.set("id", id);
      localStorage.setItem(check && "token", token);
      navigate("/shop");
      setData({
        userName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      dispatch(loginFail(err));
      console.error(err);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  value={data.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  value={data.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="userNmae"
                  label="User Name"
                  name="userName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={data.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={data.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check}
                      value="allowExtraEmails"
                      color="primary"
                      onChange={(e) => setCheck(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                Signup();
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
