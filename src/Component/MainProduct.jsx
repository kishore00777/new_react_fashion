import { ProductsFromSlice } from "../Store/Reducer/ProductSlice";
import ProductCard from "./ProductCard";
import { Grid, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "@fontsource/poppins";
import { useLocation } from "react-router-dom";

export default function MainProduct() {
  const product = useSelector(ProductsFromSlice);

  const router = useLocation();
  const path = router.pathname;
  return (
    <>
      <Box
        sx={{
          maxWidth: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {path === "/" && (
          <Typography
            variant="h2"
            align="center"
            sx={{ fontWeight: "700", mt: 10, width: "100%" }}
          >
            Best Seller
          </Typography>
        )}
        <br />
        <br />
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
          <ProductCard data={product} />
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    </>
  );
}
