import { ThemeProvider } from "@mui/material";
import "./App.css";
import MyRouter from "./MyRouter";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyRouter />
    </ThemeProvider>
  );
}

export default App;
