import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

//Form and Data Handling
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateFaqMutation } from "../../app/services/landingApi";

import { MdCancel } from "react-icons/md";

const EditFaqDialog = ({ toast, handleClose, ans, questn, stat, id }) => {
  //Schema: Rules for inputs
  const schema = yup.object({
    question: yup.string(),
    answer: yup.string(),
    status: yup.string(),
  });

  const [question, setQuestion] = useState(questn);
  const [answer, setAnswer] = useState(ans);
  const [status, setStatus] = useState(stat);

  const [updateFaq] = useUpdateFaqMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const input = {
      id: id,
      data: data,
    };
    updateFaq(input)
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
        Edit FAQ
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

          <FormControl variant="outlined" sx={{ width: "100%", mt: 2 }}>
            <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
            <Select
              {...register("status")}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Status"
              size="regular"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <MenuItem value={"Posted"}>Post</MenuItem>
              <MenuItem value={"Hidden"}>Hide</MenuItem>
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
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditFaqDialog;
