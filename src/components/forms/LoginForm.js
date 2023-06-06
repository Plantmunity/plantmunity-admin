//MUI Components
import {
  Button,
  Dialog,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { navigate, Link } from "gatsby";
import React, { useLayoutEffect, useState } from "react";
import Logo from "../../images/Plantmunity.png";
import EmailVerificationDialog from "../dialogs/EmailVerificationDialog";
import ForgotPasswordDialog from "../dialogs/ForgotPasswordDialog";
import OTPVerificationDialog from "../dialogs/OTPVerificationDialog";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";

import { ClipLoader } from "react-spinners";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Data fetching
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../app/persist/authentication/authSlice";
import { useLoginUserMutation } from "../../app/services/authApi";
import useAuth from "../../app/hooks/useAuth";
import { setEmailVerification } from "../../app/persist/authentication/registerSlice";

//Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Schema: Rules for inputs
const schema = yup.object({
  email: yup.string().email("email is required"),
  password: yup.string().required("password is required"),
});

//---------------------------------------------------------------------------------------------------------------------------

const LoginForm = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const tablet = useMediaQuery(theme.breakpoints.down(900));

  const emailState = useSelector((state) => state.register.email);
  const [loginUser] = useLoginUserMutation();
  const { isLoggedIn, auth } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(emailState === null ? "" : emailState);
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [openEmailVerification, setOpenEmailVerification] = useState(false);
  const handleOpenDialog = () => {
    setOpenEmailVerification(!openEmailVerification);
  };

  const [forgotVal, setForgotVal] = useState(1);
  const handleForgotVal = (value) => {
    setForgotVal(value);
  };
  const [openForgotPass, setForgotPass] = useState(false);
  const handleForgotPass = () => {
    if (openForgotPass) {
      setForgotVal(1);
    }
    setForgotPass(!openForgotPass);
  };

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    loginUser(data)
      .unwrap()
      .then((res) => {
        dispatch(setEmailVerification({ email: data.email }));
        if (res.status === 200) {
          dispatch(setCredentials({ token: res.token }));
        } else if (res.status === 401.1) {
          setWarning(res.message);
        } else if (res.status === 401.3) {
          setWarning(res.message);
        } else if (res.status === 401.2) {
          setWarning(res.message);
          handleOpenDialog();
        } else {
          setWarning(res.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        setWarning(err.message);
        if (err.status === 401.2) {
          handleOpenDialog();
        }
        setLoading(false);
      });
  };

  useLayoutEffect(() => {
    //console.log("Logged In:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/welcome");
    }
  }, [isLoggedIn, auth]);

  return (
    <Grid
      item
      sx={{
        width: tablet ? "100%" : "50%",
        height: "100%",
        p: 4,
      }}
    >
      <Stack direction="column" alignItems={"center"} sx={{ width: "100%" }}>
        <Grid sx={{ width: "100%", height: 100, mt: 2 }}>
          <img
            alt={"login_pic"}
            style={{
              width: "100%",
              height: tablet ? 120 : 100,
              objectFit: "cover",
            }}
            src={Logo}
          />
        </Grid>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ pb: 2, width: "100%" }}>
            <Stack direction="column" align="center" sx={{ width: "100%" }}>
              <Typography
                variant="caption"
                align="center"
                sx={{ fontFamily: "raleway", color: "orange" }}
              >
                {warning}
              </Typography>
            </Stack>
          </Grid>
          <Grid sx={{ pb: 2 }}>
            <TextField
              {...register("email")}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              label="Email"
              size="small"
              variant="filled"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid sx={{ pb: 2 }}>
            <TextField
              {...register("password")}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              label="Password"
              size="small"
              variant="filled"
              sx={{ width: "100%" }}
            />
          </Grid>

          <Stack
            direction="row"
            justifyContent={"flex-end"}
            sx={{ width: "100%", marginTop: "-5px", mb: 5 }}
          >
            <Button
              onClick={() => handleForgotPass()}
              sx={{
                p: 0,
                textTransform: "none",
                fontSize: 12,
                fontFamily: "Arvo",
                color: "#5F8085",
                "&:hover": { bgcolor: "transaparent" },
              }}
            >
              Forgot your password?
            </Button>
          </Stack>

          <Grid sx={{ pb: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#54b866",
                fontFamily: "Arvo",
                textTransform: "none",
                borderRadius: 5,
                color: "white",
              }}
            >
              {loading ? <ClipLoader color={"white"} size={25} /> : "Login"}
            </Button>
          </Grid>
        </form>
      </Stack>
      <Dialog
        open={openEmailVerification}
        onClose={handleOpenDialog}
        maxWidth={false}
        scroll={"body"}
        fullScreen={mobile}
      >
        <EmailVerificationDialog handleClose={handleOpenDialog} />
      </Dialog>

      <Dialog
        open={openForgotPass}
        onClose={handleForgotPass}
        maxWidth={false}
        scroll={"body"}
        fullScreen={mobile}
      >
        {forgotVal === 1 ? (
          <ForgotPasswordDialog
            handleClose={() => handleForgotPass()}
            handleChange={(value) => handleForgotVal(value)}
          />
        ) : forgotVal === 2 ? (
          <OTPVerificationDialog
            handleChange={(value) => handleForgotVal(value)}
          />
        ) : forgotVal === 3 ? (
          <ChangePasswordDialog
            handleClose={() => handleForgotPass()}
            handleChange={(value) => handleForgotVal(value)}
          />
        ) : null}
      </Dialog>
    </Grid>
  );
};

export default LoginForm;
