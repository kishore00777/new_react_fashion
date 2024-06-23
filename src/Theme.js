import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#000000", // Black color
    },
    secondary: {
      main: "#ff36ab",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
      disabled: "#bdbdbd",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    divider: "#e0e0e0",
  },
});
