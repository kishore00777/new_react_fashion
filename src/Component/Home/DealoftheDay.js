import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Box, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fontsource/poppins";

export default function DealoftheDay() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplaySpeed: 3000,
    initialSlide: 0,
    autoplay: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const [data, setData] = useState([]);
  const [hi, setHi] = useState(false);

  const GetProduct = async () => {
    try {
      const response = await axios.get(
        "https://test-ff63e.web.app/Product.json"
      );
      if (response.status === 200) {
        setData(response.data);
        setHi(true);
      } else {
        setHi(false);
      }
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };
  useEffect(() => {
    GetProduct();
  }, []);

  const Loader = () => {
    return (
      <>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={300}
          height={300}
          sx={{ m: 2 }}
        />
      </>
    );
  };

  return (
    <>
      {hi ? (
        <Box sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "90%" }}>
          <Box sx={{ width: "100%" }}>
            <>
              <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
                {data[0]?.dealHead}
              </Typography>
            </>
            <br />
          </Box>

          <Slider {...settings}>
            {data?.map(
              (i, index) =>
                i.topDeals === "yes" && (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      // flexDirection: "column",
                      alignItems: "center",
                      padding: 2,
                      bgcolor: "white",
                    }}
                  >
                    {i.img ? (
                      <img
                        src={`https://test-ff63e.web.app/assets/${i.img[0]}`}
                        width={300}
                        height={300}
                        alt={i.title}
                        loading="lazy"
                        // onLoad={() => setHi(true)}
                      />
                    ) : (
                      <Loader />
                    )}

                    {/* <img
                      src={`https://test-ff63e.web.app/assets/${i.img[0]}`}
                      width={300}
                      height={300}
                      alt={i.title}
                      loading="lazy"
                      onLoad={() => setHi(false)}
                    /> */}
                    {/* <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Typography
                      align="center"
                      sx={{ color: "#2e8b57", fontWeight: "600" }}
                    >
                      ₹{i.price}
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography sx={{ fontSize: "14px", color: "#9D9E9D" }}>
                      From
                    </Typography>
                    &nbsp;&nbsp;
                    <Typography sx={{ color: "#e95144", fontWeight: "500" }}>
                      <del>₹{i.actualPrice}</del>
                    </Typography>
                  </Box> */}
                  </Box>
                )
            )}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ maxWidth: "90%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <>
              <Skeleton width={350} height={25} animation="wave" />
            </>
            <br />
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              padding: 2,
            }}
          >
            <Loader />
            <Loader />
            <Loader />
            <Loader />
            <Loader />
          </Box>
        </Box>
      )}
    </>
  );
}
