import { Box, IconButton, Stack, Grid, Typography } from "@mui/material";

import { MdCancel } from "react-icons/md";
import React from "react";

const ProcessedConcernDialog = ({
  handleClose,
  reply,
  name,
  email,
  contact,
  subject,
  message,
}) => {
  return (
    <Box sx={{ width: 500, bgcolor: "white", position: "relative" }}>
      <IconButton
        onClick={() => handleClose()}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <MdCancel />
      </IconButton>
      <Stack
        alignItems="center"
        sx={{ borderBottom: "1px solid #E0E0E0", width: "100%", p: 2 }}
      >
        <Typography
          variant="h5"
          sx={{ fontFamily: "Arvo", fontWeight: "bold" }}
        >
          Process concern
        </Typography>
      </Stack>

      <Box sx={{ width: "100%", height: 600 }}>
        <Stack direction="column" sx={{ mt: 1, p: 3 }}>
          <Typography
            variant="body1"
            sx={{ fontFamily: "Raleway", mt: 1, color: "#797A7C" }}
          >
            <b>Sender: </b>
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Raleway", mt: 1, color: "black" }}
          >
            {name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              mt: 1,
              fontWeight: "bold",
              color: "#797A7C",
            }}
          >
            {"Contacts: "}
          </Typography>
          <Grid container direction="row" sx={{ mt: 1 }}>
            <Grid
              item
              sx={{
                fontFamily: "Raleway",
                fontSize: 15,
                p: 1,
                border: "1px solid black",
                bgcolor: "white",
                borderRadius: 5,
              }}
            >
              {email}
            </Grid>
            <Grid
              item
              sx={{
                fontFamily: "Raleway",
                fontSize: 15,
                ml: 1,
                p: 1,
                border: "1px solid black",
                bgcolor: "white",
                borderRadius: 5,
              }}
            >
              {contact}
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              fontWeight: "bold",
              mt: 2,
              color: "#797A7C",
            }}
          >
            {"Subject: "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              mt: 1,
              p: 1,
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
            }}
          >
            {subject}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              fontWeight: "bold",
              mt: 2,
              color: "#797A7C",
            }}
          >
            {"Message: "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              mt: 1,
              p: 1,
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
            }}
          >
            {message}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              fontWeight: "bold",
              mt: 2,
              color: "#797A7C",
            }}
          >
            {"Reply: "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Raleway",
              mt: 1,
              p: 1,
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
            }}
          >
            {reply}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProcessedConcernDialog;
