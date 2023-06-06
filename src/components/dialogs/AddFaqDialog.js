import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

//Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddFaqMutation } from "../../app/services/landingApi";

import { MdCancel } from "react-icons/md";

const AddFaqDialog = ({ toast, handleClose }) => {
  //Schema: Rules for inputs
  const schema = yup.object({
    question: yup.string(),
    answer: yup.string(),
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [addFaq] = useAddFaqMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addFaq(data)
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
        toast("An error has occured, please try again later.");
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
        Add FAQ
      </Typography>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" sx={{ width: "100%", p: 3 }}>
          <TextField
            {...register("question")}
            value={question}
            type="text"
            required
            label="Enter question"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />

          <TextField
            {...register("answer")}
            value={answer}
            multiline
            minRows={6}
            maxRows={8}
            type="text"
            required
            label="Enter answer"
            size="regular"
            inputProps={{ style: { fontFamily: "raleway" } }}
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
          />

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

export default AddFaqDialog;
