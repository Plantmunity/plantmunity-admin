import {
  Box,
  Button,
  IconButton,
  Stack,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { MdCancel } from "react-icons/md";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useUpdateConcernMutation } from "../../app/services/landingApi";
const PendingConcernDialog = ({
  handleClose,
  handleSent,
  id,
  name,
  email,
  contact,
  subject,
  message,
}) => {
  const [reply, setReply] = useState("");

  //For react hook form
  const { handleSubmit } = useForm();

  const [updateConcern] = useUpdateConcernMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    const input = {
      id: id,
      data: {
        reply: reply,
        subject: subject,
        email: email,
      },
    };

    updateConcern(input)
      .then((payload) => {
        setLoading(false);
        handleSent();
      })
      .catch((error) => {
        setLoading(false);
        console.error("rejected", error);
      });
  };
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
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              multiline
              required
              label={"Reply"}
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              minRows={3}
              maxRows={6}
              sx={{ mt: 2, width: "100%" }}
            />
            <Button
              type={"submit"}
              variant="contained"
              sx={{ width: "100%", mt: 1, color: "white" }}
            >
              {loading ? <ClipLoader color={"white"} size={25} /> : "Send"}
            </Button>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default PendingConcernDialog;
