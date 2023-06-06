import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  Grid,
  DialogContent,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useUpdateProfileMutation } from "../../../app/services/accountApi";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const EditUserProfile = ({ handleClose, image, toast }) => {
  const ID = useSelector((state) => state.user.id);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [imageUpload, setImageUpload] = useState(image);
  const [isEnabled, setIsEnabled] = useState(true);

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
          setIsEnabled(false);
          //console.log(convertedImage)
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const [updateProfile] = useUpdateProfileMutation();

  const applyProfile = () => {
    const input = {
      id: ID,
      data: {
        profile_picture: imageUpload,
      },
    };

    updateProfile(input)
      .then((payload) => {
        toast(payload?.data?.message);
        handleClose();
      })
      .catch((error) => {
        //toast("Error has occured, please try again later.")
        console.error("rejected", error);
      });
  };

  return (
    <Stack
      direction="column"
      alignItems={"center"}
      sx={{ width: mobile ? "100%" : 550 }}
    >
      <Typography variant="h6" align="center" sx={compStyle["dialog-title"]}>
        Update Profile Picture
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Divider />
      </Box>

      <Grid
        container
        direction="column"
        alignItems={"center"}
        sx={{ width: "100%", height: "100%", p: 4, pt: 2 }}
      >
        {/* For Image preview*/}
        <Grid item>
          <Avatar
            src={imageUpload}
            alt="uploaded_image"
            sx={{ width: 250, height: 250, border: "5px solid #5C6D63" }}
          />
        </Grid>

        {/* For Uploading Image*/}
        <Grid item sx={{ mt: "-45px" }}>
          <DialogContent sx={{ overflow: "hidden" }}>
            <Tooltip title="Upload new picture">
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
                <PhotoCamera sx={{ color: "white", fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </DialogContent>
        </Grid>
      </Grid>

      <Typography variant="body1" align="center" sx={compStyle["dialog-text"]}>
        Your profile picture will be use as the avatar within the app as well.
      </Typography>

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
          onClick={() => applyProfile()}
          variant="contained"
          sx={compStyle["primary-button"]}
          disabled={isEnabled}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditUserProfile;

const compStyle = {
  "main-container": {
    width: 500,
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
    mt: "-20px",
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
};
