import { Settings } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instance } from "../Config/Common";
import {
  TriggerOn,
  logoutFail,
  logoutStart,
  logoutSuccess,
} from "../Store/Reducer/AuthSlice";
import Cookies from "universal-cookie";
import {
  failedtogetTotalCount,
  fetchedTotalCount,
  getTotalCount,
} from "../Store/Reducer/CartSlice";

export default function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth?.isAuth);
  const loading = useSelector((state) => state.auth?.Loading);
  const userName = useSelector((state) => state.auth.user?.userName);
  const email = useSelector((state) => state.auth.user?.email);
  const Success = useSelector((state) => state.cart.success);
  const count = useSelector((state) => state.cart.count);

  const ProductCount = async () => {
    if (!auth) {
      return;
    }
    dispatch(getTotalCount());
    try {
      const response = await Instance.get("/api/bag/noOfProductsInCart");
      dispatch(fetchedTotalCount(response.data.total));
    } catch (error) {
      console.error(error);
      dispatch(failedtogetTotalCount(error.toString()));
    }
  };

  const LoGout = async () => {
    try {
      dispatch(logoutStart());
      const response = await Instance.post("/api/auth/user/logOut");
      dispatch(logoutSuccess(response.data));
      cookies.remove("token-fashion");
      cookies.remove("id");
    } catch (error) {
      console.error(error);
      dispatch(logoutFail(error));
    }
  };
  useEffect(() => {
    ProductCount();
  }, [Success]);

  console.log(loading);
  return (
    <>
      {" "}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              color: "black",
              cursor: "pointer",
            }}
          />{" "}
          &nbsp; My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/changePassword");
          }}
        >
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        {email === "kishoremurgan0077@gmail.com" && (
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/admin/addproduct");
            }}
          >
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            Admin
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            LoGout();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <AppBar sx={{ bgcolor: "black", position: "sticky" }}>
        <Toolbar
          sx={{
            padding: 1,
          }}
        >
          {/* ------------------------------------------------------------------------------------------------------- */}
          {/* -----------------------------------------sm------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------- */}
          <Container
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
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
                    color: "secondary.main",
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
                <IconButton>
                  <ShoppingCartIcon sx={{ color: "white", fontSize: "30px" }} />
                </IconButton>{" "}
                <IconButton>
                  <MenuIcon sx={{ color: "white", fontSize: "35px" }} />
                </IconButton>
              </Box>
            </Box>
          </Container>
          {/* ------------------------------------------------------------------------------------------------------- */}
          {/* -----------------------------------------lg------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------- */}
          <Container
            maxWidth="lg"
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
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
                    color: "secondary.main",
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
                  style={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: "20px",
                    textDecoration: "none",
                    margin: 15,
                  }}
                  onClick={() => {
                    if (!auth) {
                      dispatch(TriggerOn());
                      return;
                    }
                    navigate("/cart");
                  }}
                >
                  <>
                    <Badge
                      badgeContent={auth ? count : null}
                      color="secondary"
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "white", // Change this to your desired color
                        },
                      }}
                    >
                      <ShoppingCartIcon
                        sx={{ color: "white", fontSize: "30px" }}
                      />
                    </Badge>
                  </>{" "}
                </Link>
                {/* <Link
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
                </Link> */}

                {loading ? null : location.pathname === "/login" ||
                  location.pathname === "/signup" ? null : auth ? (
                  <Tooltip title="Account settings">
                    {/* <IconButton
                        size="small"
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      > */}
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        border: "3px solid ",
                        borderColor: "secondary.main",
                        bgcolor: "primary.main",
                        color: "#ffffff",
                        fontWeight: "500",
                        ml: 2,
                        "&:hover": { bgcolor: "#0000", color: "#ffffff" },
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      {userName?.slice(0, 1)}
                    </Avatar>
                    {/* </IconButton> */}
                  </Tooltip>
                ) : (
                  <Link
                    // to="/login"
                    style={{
                      color: "white",
                      fontWeight: "300",
                      fontSize: "20px",
                      textDecoration: "none",
                      margin: 15,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "secondary.main",
                        color: "#ffffff",
                        fontWeight: "600",
                        "&:hover": {
                          bgcolor: "secondary.main",
                          color: "#ffffff",
                        },
                      }}
                      onClick={() => dispatch(TriggerOn())}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}

// (
//   <Link
//     to="/login"
//     style={{
//       color: "white",
//       fontWeight: "300",
//       fontSize: "20px",
//       textDecoration: "none",
//       margin: 15,
//     }}
//   >
//     <Button
//       variant="contained"
//       sx={{
//         bgcolor: "secondary.main",
//         color: "#ffffff",
//         fontWeight: "600",
//         "&:hover": {
//           bgcolor: "secondary.main",
//           color: "#ffffff",
//         },
//       }}
//     >
//       Login
//     </Button>
//   </Link>
// )
