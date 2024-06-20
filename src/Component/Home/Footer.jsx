import { Box, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const list = [
    { name: "Shipping Policy", href: "shippingPolicy" },
    { name: "Contact Us", href: "contactUs" },
    { name: "Terms and Conditions", href: "termsAndConditions" },
    { name: "Privacy Policy", href: "privacyPolicy" },
    { name: "Cancellation/Refund Policy", href: "cancellationPolicy" },
  ];
  return (
    <Box sx={{ bgcolor: "lightpink", padding: 4 }}>
      <Grid container spacing={4}>
        {list.map((i) => (
          <Grid item>
            {" "}
            <Link to={`/${i.href}`}>{i.name}</Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
