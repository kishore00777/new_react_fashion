import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { onLogin } from "../../Store/Reducer/AuthSlice";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { TriggerOff } from "../../Store/Reducer/AuthSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export default function TriggerModal() {
  const [data, setData] = useState({
    mail: "",
    Password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    onLogin(dispatch, navigate, data.mail, data.Password);
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(TriggerOff());
  };
  const trigger = useSelector((state) => state.auth?.trigger);

  useEffect(() => {
    if (trigger) {
      handleOpen();
    }
  }, [trigger]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <Container maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "black" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="mail"
                    autoComplete="email"
                    autoFocus
                    value={data.mail}
                    onChange={HandleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={data.Password}
                    onChange={HandleChange}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    Log In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </>
        </Box>
      </Modal>
    </>
  );
}
