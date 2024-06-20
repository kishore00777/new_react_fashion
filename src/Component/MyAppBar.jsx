import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function MyAppBar() {
  return (
    <>
      <AppBar sx={{ bgcolor: "black", position: "sticky" }}>
        <Toolbar
          sx={{
            padding: 1,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: "35px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Fashion
                <Typography
                  sx={{
                    color: "#ff36ab",
                    fontWeight: "700",
                    fontSize: "40px",
                  }}
                >
                  .
                </Typography>
              </Link>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  About
                </Link>
                {/* <Link
                  to="/addproduct"
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  Add Product
                </Link> */}
                <Link
                  to="/logIn"
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  {/* <Avatar sx={{ bgcolor: "#ff36ab" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                      F
                    </Typography>
                  </Avatar> */}
                  <Button sx={{ color: "#ff36ab" }}>Login</Button>
                </Link>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
