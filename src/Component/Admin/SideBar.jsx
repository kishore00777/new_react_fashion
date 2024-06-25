import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import React from "react";
import Logout from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutFail,
  logoutStart,
  logoutSuccess,
} from "../../Store/Reducer/AuthSlice";
import { Instance } from "../../Config/Common";
import Cookies from "universal-cookie";
import { Items } from "../../Data/TopA";

export default function SideBar() {
  const drawerWidth = 240;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.user?.userName);
  const dispatch = useDispatch();
  const cookies = new Cookies();
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
            navigate("/changePassword");
          }}
        >
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/");
          }}
        >
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          Home
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
        PaperProps={{
          style: {
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ overflow: "auto", bgcolor: "black", height: "100vh" }}>
          <Toolbar />
          <List sx={{ color: "white" }}>
            {Items.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => navigate(text.link)}
              >
                <ListItemButton sx={{ color: "white" }}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap>
              Permanent Drawer
            </Typography>
            <Tooltip title="Account settings">
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
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, ml: 30, mt: 3, p: 5 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
