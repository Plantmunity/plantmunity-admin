import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  useRemoveForumMutation,
  useRemovePostMutation,
  useRemoveProductMutation,
  useBanUserMutation,
} from "../../app/services/manageApi";

//Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Schema: Rules for inputs
const schema = yup.object({
  remove_note: yup.string().required("note is required"),
});

const AddReportNoteDialog = ({
  id,
  type,
  handleClose,
  toast,
  handleSucess,
}) => {
  //For react hook form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [note, setNote] = useState("");

  const [removeForum] = useRemoveForumMutation();
  const [removePost] = useRemovePostMutation();
  const [removeProduct] = useRemoveProductMutation();
  const [banUser] = useBanUserMutation();

  const onSubmit = (data) => {
    const input = {
      id: id,
      data: data,
    };
    if (type === "post") {
      removePost(input)
        .then((payload) => {
          if (payload?.data?.status === 200) {
            toast(payload?.data?.message);
            handleSucess();
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
    } else if (type === "forum") {
      removeForum(input)
        .then((payload) => {
          if (payload?.data?.status === 200) {
            toast(payload?.data?.message);
            handleSucess();
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
    } else if (type === "product") {
      removeProduct(input)
        .then((payload) => {
          if (payload?.data?.status === 200) {
            toast(payload?.data?.message);
            handleSucess();
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
    } else if (type === "user") {
      banUser(input)
        .then((payload) => {
          if (payload?.data?.status === 200) {
            toast(payload?.data?.message);
            handleSucess();
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
    }
  };

  return (
    <Box sx={{ width: 500, position: "relative" }}>
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
        Report note
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            {...register("remove_note")}
            multiline
            required
            value={note}
            onChange={(event) => setNote(event.target.value)}
            label={"Note"}
            minRows={6}
            maxRows={10}
            sx={{ width: "100%" }}
          />

          <Stack
            direction="row"
            sx={{ mt: 2, alignItems: "right", width: "100%" }}
          >
            <Button
              onClick={() => handleClose()}
              sx={{
                width: "100%",
                border: "1px solid #6BAA79",
                color: "#6BAA79",
                "&:hover": {
                  bgcolor: "#B6C7AD",
                  color: "white",
                  border: "1px solid #B6C7AD",
                },
              }}
            >
              {"Cancel"}
            </Button>

            <Button
              type={"submit"}
              sx={{
                width: "100%",
                ml: 1,
                bgcolor: "#6BAA79",
                color: "white",
                "&:hover": { bgcolor: "#B6C7AD" },
              }}
            >
              {"Submit"}
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default AddReportNoteDialog;
