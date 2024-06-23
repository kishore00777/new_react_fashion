import { Box, Grid } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const list = [
    { name: "Shipping Policy", href: "shippingPolicy" },
    { name: "Contact Us", href: "contactUs" },
    { name: "Terms and Conditions", href: "termsAndConditions" },
    { name: "Privacy Policy", href: "privacyPolicy" },
    { name: "Cancellation Policy", href: "cancellationPolicy" },
  ];
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/signup" ? null : (
        <Box sx={{ bgcolor: "black", padding: 4 }}>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {list.map((i) => (
              <Grid item>
                {" "}
                <Link
                  to={`/${i.href}`}
                  style={{
                    textDecoration: "none",
                    color: "#ff36ab",
                    fontSize: "12px",
                  }}
                >
                  {i.name}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
