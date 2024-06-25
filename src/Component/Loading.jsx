import { Box, CircularProgress, Container } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress size={38} thickness={20} />
      </Box>{" "}
    </>
  );
}
