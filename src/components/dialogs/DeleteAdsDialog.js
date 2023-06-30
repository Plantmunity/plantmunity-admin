import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDeleteAdsMutation } from "../../app/services/manageApi";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DeleteAdsDialog = ({ handleClose, id, toast }) => {
  const [deleteAds] = useDeleteAdsMutation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <Box sx={{ width: mobile ? "100%" : 500 }}>
      <Box sx={{ width: "100%", borderBottom: "1px solid #E0E0E0", p: 2 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ width: "100%", fontWeight: "bold", fontFamily: "Arvo" }}
        >
          Delete Ad
        </Typography>
      </Box>

      <Stack
        direction="column"
        alignItems={"center"}
        sx={{
          width: "100%",
          borderBottom: "1px solid #E0E0E0",
          p: 3,
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{ width: "100%", fontFamily: "Raleway" }}
        >
          Are you sure you want to delete this ad?
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ width: "70%", mt: 2 }}>
          <Button
            onClick={() => handleClose()}
            sx={{
              width: "100%",
              height: 50,
              borderRadius: 2,
              border: "1px solid #5F8085",
              color: "#5F8085",
              bgcolor: "white",
              "&:hover": { bgcolor: "#5C6D63", color: "white" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              toast("Ad is successfully deleted");
              deleteAds(id);
            }}
            sx={{
              width: "100%",
              borderRadius: 2,
              height: 50,
              border: "1px solid red",
              color: "white",
              bgcolor: "red",
              ml: 1,
              "&:hover": { bgcolor: "red", color: "white" },
            }}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DeleteAdsDialog;
