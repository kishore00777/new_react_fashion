import ProductCard from "./ProductCard";
import { Grid, Box, Typography } from "@mui/material";
import "@fontsource/poppins";
import { useLocation } from "react-router-dom";
import { Instance } from "../Config/Common";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function MainProduct() {
  const router = useLocation();
  const path = router.pathname;

  const [data, setData] = useState([]);
  const [load, setLoad] = useState([]);

  const getProduct = async () => {
    try {
      setLoad(true);
      const response = await Instance.get("/api/products/getAllProducts");
      setData(response.data);
      console.log(response.data.map((i) => i.images[0]));
      if (response.status === 200) {
        setLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Box
        sx={{
          maxWidth: "90%",
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
        {load ? (
          <Loading />
        ) : (
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductCard data={data} />
          </Grid>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Box>
    </>
  );
}
