import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  IconButton,
} from "@mui/material";

//Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddAdminMutation } from "../../app/services/manageApi";

import { MdCancel } from "react-icons/md";

const AddAdminDialog = ({ toast, handleClose }) => {
  //Schema: Rules for inputs
  const schema = yup.object({
    first_name: yup.string(),
    middle_name: yup.string(),
    last_name: yup.string(),
    address: yup.string(),
    contact: yup.string(),
    email: yup.string().email(),
    username: yup.string(),
    type: yup.string(),
  });

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("Admin");
  const [emailWarn, setEmailWarn] = useState("");
  const [userWarn, setUserWarn] = useState("");

  const [addAdmin] = useAddAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addAdmin(data)
      .then((payload) => {
        if (payload?.data?.status === 409.1) {
          setUserWarn(payload?.data?.message);
          setEmailWarn("");
        } else if (payload?.data?.status === 409.2) {
          setEmailWarn(payload?.data?.message);
          setUserWarn("");
        } else {
          toast(payload?.data?.message);
          setUserWarn("");
          setEmailWarn("");
          handleClose();
        }
      })
      .catch((error) => {
        toast("An error has occured, please try again later.");
        setUserWarn("");
        setEmailWarn("");
        handleClose();
      });
  };

  return (
    <Box sx={{ width: 500, position: "relative" }}>
      <IconButton
        onClick={() => handleClose()}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <MdCancel />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          borderBottom: " 1px solid #E0E0E0",
          p: 2,
          px: 3,
          fontFamily: "Arvo",
        }}
      >
        Admin
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" sx={{ width: "100%", p: 3 }}>
          <Stack direction="row" sx={{ width: "100%" }}>
            <TextField
              {...register("first_name")}
              type="text"
              required
              value={firstName}
              label="First name"
              size="regular"
              inputProps={{ style: { fontFamily: "raleway" } }}
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />

            <TextField
              {...register("middle_name")}
              value={middleName}
              type="text"
              label="Middle name"
              size="regular"
              inputProps={{ style: { fontFamily: "raleway" } }}
              variant="outlined"
              sx={{ width: "100%", ml: 2 }}
              onChange={(event) => {
                setMiddleName(event.target.value);
              }}
            />
          </Stack>

          <TextField
            {...register("last_name")}
            value={lastName}
            type="text"
            required
            label="Last name"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />

          {userWarn === "" ? null : (
            <Typography
              sx={{
                fontFamily: "raleway",
                color: "orange",
                fontSize: 10,
                mt: 2,
                width: "100%",
                textAlign: "right",
              }}
            >
              {userWarn}
            </Typography>
          )}

          <TextField
            {...register("username")}
            value={username}
            type="text"
            required
            label="Username"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: userWarn === "" ? 2 : 0 }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <TextField
            {...register("address")}
            value={address}
            type="text"
            required
            label="Address"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />

          <TextField
            {...register("contact")}
            value={contact}
            type="text"
            required
            label="Contact"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />

          {emailWarn === "" ? null : (
            <Typography
              sx={{
                fontFamily: "raleway",
                color: "orange",
                fontSize: 10,
                mt: 2,
                width: "100%",
                textAlign: "right",
              }}
            >
              {emailWarn}
            </Typography>
          )}

          <TextField
            {...register("email")}
            value={email}
            type="email"
            label="Email"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: emailWarn === "" ? 2 : 0 }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <FormControl variant="outlined" sx={{ width: "100%", mt: 2 }}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
              {...register("type")}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Type"
              size="regular"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <MenuItem value={"Admin"}>User Admin</MenuItem>
              <MenuItem value={"Moderator"}>Content Moderator</MenuItem>
              <MenuItem value={"SA"}>Super Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant={"contained"}
            type="submit"
            sx={{
              mt: 3,
              mb: 1,
              textTransform: "none",
              color: "white",
              fontFamily: "Arvo",
            }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddAdminDialog;
