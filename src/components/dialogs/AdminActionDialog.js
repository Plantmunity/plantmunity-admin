import {
  Box,
  Button,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { MdCancel } from "react-icons/md";

import {
  useDeactivateAdminMutation,
  useReactivateAdminMutation,
  useDeleteAdminMutation,
} from "../../app/services/manageApi";

const AdminActionDialog = ({
  name,
  id,
  image,
  toast,
  handleClose,
  type,
  status,
}) => {
  const [deactivateAdmin] = useDeactivateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [reactivateAdmin] = useReactivateAdminMutation();
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
        Account action
      </Typography>

      <Stack
        direction="column"
        alignItems={"center"}
        sx={{
          width: "100%",
          borderBottom: "1px solid #E0E0E0",
          p: 3,
        }}
      >
        <Avatar
          src={image}
          alt={"Profile_Photo"}
          sx={{ width: 100, height: 100 }}
        />
        <Typography
          variant="h6"
          align="center"
          sx={{
            width: "100%",
            fontFamily: "Raleway",
            mt: 1,
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            width: "100%",
            fontFamily: "Raleway",
            mb: 3,
          }}
        >
          {"(" + type + ")"}
        </Typography>

        {status === "Deleted" ? (
          <Typography
            variant="body1"
            align="center"
            sx={{
              width: "100%",
              fontFamily: "Raleway",
              mb: 2,
            }}
          >
            {"Sorry, this account is already deleted."}
          </Typography>
        ) : null}
        {status === "Deleted" ? null : (
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: "70%", mt: 2 }}
          >
            <Button
              onClick={() => {
                deleteAdmin(id)
                  .then((payload) => {
                    if (payload?.data?.status === 200) {
                      toast(payload?.data?.message);
                      handleClose();
                    } else {
                      toast(payload?.data?.message);
                      handleClose();
                    }
                  })
                  .catch((error) => {
                    toast("Error has occured, try again later.");
                    handleClose();
                  });
              }}
              sx={{
                width: "100%",
                height: 50,
                borderRadius: 2,
                border: "1px solid red",
                color: "red",
                bgcolor: "white",
                "&:hover": { bgcolor: "red", color: "white" },
              }}
            >
              Delete
            </Button>
            {status === "Deactivated" ? (
              <Button
                onClick={() => {
                  reactivateAdmin(id)
                    .then((payload) => {
                      if (payload?.data?.status === 200) {
                        toast(payload?.data?.message);
                        handleClose();
                      } else {
                        toast(payload?.data?.message);
                        handleClose();
                      }
                    })
                    .catch((error) => {
                      toast("Error has occured, try again later.");
                      handleClose();
                    });
                }}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  height: 50,
                  border: "1px solid #5F8085",
                  color: "white",
                  bgcolor: "#5F8085",
                  ml: 1,
                  "&:hover": { bgcolor: "#5C6D63", color: "white" },
                }}
              >
                Reactivate
              </Button>
            ) : (
              <Button
                onClick={() => {
                  deactivateAdmin(id)
                    .then((payload) => {
                      if (payload?.data?.status === 200) {
                        toast(payload?.data?.message);
                        handleClose();
                      } else {
                        toast(payload?.data?.message);
                        handleClose();
                      }
                    })
                    .catch((error) => {
                      toast("Error has occured, try again later.");
                      handleClose();
                    });
                }}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  height: 50,
                  border: "1px solid #5F8085",
                  color: "white",
                  bgcolor: "#5F8085",
                  ml: 1,
                  "&:hover": { bgcolor: "#5C6D63", color: "white" },
                }}
              >
                Deactivate
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default AdminActionDialog;
