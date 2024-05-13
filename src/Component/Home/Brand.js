import React from "react";
import { Box, Typography } from "@mui/material";
import Apple from "../../assets/Brand/Apple.svg";
import Boat from "../../assets/Brand/Boat.svg";
import FastTrack from "../../assets/Brand/Fasttrack.svg";
import Fire from "../../assets/Brand/Fire.svg";
import Noise from "../../assets/Brand/Noise.svg";
import Titan from "../../assets/Brand/Titan.svg";

export default function Brand() {
  const Brands = [
    { img: Boat, brandName: "Boat" },
    { img: Apple, brandName: "Apple" },
    { img: FastTrack, brandName: "Fast Track" },
    { img: Fire, brandName: "Fire Boltt" },
    { img: Titan, brandName: "Titan" },
    { img: Noise, brandName: "Noise" },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "none", sm: "none", md: "center" },
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for a cleaner look (optional)
          },
        }}
      >
        {Brands.map((i, index) => (
          <Box
            key={index}
            sx={{
              margin: 2,
              marginRight: 3,
              marginLeft: 3,
              cursor: "pointer",
              minWidth: 160,
            }}
          >
            <Box>
              {" "}
              <img
                src={i.img}
                alt={i.brandName}
                // loading="lazy"
                width={150}
                height={150}
              />
              <Typography align="center" sx={{ mt: 1.5, fontWeight: 500 }}>
                {i.brandName}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
