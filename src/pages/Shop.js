import { Grid } from "@mui/material";
import MainProduct from "../Component/MainProduct";

export default function Shop() {
  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <MainProduct />
    </Grid>
  );
}
