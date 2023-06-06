import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateContactMutation } from "../../../app/services/accountApi";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Schema: Rules for inputs
const schema1 = yup.object({
  email: yup.string().email(),
  address: yup.string(),
  contact: yup.string(),
});

const EditUserContactForm = ({
  email,
  address,
  contact,
  handleClose,
  toast,
}) => {
  const ID = useSelector((state) => state.user.id);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [isEnabled, setIsEnabled] = useState(true);
  const [user_email, setEmail] = useState(email);
  const [user_address, setAddress] = useState(address);
  const [user_contact, setContact] = useState(contact);
  const [emailWarn, setEmailWarn] = useState("");

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  const [updateContact] = useUpdateContactMutation();

  const onSubmit = (data) => {
    const input = {
      id: ID,
      data: data,
    };

    updateContact(input)
      .then((payload) => {
        if (payload?.data?.status === 401) {
          setEmailWarn(payload?.data?.message);
        } else if (payload?.data?.status === 500) {
          setEmailWarn("");
          handleClose();
        } else {
          setEmailWarn("");
          toast(payload?.data?.message);
          handleClose();
        }
      })
      .catch((error) => {
        setEmailWarn("");
        handleClose();
      });
  };

  return (
    <Stack
      direction="column"
      alignItems={"center"}
      sx={{ width: mobile ? "100%" : 550 }}
    >
      <Typography variant="h6" align="center" sx={compStyle["dialog-title"]}>
        Edit Contact Detail
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Divider />
      </Box>

      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" sx={{ width: "100%", pl: 5, pr: 5, mt: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mb: 2, width: "100%" }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Arvo",
                fontWeight: "bold",
                color: "#757575",
                mr: 1,
              }}
            >
              User Details
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Divider />
            </Box>
          </Stack>

          {emailWarn === "" ? null : (
            <Typography
              sx={{
                fontFamily: "raleway",
                color: "orange",
                fontSize: 10,
                mb: 1,
                width: "100%",
                textAlign: "right",
              }}
            >
              {emailWarn}
            </Typography>
          )}

          <TextField
            {...register("email")}
            value={user_email}
            label="Email"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setEmail(event.target.value);
              setIsEnabled(false);
            }}
          />

          <TextField
            {...register("contact")}
            value={user_contact}
            label="Contact"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setContact(event.target.value);
              setIsEnabled(false);
            }}
          />

          <TextField
            {...register("address")}
            value={user_address}
            label="Address"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setAddress(event.target.value);
              setIsEnabled(false);
            }}
          />
        </Stack>
        <Stack direction="row" sx={{ p: 3, width: "100%" }}>
          <div style={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            onClick={() => handleClose()}
            sx={compStyle["secondary-button"]}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={compStyle["primary-button"]}
            disabled={isEnabled}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default EditUserContactForm;

const compStyle = {
  "dialog-title": {
    fontFamily: "Arvo",
    p: 2,
    bgcolor: "#5C6D63",
    color: "white",
    width: "100%",
  },
  "dialog-text": {
    fontFamily: "Raleway",
    p: 4,
    pt: 0,
  },
  "primary-button": {
    textTransform: "none",
    color: "white",
    fontFamily: "Arvo",
  },
  "secondary-button": {
    mr: 2,
    textTransform: "none",
    color: "#7CB2B0",
    border: "1px solid #7CB2B0",
    backgroundColor: "white",
    fontFamily: "Arvo",
  },
  "input-field": {
    mb: 2,
    width: "100%",
  },
};
