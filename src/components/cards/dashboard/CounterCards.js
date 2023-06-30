import React from "react";
import { Grid, Stack, Box, Typography } from "@mui/material";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CounterCards = ({ title, value, icon }) => {
  const theme = useTheme();
  const tablet = useMediaQuery(theme.breakpoints.down(1050));
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  return (
    <Grid
      item
      sx={{
        width: tablet ? "50%" : "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "95%",
          height: mobile ? 100 : 150,
          mt: 2,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "white",
          boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ width: 25, height: 150, bgcolor: "#5c6d63" }} />

          <Stack
            direction="column"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              p: mobile ? 2 : 3,
              flexDirection: "column",
            }}
          >
            <Typography
              variant={mobile ? "caption" : "h6"}
              sx={{
                fontFamily: "Raleway",
                fontWeight: "Light",
                display: "flex",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant={mobile ? "h5" : "h2"}
              sx={{
                width: "100%",
                fontFamily: "Raleway",
                fontWeight: "Bold",
                display: "flex",
                flexGrow: 1,
              }}
            >
              {value}
            </Typography>
          </Stack>

          {icon}
        </Stack>
      </Box>
    </Grid>
  );
};

export default CounterCards;
