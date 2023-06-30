import React, { useState } from "react";
import {
  Grid,
  Dialog,
  Stack,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { MdOutlineAddCircleOutline } from "react-icons/md";
//For Responsivity

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AdsCard from "../cards/AdsCard";
import AddAdsDialog from "../dialogs/AddAdsDialog";
import { useGetAllAdsQuery } from "../../app/services/manageApi";

export default function ManageAdvertisement({ toast }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  const { data } = useGetAllAdsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Typography
          variant={mobile ? "body1" : small ? "h6" : "h4"}
          sx={{
            fontFamily: "Arvo",
            fontWeight: "bold",
            flexGrow: 1,
            ml: mobile ? 0 : 3,
          }}
        >
          Advertisements Management
        </Typography>
        <Button
          onClick={() => handleOpenAdd()}
          startIcon={<MdOutlineAddCircleOutline style={{ color: "white" }} />}
          variant="contained"
          sx={{ textTransform: "none", color: "white", fontFamily: "Arvo" }}
        >
          Add Ads
        </Button>
      </Stack>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        {data?.ads.map(
          ({ image, title, owner, link, id, status, email, type, contact }) => {
            return (
              <Grid
                key={id}
                item
                sx={{
                  width: mobile ? "100%" : small ? "50%" : "25%",
                  mt: 1,
                }}
              >
                <AdsCard
                  image={image}
                  link={link}
                  name={owner}
                  title={title}
                  status={status}
                  type={type}
                  email={email}
                  contact={contact}
                  id={id}
                  toast={(message) => toast(message)}
                />
              </Grid>
            );
          }
        )}
        <Dialog
          maxWidth={false}
          scroll={"body"}
          open={openAdd}
          onClose={handleOpenAdd}
          fullScreen={mobile}
        >
          <AddAdsDialog
            handleClose={() => handleOpenAdd()}
            toast={(message) => toast(message)}
          />
        </Dialog>
      </Grid>
    </Stack>
  );
}
