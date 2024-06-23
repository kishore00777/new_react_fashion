import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <>
      <CircularProgress thickness={5} sx={{ color: "black" }} />
    </>
  );
}
