import {
  Paper,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Instance, imageUrl } from "../Config/Common";
import { useDispatch, useSelector } from "react-redux";
import {
  AddedtoCart,
  AddtoCart,
  FailedtoAdd,
} from "../Store/Reducer/CartSlice";
import { ProtectAuth, TriggerOn } from "../Store/Reducer/AuthSlice";
import TriggerModal from "./Auth/TriggerModal";

export default function ProductCard({ data }) {
  const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePush = (brand, title, id) => {
    navigate(`/product?brand=${brand}&title=${title}&id=${id}`);
  };

  const offer = (price, actualPrice) => {
    return Math.round(((actualPrice - price) / actualPrice) * 100);
  };

  const userId = useSelector((state) => state.auth.user?.id);
  const auth = useSelector((state) => state.auth.isAuth);

  const AddProductToCart = async (id) => {
    if (!auth) {
      dispatch(TriggerOn());
      return;
    }
    dispatch(AddtoCart());
    try {
      const response = await Instance.post(`/api/bag/add/${userId}/${id}`, {
        count: 1,
      });
      dispatch(AddedtoCart());
      console.log(response.data);
    } catch (error) {
      console.error(error);
      dispatch(FailedtoAdd(error.toString()));
    }
  };

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => {
          setOpenSnack(false);
        }}
        message="Added to Cart Successfully"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setOpenSnack(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <>
        {data?.map((i) => (
          <>
            <Paper
              key={i._id}
              variant="outlined"
              sx={{
                minWidth: 300,
                height: 420,
                borderColor: "white",
                overflow: "hidden",
                // p: 2,
                margin: 2,
                position: "relative",
              }}
            >
              <Box sx={{}}>
                <img
                  src={`${imageUrl}/${i.images[0]}`}
                  alt={i.title}
                  width={300}
                  height={300}
                  priority
                  onClick={() => handlePush(i.brand, i.title, i._id)}
                  style={{ cursor: "pointer" }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <IconButton
                  // onClick={() => {
                  //   dispatch(heart({ productId: i.id }));
                  // }}
                  // sx={{
                  //   color:
                  //     i.fav === "heart" ? "#FF3040" : "rgb(157,158,157,0.5)",
                  // }}
                  >
                    <FavoriteRoundedIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Box>
              </Box>
              {/* <br /> */}
              <Box
                sx={{ cursor: "pointer", padding: "0 5px" }}
                onClick={() => handlePush(i.brand, i.title, i._id)}
              >
                <Typography
                  align="left"
                  sx={{ fontSize: "15px", fontWeight: "500" }}
                >
                  {i.title.length > 35
                    ? `${i.title.substring(0, 35)}...`
                    : i.title}
                </Typography>
                <Typography
                  align="left"
                  sx={{ fontWeight: "600", color: "#9D9E9D", fontSize: "12px" }}
                >
                  {i.brand}
                </Typography>
              </Box>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    cursor: "pointer",
                    padding: "0 5px",
                  }}
                  onClick={() => handlePush(i.brand, i.title, i.id)}
                >
                  <Typography
                    align="center"
                    sx={{ color: "black", fontWeight: "600", fontSize: "15px" }}
                  >
                    ₹{i.price}
                  </Typography>
                  &nbsp;&nbsp;
                  {i.actualPrice !== i.price && (
                    <>
                      <Typography sx={{ color: "#e95144", fontSize: "15px" }}>
                        <del>₹{i.actualPrice}</del>
                      </Typography>
                      &nbsp;&nbsp;
                      <Typography
                        sx={{
                          color: "#2e8b57",
                          fontWeight: "500",
                          fontSize: "15px",
                        }}
                      >
                        {offer(i.price, i.actualPrice)}%off
                      </Typography>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    padding: "0 5px",
                  }}
                >
                  {" "}
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: "white",
                      bgcolor: "green",
                      height: "50%",
                      fontSize: "8px",
                      borderRadius: 10,
                      "&:hover": { bgcolor: "green", color: "white" },
                    }}
                    onClick={() => {
                      AddProductToCart(i._id);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </>
        ))}
      </>
    </>
  );
}
