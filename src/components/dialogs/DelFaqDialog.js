import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDeleteFaqMutation } from "../../app/services/landingApi";

const DelFaqDialog = ({ handleClose, id, toast }) => {
  const [delFaq] = useDeleteFaqMutation();
  return (
    <Box sx={{ width: 500 }}>
      <Box sx={{ width: "100%", borderBottom: "1px solid #E0E0E0", p: 2 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ width: "100%", fontWeight: "bold", fontFamily: "Arvo" }}
        >
          Delete FAQ
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
          Are you sure you want to delete selected FAQ?
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
              delFaq(id)
                .then((payload) => {
                  if (payload?.data?.status === 200) {
                    toast(payload?.data?.message);
                    handleClose();
                  } else {
                    toast(payload?.data?.message);
                    handleClose();
                  }
                })
                .catch((error) => {
                  toast("An error has occured, please try again later.");
                  handleClose();
                });
            }}
            sx={{
              width: "100%",
              borderRadius: 2,
              height: 50,
              border: "1px solid #5F8085",
              color: "white",
              bgcolor: "#5F8085",
              ml: 1,
              "&:hover": { bgcolor: "#5C6D63", color: "white" },
            }}
          >
            Proceed
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DelFaqDialog;
