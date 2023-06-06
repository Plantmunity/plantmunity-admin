import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const FeedbackCards = ({ image, name, email, feedback }) => {
  return (
    <Box
      sx={{
        width: "95%",
        bgcolor: "white",
        borderRadius: 3,
        p: 3,
        boxShadow: "2.0px 2.0px 2.0px 2.0px hsl(0deg 0% 0% / 0.38)",
      }}
    >
      <Avatar
        src={image}
        alt={"profile_picture"}
        sx={{ width: 55, height: 55 }}
      />
      <Typography
        variant="body1"
        sx={{ fontFamily: "Arvo", fontWeight: "bold", color: "#5C6D63", mt: 1 }}
      >
        {name}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontFamily: "Arvo", color: "#5C6D63" }}
      >
        {email}
      </Typography>

      <Typography
        align="justify"
        variant="body2"
        sx={{ fontFamily: "raleway", mt: 3 }}
      >
        {feedback}
      </Typography>
    </Box>
  );
};

export default FeedbackCards;
