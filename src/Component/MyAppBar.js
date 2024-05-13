import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function MyAppBar() {
  return (
    <>
      <AppBar  sx={{ bgcolor: "black", position: "sticky" }}>
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
                  fontSize: "30px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Fashion
                <Typography
                  sx={{ color: "pink", fontWeight: "700", fontSize: "30px" }}
                >
                  .
                </Typography>
              </Link>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Link
                  to="/"
                  style={{
                    color: "white",
                    fontWeight: "500",
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
                    fontWeight: "500",
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
                    fontWeight: "500",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                >
                  About
                </Link>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
