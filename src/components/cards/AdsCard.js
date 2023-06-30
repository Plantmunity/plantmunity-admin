import { Stack, Box, Typography, IconButton, Dialog } from "@mui/material";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import EditAdsDialog from "../dialogs/EditAdsDialog";
import DeleteAdsDialog from "../dialogs/DeleteAdsDialog";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AdsCard = ({
  image,
  name,
  title,
  type,
  link,
  status,
  email,
  contact,
  id,
  toast,
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <Box
      sx={{
        width: "95%",
        bgcolor: "white",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        boxShadow: "2.0px 2.0px 2.0px 2.0px hsl(0deg 0% 0% / 0.38)",
      }}
    >
      <Box sx={{ width: "100%", height: 200, bgcolor: "#BDBDBD" }}>
        <img
          src={image}
          alt={"ad_image"}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>
      <Stack
        direction={"column"}
        sx={{ width: "100%", p: 1, position: "relative" }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Arvo",
            fontWeight: "bold",
            color: "#5C6D63",
            mt: 1,
            width: "75%",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Arvo", color: "#5C6D63" }}
        >
          {type}
        </Typography>

        <Typography
          align="justify"
          variant="caption"
          sx={{ fontFamily: "raleway" }}
        >
          {link}
        </Typography>
        <IconButton
          onClick={handleOpenEdit}
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <BiEdit />
        </IconButton>
        <IconButton
          onClick={handleOpenDelete}
          sx={{ position: "absolute", top: 5, right: 35 }}
        >
          <MdDeleteOutline />
        </IconButton>
      </Stack>

      <Dialog
        maxWidth={false}
        scroll={"body"}
        open={openEdit}
        fullScreen={mobile}
        onClose={handleOpenEdit}
      >
        <EditAdsDialog
          handleClose={() => handleOpenEdit()}
          toast={(message) => toast(message)}
          ADid={id}
          ADtitle={title}
          ADlink={link}
          ADtype={type}
          ADimage={image}
          ADowner={name}
          ADcontact={contact}
          ADemail={email}
          ADstatus={status}
        />
      </Dialog>
      <Dialog
        maxWidth={false}
        scroll={"body"}
        open={openDelete}
        fullScreen={mobile}
        onClose={handleOpenDelete}
      >
        <DeleteAdsDialog
          handleClose={() => handleOpenDelete()}
          toast={(message) => toast(message)}
          id={id}
        />
      </Dialog>
    </Box>
  );
};

export default AdsCard;
