import React from "react";
import { Grid, Stack, Box, Divider, Typography } from "@mui/material";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useGetFeedbacksQuery } from "../../app/services/landingApi";
import FeedbackCards from "../cards/FeedbackCards";

export default function FeedbackViewer({ toast }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(700));
  const tablet = useMediaQuery(theme.breakpoints.down(1000));
  const medium = useMediaQuery(theme.breakpoints.down(1200));

  const { data } = useGetFeedbacksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const feedbacksArray = data ? data.feedbacks : [];

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
          Feedback Viewer
        </Typography>
      </Stack>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>
      <Grid
        container
        direction="row"
        sx={{
          width: "100%",
          mt: 2,
        }}
      >
        {feedbacksArray.map(({ user, id, feedback }) => {
          return (
            <Grid
              item
              key={id}
              sx={{
                mt: small ? 2 : 0,
                width: small
                  ? "100%"
                  : tablet
                  ? "50%"
                  : medium
                  ? "33.3%"
                  : "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FeedbackCards
                image={user?.profile_picture}
                name={user?.first_name + " " + user?.last_name}
                email={user?.email}
                feedback={feedback}
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
