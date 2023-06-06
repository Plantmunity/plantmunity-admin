import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import { ClipLoader } from "react-spinners";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { MdCancel } from "react-icons/md";
import emailIcon from "../../images/icons/email_dialog.png";
import LogoIcon from "../../images/PlantmunityIcon.png";

// Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setEmailVerification } from "../../app/persist/authentication/registerSlice";
import { useForgotPassMutation } from "../../app/services/authApi";

const ForgotPasswordDialog = ({ handleClose, handleChange }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  //Schema: Rules for inputs
  const schema1 = yup.object({
    email: yup.string().required(),
  });

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const dispatch = useDispatch();
  const [forgotPass] = useForgotPassMutation();

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(setEmailVerification({ email: email }));
    forgotPass(data)
      .then((payload) => {
        if ("error" in payload) {
          setWarning("Email not found");
          setLoading(false);
        } else {
          handleChange(2);
          setLoading(false);
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
              <IconButton onClick={() => handleClose()}>
                <MdCancel style={{ fontSize: 30, mr: 4 }} />
              </IconButton>
            </Box>

            <div style={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Raleway", letterSpacing: "0.5px" }}
            >
              Forgot Password
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
          <Box sx={{ width: 150, height: 120, mb: 3, mt: 5 }}>
            <img
              src={emailIcon}
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
            Please enter your email address to receive a verification code for
            resetting your password.
          </Typography>

          {warning !== "" ? (
            <Typography
              variant="body2"
              align="center"
              sx={{ width: "100%", color: "orange", mb: 1 }}
            >
              {warning}
            </Typography>
          ) : null}

          <TextField
            type="email"
            required
            {...register("email")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            label="Email"
            sx={{ width: "75%" }}
          />

          <Button
            variant="contained"
            type={"submit"}
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
            {loading ? (
              <ClipLoader color="white" size={25} loading={loading} />
            ) : (
              "Submit"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ForgotPasswordDialog;
