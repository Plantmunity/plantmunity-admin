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
import AddFaqDialog from "../dialogs/AddFaqDialog";
import { useGetFaqsQuery } from "../../app/services/landingApi";
import FaqCard from "../cards/FaqCard";

export default function ManageFAQs({ toast }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const { data, isFetching } = useGetFaqsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const faqsArray = data ? data.faqs : [];
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
          variant="h4"
          sx={{
            fontFamily: "Arvo",
            fontWeight: "bold",
            flexGrow: 1,
            ml: mobile ? 0 : 3,
          }}
        >
          FAQs Management
        </Typography>
        <Button
          onClick={() => handleOpenAdd()}
          startIcon={<MdOutlineAddCircleOutline style={{ color: "white" }} />}
          variant="contained"
          sx={{ textTransform: "none", color: "white", fontFamily: "Arvo" }}
        >
          Add FAQ
        </Button>
      </Stack>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        {faqsArray.map(({ answer, status, question, id }) => {
          return (
            <Box key={id} sx={{ width: "100%" }}>
              <FaqCard
                answer={answer}
                status={status}
                question={question}
                id={id}
                toast={(message) => toast(message)}
              />
            </Box>
          );
        })}
        <Dialog
          maxWidth={false}
          scroll={"body"}
          open={openAdd}
          onClose={handleOpenAdd}
        >
          <AddFaqDialog
            handleClose={() => handleOpenAdd()}
            toast={(message) => toast(message)}
          />
        </Dialog>
      </Grid>
    </Stack>
  );
}
