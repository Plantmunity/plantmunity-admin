import { Grid } from "@mui/material";
import React from "react";
import LoginForm from "../forms/LoginForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down(900));
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      sx={{
        width: mobile ? 330 : tablet ? 450 : 800,
        height: 500,
        boxShadow: "2.0px 2.0px 2.0px 2.0px hsl(0deg 0% 0% / 0.38)",
        bgcolor: "white",
        borderRadius: 3,
        overflow: "hidden",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid
        item
        sx={{
          width: "50%",
          height: 500,
          bgcolor: "yellow",
          display: tablet ? "none" : "flex",
        }}
      >
        <img
          alt={"login_pic"}
          style={{
            width: "100%",
            height: 500,
            objectFit: "cover",
          }}
          src={
            "https://cdn.shopify.com/s/files/1/0260/3037/4957/products/medium-plant-dieffenbachia-seafoam-pot.jpg?v=1649448462"
          }
        />
      </Grid>
      <LoginForm />
    </Grid>
  );
};

export default Login;
