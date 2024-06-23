import { Settings } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
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
import React from "react";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instance } from "../Config/Common";
import {
  logoutFail,
  logoutStart,
  logoutSuccess,
} from "../Store/Reducer/AuthSlice";
import Cookies from "universal-cookie";

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
  const userName = useSelector((state) => state.auth.user?.userName);

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
            navigate("/admin/changePassword");
          }}
        >
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
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
                  <ShoppingBagIcon sx={{ color: "white", fontSize: "30px" }} />
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

                {location.pathname === "/login" ||
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
                    to="/login"
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
