import { Box, Grid } from "@mui/material";
import React from "react";
import Brand from "../Component/Home/Brand";
import DealoftheDay from "../Component/Home/DealoftheDay";
import BestSeller from "../Component/Home/BestSeller";
import MainProduct from "../Component/MainProduct";
import Footer from "../Component/Home/Footer";

export default function Home() {
  return (
    <>
      <Brand />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          bgcolor: "#F1F2F4",
        }}
      >
        <br />
        <DealoftheDay />
        <br />
      </Box>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <MainProduct />
      </Grid>
      <Footer />
    </>
  );
}
