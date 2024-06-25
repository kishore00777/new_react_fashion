import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const list = [
    { name: "Shipping Policy", href: "shippingPolicy" },
    { name: "Contact Us", href: "contactUs" },
    { name: "Terms and Conditions", href: "termsAndConditions" },
    { name: "Privacy Policy", href: "privacyPolicy" },
    { name: "Cancellation Policy", href: "cancellationPolicy" },
  ];
  return (
    <>
      <Grid
        sx={{ bgcolor: "black", padding: 4, position: "sticky", bottom: 0 }}
      >
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
      </Grid>
    </>
  );
}
