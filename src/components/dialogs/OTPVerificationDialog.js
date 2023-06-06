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
import otpIcon from "../../images/icons/otp_dialog.png";
import LogoIcon from "../../images/PlantmunityIcon.png";

// Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useVerifyForgotPassMutation } from "../../app/services/authApi";

const OTPVerificationDialog = ({ handleChange }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  //Schema: Rules for inputs
  const schema1 = yup.object({
    verification_code: yup.string().required(),
  });

  const email = useSelector((state) => state.register.email);
  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  const [code, setCode] = useState("");
  const [warning, setWarning] = useState("");

  const [verifyCode] = useVerifyForgotPassMutation();

  const onSubmit = (data) => {
    data["email"] = email;
    verifyCode(data)
      .then((payload) => {
        if ("error" in payload) {
          setWarning("Wrong code, please try again.");
        } else {
          handleChange(3);
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
              <IconButton onClick={() => handleChange(1)}>
                <MdOutlineArrowBack style={{ fontSize: 30, mr: 4 }} />
              </IconButton>
            </Box>

            <div style={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Raleway", letterSpacing: "0.5px" }}
            >
              OTP Verification
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
            sx={{ fontFamily: "Raleway", width: "75%", mb: 2 }}
          >
            Please check the inbox of your email and enter the OTP verification
            code.
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
            variant="outlined"
            {...register("verification_code")}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
            label="Verification Code"
            sx={{ width: "75%" }}
          />

          <Button
            type="submit"
            variant="contained"
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

export default OTPVerificationDialog;
