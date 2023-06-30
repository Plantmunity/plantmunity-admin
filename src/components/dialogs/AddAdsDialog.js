import {
  Box,
  Button,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddAdsMutation } from "../../app/services/manageApi";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { RiPlantFill } from "react-icons/ri";

//Schema: Rules for inputs
const schema = yup.object({
  title: yup.string().required(),
  link: yup.string().required(),
  type: yup.string().required(),
  owner: yup.string().required(),
  email: yup.string().required(),
  contact: yup.string().required(),
});

const AddAdsDialog = ({ handleClose, toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [imageUpload, setImageUpload] = useState("");
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("square");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        //console.log(e.target.result)
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let toBeUploaded = new Image();
        toBeUploaded.src = e.target.result;

        toBeUploaded.onload = function () {
          canvas.width = toBeUploaded.width;
          canvas.height = toBeUploaded.height;
          ctx.drawImage(toBeUploaded, 0, 0);

          const convertedImage = canvas.toDataURL(`image/webp`, 0.7);
          setImageUpload(convertedImage);
          setUpload(true);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [addAds] = useAddAdsMutation();

  const onSubmit = (data) => {
    setLoading(true);
    const input = {
      title: data.title,
      link: data.link,
      type: data.type,
      owner: data.owner,
      contact: data.contact,
      email: data.email,
      image: imageUpload,
    };

    addAds(input)
      .then((payload) => {
        console.log(payload);
        toast("Ads successfully submitted");
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        toast("Error has occured, try again later.");
        setLoading(false);
        handleClose();
      });
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
          display: mobile ? "none" : "flex",
        }}
      >
        Create Ads
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
            Create Ads
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
            Save
          </Button>
        </Stack>

        <Stack
          direction="column"
          sx={{ width: "100%", pl: 5, pr: 5, mt: { xs: 10, sm: 8, md: 3 } }}
        >
          <Grid
            container
            direction="column"
            alignItems={"center"}
            sx={{ width: "100%", height: "100%" }}
          >
            {/* For Image preview*/}
            <Grid
              item
              sx={{
                width: "100%",
                height: 180,
                borderRadius: 3,
                overflow: "hidden",
                border: "2px solid #5C6D63",
                display: upload ? "flex" : "none",
              }}
            >
              <img
                src={imageUpload}
                alt="uploaded_image"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>

            <Grid
              item
              sx={{
                width: "100%",
                height: 180,
                borderRadius: 3,
                overflow: "hidden",
                border: "2px solid #5C6D63",
                display: upload ? "none" : "display",
              }}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                sx={{ height: "100%" }}
              >
                <Stack
                  direction="column"
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <RiPlantFill style={{ fontSize: 100, color: "#5C6D63" }} />
                </Stack>
              </Stack>
            </Grid>

            {/* For Uploading Image*/}
            <Grid
              item
              sx={{
                marginTop: "-40px",
              }}
            >
              <DialogContent sx={{ overflow: "hidden" }}>
                <Tooltip title="Upload Logo">
                  <IconButton
                    aria-label="upload picture"
                    component="label"
                    sx={{ backgroundColor: "#5C6D63" }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <PhotoCamera sx={{ color: "white", fontSize: 23 }} />
                  </IconButton>
                </Tooltip>
              </DialogContent>
            </Grid>
          </Grid>

          <TextField
            {...register("title")}
            required
            value={title}
            label="Ads title"
            variant="outlined"
            sx={compStyle["input-field"]}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <TextField
            sx={{ mt: 1 }}
            {...register("link")}
            value={link}
            label="Redirection link"
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />

          <FormControl variant="outlined" sx={{ width: "100%", mt: 3 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Type/Size
            </InputLabel>
            <Select
              {...register("type")}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Type/Size"
              size="regular"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <MenuItem value={"square"}>Square|200x200 </MenuItem>
              <MenuItem value={"half_page"}>Half Page|300x600</MenuItem>
              <MenuItem value={"large_rectangle"}>
                Large Rectangle|336x280
              </MenuItem>
              <MenuItem value={"large_leaderboard"}>
                Large Leaderboard|90x970
              </MenuItem>
              <MenuItem value={"vertical_banner"}>
                Vertical Banner|120x240
              </MenuItem>
              <MenuItem value={"portrait"}>Portrait|300x1050</MenuItem>
              <MenuItem value={"billboard"}>Billboard|970x250</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ mt: 2 }}
            {...register("owner")}
            value={owner}
            label="Customer/Company name"
            onChange={(event) => {
              setOwner(event.target.value);
            }}
          />

          <TextField
            sx={{ mt: 2 }}
            {...register("contact")}
            value={contact}
            label="Contact"
            onChange={(event) => {
              setContact(event.target.value);
            }}
          />

          <TextField
            sx={{ mt: 2 }}
            type={"email"}
            {...register("email")}
            value={email}
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
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
            {loading ? <ClipLoader color={"white"} size={25} /> : "Save"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddAdsDialog;

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
