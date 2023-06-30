import React, { useState } from "react";
import ManageAdminTable from "../tables/ManageAdminTable";
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
import AddAdminDialog from "../dialogs/AddAdminDialog";

export default function ManageAdmin({ toast }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

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
          Admin Management
        </Typography>
        <Button
          onClick={() => handleOpenAdd()}
          startIcon={<MdOutlineAddCircleOutline style={{ color: "white" }} />}
          variant="contained"
          sx={{ textTransform: "none", color: "white", fontFamily: "Arvo" }}
        >
          Add admin
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
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            height: 500,
            mt: 4,
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "white",
            boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
          }}
        >
          <ManageAdminTable toast={(message) => toast(message)} />
        </Grid>

        <Dialog
          maxWidth={false}
          scroll={"body"}
          open={openAdd}
          onClose={handleOpenAdd}
        >
          <AddAdminDialog
            handleClose={() => handleOpenAdd()}
            toast={(message) => toast(message)}
          />
        </Dialog>
      </Grid>
    </Stack>
  );
}
