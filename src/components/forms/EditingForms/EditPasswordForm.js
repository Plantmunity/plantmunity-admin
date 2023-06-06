import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUpdatePassMutation } from "../../../app/services/accountApi";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Schema: Rules for inputs
const schema1 = yup.object({
  old_password: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      {
        message:
          "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        excludeEmptyString: true,
      }
    ),
  password_confirmation: yup.string().required(),
});

const EditPasswordForm = ({ handleClose, toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");

  //For react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema1),
  });

  const [updatePass] = useUpdatePassMutation();

  const onSubmit = (data) => {
    const input = data;

    if (data.password === data.password_confirmation) {
      updatePass(input)
        .then((payload) => {
          if (payload?.data?.status === 500) {
            toast(payload?.data?.message);
            handleClose();
          } else if (payload?.data?.status === 401) {
            toast(payload?.data?.message);
            setNewPassword("");
            setConfirmPassword("");
            setOldPassword("");
          } else if (payload?.data?.status === 409) {
            toast(payload?.data?.message);
            setNewPassword("");
            setConfirmPassword("");
          } else if (payload?.data?.status === 200) {
            toast(payload?.data?.message);
            handleClose();
          } else {
            toast("Error has occured, try again later.");
            handleClose();
          }
        })
        .catch((error) => {
          console.error("rejected", error);
          toast("Error has occured, try again later.");
        });
    } else {
      setNewPassword("");
      setConfirmPassword("");
      setWarning("Password does not match");
    }
  };

  return (
    <Stack
      direction="column"
      alignItems={"center"}
      sx={{ width: mobile ? "100%" : 400 }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "Arvo",
          p: 2,
          bgcolor: "#5C6D63",
          color: "white",
          width: "100%",
          display: mobile ? "none" : "block",
        }}
      >
        Change Password
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"row"}
          alignItems="center"
          sx={{
            position: "fixed",
            width: "100%",
            height: 60,
            pl: 1,
            pr: 1,
            bgcolor: "#5C6D63",
            display: mobile ? "flex" : "none",
          }}
        >
          <Box sx={{ width: 65 }}>
            <IconButton onClick={() => handleClose()} sx={{ color: "white" }}>
              <ArrowBackIosNewRoundedIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            align="center"
            sx={{ flexGrow: 1, color: "white", fontFamily: "Raleway" }}
          >
            Change Password
          </Typography>

          <Button
            type="submit"
            sx={{
              color: "white",
              bgcolor: "transparent",
              textTransform: "none",
              fontFamily: "Arvo",
              p: 0,
              fontSize: 20,
            }}
          >
            Submit
          </Button>
        </Stack>

        <Stack
          direction="column"
          sx={{ width: "100%", pl: 5, pr: 5, mt: { xs: 10, sm: 8, md: 3 } }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{ fontFamily: "Raleway", width: "100%", mb: 2 }}
          >
            Fill in all the fields to change your password.
          </Typography>

          <TextField
            type="password"
            {...register("old_password")}
            required
            value={oldPassword}
            label="Old password"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
          />

          {warning !== "" ? (
            <Typography
              variant="body2"
              align="center"
              sx={{ width: "100%", color: "orange", mb: 2 }}
            >
              {warning}
            </Typography>
          ) : null}

          {errors.password ? (
            <Typography
              variant="caption"
              sx={{
                color: "#eed202",
                fontSize: 10,
                mb: 1,
              }}
            >
              {errors.password?.message}
            </Typography>
          ) : null}

          <TextField
            type="password"
            {...register("password")}
            required
            value={newPassword}
            label="New Password"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />

          <TextField
            type="password"
            {...register("password_confirmation")}
            required
            value={confirmPassword}
            label="Confirm password"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </Stack>

        <Stack
          direction="row"
          sx={{ p: 3, width: "100%", display: mobile ? "none" : "flex" }}
        >
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
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default EditPasswordForm;

const compStyle = {
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
  "service-button": {
    textTransform: "none",
    color: "#7CB2B0",
    border: "1px solid #7CB2B0",
    backgroundColor: "white",
    fontFamily: "Arvo",
    height: 50,
    ml: 1,
  },
};
