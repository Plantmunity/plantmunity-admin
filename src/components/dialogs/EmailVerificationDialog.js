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

import { MdCancel } from "react-icons/md";
import otpIcon from "../../images/icons/otp_dialog.png";
import LogoIcon from "../../images/PlantmunityIcon.png";

// Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useVerifyEmailMutation } from "../../app/services/authApi";
import { navigate } from "gatsby";

const EmailVerificationDialog = ({ handleClose }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const email = useSelector((state) => state.register.email);
  //Schema: Rules for inputs
  const schema1 = yup.object({
    verification_code: yup.string().required(),
  });

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  //STATES
  const [code, setCode] = useState("");

  const [verifyEmail] = useVerifyEmailMutation();

  const onSubmit = (data) => {
    const input = {
      verification_code: data.verification_code,
      email: email,
    };
    console.log(input);
    verifyEmail(input)
      .then((payload) => {
        if (payload?.error?.status === 422) {
          console.log("Wrong code");
        } else {
          navigate("/");
          handleClose();
        }
      })
      .catch((error) => console.error("rejected", error));
  };
  return (
    <Box
      sx={{
        width: mobile ? "100%" : 500,
        height: 600,
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
              <IconButton onClick={() => navigate("/")}>
                <MdCancel style={{ fontSize: 30, mr: 4 }} />
              </IconButton>
            </Box>

            <div style={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Raleway", letterSpacing: "0.5px" }}
            >
              Email Verification
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <Stack
              direction="row"
              justifyContent={"flex-end"}
              sx={{ width: 100, height: 40 }}
            >
              <img
                src={LogoIcon}
                alt={"imotor_logo"}
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
              src={otpIcon}
              alt={"imotor_logo"}
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
            sx={{ fontFamily: "Raleway", width: "75%", mb: 3 }}
          >
            Please check the inbox or spam section of your email and enter the
            email verification code.
          </Typography>

          <TextField
            variant="outlined"
            {...register("verification_code")}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
            }}
            label="Verification Code"
            sx={{ width: "75%" }}
          />

          <Button
            type={"submit"}
            variant="contained"
            sx={{
              width: "75%",
              height: 50,
              mt: 5,
              borderRadius: 25,
              textTransform: "none",
              fontFamily: "Arvo",
              color: "white",
            }}
          >
            {"Verify"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EmailVerificationDialog;
