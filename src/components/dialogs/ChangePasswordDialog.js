import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Images and Icon
import { MdOutlineArrowBack } from "react-icons/md";
import passIcon from "../../images/icons/change_pass_dialog.png";
import LogoIcon from "../../images/PlantmunityIcon.png";

//Data handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useResetPassMutation } from "../../app/services/authApi";

const ChangePasswordDialog = ({ handleClose, handleChange }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  //Schema: Rules for inputs
  const schema1 = yup.object({
    new_password: yup.string().required(),
    confirm_password: yup.string().required(),
  });

  const email = useSelector((state) => state.register.email);

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [warning, setWarning] = useState("");

  const [resetPass] = useResetPassMutation();

  const onSubmit = (data) => {
    data["email"] = email;

    if (data.new_password === data.confirm_password) {
      resetPass(data)
        .then((payload) => {
          console.log(payload);
          if ("error" in payload) {
            setWarning("Error, please try again later.");
          } else {
            handleClose();
          }
        })
        .catch((error) => console.error("rejected", error));
    } else {
      setNewPass("");
      setConfirmPass("");
      setWarning("Password does not match");
    }
  };
  return (
    <Box
      sx={{
        width: mobile ? "100%" : 500,
        height: 650,
        bgcolor: "white",
      }}
    >
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
          <Stack
            direction="row"
            alignItems={"center"}
            sx={{ width: "95%", mt: 1.5, mb: 1.5 }}
          >
            <Box sx={{ width: 100 }}>
              <IconButton onClick={() => handleChange(2)}>
                <MdOutlineArrowBack style={{ fontSize: 30, mr: 4 }} />
              </IconButton>
            </Box>

            <div style={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Raleway", letterSpacing: "0.5px" }}
            >
              Change Password
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Stack
              direction="row"
              justifyContent={"flex-end"}
              sx={{ width: 100, height: 40 }}
            >
              <img
                src={LogoIcon}
                alt={"plantmunity_logo"}
                style={{
                  width: 40,
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Stack>
          </Stack>
          <Box sx={{ width: "100%", height: "1px", bgcolor: "#c4c4c4" }} />
          <Box sx={{ width: 150, height: 120, mb: 1, mt: 5 }}>
            <img
              src={passIcon}
              alt={"plantmunity_logo"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Typography
            variant="body1"
            align="center"
            sx={{ fontFamily: "Raleway", width: "75%", mb: 2 }}
          >
            Please provide a password with a minimum of 8 characters with
            atleast 1 capital letter, number and special character.
          </Typography>

          {warning !== "" ? (
            <Typography
              variant="body2"
              align="center"
              sx={{ width: "100%", color: "orange", mb: 2 }}
            >
              {warning}
            </Typography>
          ) : null}

          <TextField
            {...register("new_password")}
            value={newPass}
            onChange={(event) => setNewPass(event.target.value)}
            required
            type={"password"}
            variant="outlined"
            label="Password"
            sx={{ width: "75%" }}
          />

          <TextField
            {...register("confirm_password")}
            value={confirmPass}
            onChange={(event) => setConfirmPass(event.target.value)}
            required
            type={"password"}
            variant="outlined"
            label="Re-type Password"
            sx={{ width: "75%", mt: 2 }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "75%",
              height: 50,
              mt: 5,
              color: "white",
              borderRadius: 25,
              textTransform: "none",
              fontFamily: "Arvo",
            }}
          >
            {"Verify"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ChangePasswordDialog;
