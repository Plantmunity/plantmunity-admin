import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useUpdateDetailMutation } from "../../../app/services/accountApi";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//Schema: Rules for inputs
const schema1 = yup.object({
  first_name: yup.string(),
  middle_name: yup.string(),
  last_name: yup.string(),
  sex: yup.string(),
  username: yup.string(),
  bio_note: yup.string(),
});

const EditUserForm = ({
  firstName,
  lastName,
  middleName,
  sex,
  userName,
  bio,
  handleClose,
  toast,
}) => {
  const ID = useSelector((state) => state.user.id);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [isEnabled, setIsEnabled] = useState(true);
  const [first_name, setFirstName] = useState(firstName);
  const [last_name, setLastName] = useState(lastName);
  const [middle_name, setMiddleName] = useState(middleName);
  const [username, setUsername] = useState(userName);
  const [user_bio, setBio] = useState(bio);
  const [user_sex, setSex] = useState(sex === null ? "Male" : sex);
  const [userWarn, setUserWarn] = useState("");

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema1),
  });

  const [updateUserDetail] = useUpdateDetailMutation();

  const onSubmit = (data) => {
    const input = {
      id: ID,
      data: data,
    };

    updateUserDetail(input)
      .then((payload) => {
        if (payload?.data?.status === 401) {
          setUserWarn(payload?.data?.message);
        } else if (payload?.data?.status === 500) {
          setUserWarn("");
          handleClose();
        } else {
          setUserWarn("");
          toast(payload?.data?.message);
          handleClose();
        }
      })
      .catch((error) => {
        console.error("rejected", error);
        setUserWarn("");
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
        Edit Profile
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

          <Stack direction="row" sx={{ width: "100%" }}>
            <TextField
              required
              {...register("first_name")}
              value={first_name}
              label="First name"
              variant="outlined"
              sx={compStyle["input-field"]}
              onChange={(event) => {
                setFirstName(event.target.value);
                setIsEnabled(false);
              }}
            />

            <div style={{ width: 10 }} />

            <TextField
              required
              {...register("middle_name")}
              value={middle_name}
              label="Middle name"
              variant="outlined"
              sx={compStyle["input-field"]}
              onChange={(event) => {
                setMiddleName(event.target.value);
                setIsEnabled(false);
              }}
            />
          </Stack>

          <TextField
            required
            {...register("last_name")}
            value={last_name}
            label="Last name"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setLastName(event.target.value);
              setIsEnabled(false);
            }}
          />

          {userWarn === "" ? null : (
            <Typography
              sx={{
                fontFamily: "raleway",
                color: "orange",
                fontSize: 10,
                width: "100%",
                textAlign: "right",
              }}
            >
              {userWarn}
            </Typography>
          )}

          <TextField
            required
            {...register("username")}
            value={username}
            label="Username"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setUsername(event.target.value);
              setIsEnabled(false);
            }}
          />

          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">Sex</InputLabel>
            <Select
              {...register("sex")}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Sex"
              size="regular"
              value={user_sex}
              onChange={(event) => {
                setSex(event.target.value);
                setIsEnabled(false);
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ mb: 2, mt: 3, width: "100%" }}
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
              Profile Bio
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Divider />
            </Box>
          </Stack>

          <TextField
            {...register("bio_note")}
            required
            value={user_bio}
            label="Bio"
            multiline
            minRows={4}
            maxRows={6}
            onChange={(event) => {
              setBio(event.target.value);
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

export default EditUserForm;

const compStyle = {
  "main-container": {
    width: 550,
  },
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
