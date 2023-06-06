import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { BsFillFilePostFill } from "react-icons/bs";
import PostsTable from "../tables/PostsTable";
import ReportedPostTable from "../tables/ReportedPostsTable";
import {
  useVerifyPostMutation,
  useVoidReportedPostMutation,
} from "../../app/services/manageApi";
import AddReportNoteDialog from "../dialogs/AddReportNoteDialog";
const ManagePost = ({ toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [openNote, setOpenNote] = useState(false);

  const handleOpenNote = () => {
    setOpenNote(!openNote);
  };

  const [voidReportedPost] = useVoidReportedPostMutation();
  const [verifyPost] = useVerifyPostMutation();

  const [value, setValue] = React.useState(1);

  const [id, setId] = useState("");

  const [reports, setReports] = useState([]);
  const [reportsCount, setReportsCount] = useState("");
  const [image, setImage] = useState("");

  const [date, setDate] = useState("");
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setId("");
    setDate("");
    setImage("");
    setCaption("");
    setUser("");
    setReports("");
    setReportsCount("");
  };

  const handleSucess = () => {
    setId("");
    setDate("");
    setImage("");
    setCaption("");
    setUser("");
    setReports("");
    setReportsCount("");
  };

  const handleClick = (
    id,
    image,
    caption,
    user,
    date,
    reports,
    reports_count
  ) => {
    setId(id);
    setImage(image);
    setCaption(caption);
    setUser(user);
    setDate(date);
    setReports(reports);
    setReportsCount(reports_count);
  };

  const handleClickPosts = (id, image, caption, user, date) => {
    setId(id);
    setImage(image);
    setDate(date);
    setCaption(caption);
    setUser(user);
  };

  const time_stamp = new Date(date);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  const posted =
    getMonthName(time_stamp.getMonth() + 1) +
    " " +
    time_stamp.getDate() +
    ", " +
    time_stamp.getFullYear();

  return (
    <Box sx={{ width: "100%" }}>
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
          Post Management
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          sx={{ width: 250 }}
        >
          <Tab
            value={1}
            label={
              <Typography
                variant="h6"
                sx={{ fontFamily: "Raleway", textTransform: "none" }}
              >
                Reported
              </Typography>
            }
          />
          <Tab
            value={2}
            label={
              <Typography
                variant="h6"
                sx={{ fontFamily: "Raleway", textTransform: "none" }}
              >
                Moderate
              </Typography>
            }
          />
        </Tabs>
      </Stack>

      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Box sx={{ p: 1, width: "70%" }}>
          {value === 1 ? (
            <Box
              sx={{
                width: "100%",
                bgcolor: "white",
                borderRadius: 3,
                mt: 2,
                py: 2,
                height: "70vh",
                overflow: "auto",
                boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
              }}
            >
              <ReportedPostTable
                handleClick={(
                  id,
                  image,
                  caption,
                  user,
                  date,
                  reports,
                  reports_count
                ) =>
                  handleClick(
                    id,
                    image,
                    caption,
                    user,
                    date,
                    reports,
                    reports_count
                  )
                }
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                bgcolor: "white",
                borderRadius: 3,
                mt: 2,
                py: 2,
                height: "70vh",
                overflow: "auto",
                boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
              }}
            >
              <PostsTable
                handleClick={(id, image, caption, user, date) =>
                  handleClickPosts(id, image, caption, user, date)
                }
              />
            </Box>
          )}
        </Box>
        <Box sx={{ p: 1, width: "30%" }}>
          {value === 1 ? (
            <Box
              sx={{
                width: "100%",
                bgcolor: "white",
                borderRadius: 3,
                mt: 2,
                p: 3,
                height: "70vh",
                overflow: "auto",
                boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
                position: "relative",
              }}
            >
              {id === "" ? (
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <BsFillFilePostFill
                    style={{ fontSize: 80, color: "#B6C7AD" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ mt: 1, fontFamily: "Raleway", color: "#B6C7AD" }}
                  >
                    Select a post
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Box sx={{ width: "100%", height: 150 }}>
                    <img
                      src={image}
                      alt={"post_photo"}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>

                  <Typography
                    variant={"body2"}
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      width: "100%",
                      color: "#7f7f7f",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    {"Caption"}
                  </Typography>

                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      p: 1,
                      border: "1px solid #E0E0E0",
                      borderRadius: 2,
                    }}
                  >
                    {caption}
                  </Typography>

                  <Stack direction="row" sx={{ width: "100%" }}>
                    <Stack direction="column">
                      <Typography
                        variant={"body2"}
                        sx={{
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          width: "100%",
                          color: "#7f7f7f",
                          mt: 2,
                        }}
                      >
                        {"Posted by"}
                      </Typography>

                      <Typography
                        variant={"body1"}
                        sx={{
                          fontFamily: "Raleway",
                          width: "100%",
                        }}
                      >
                        {user?.username}
                      </Typography>
                    </Stack>
                    <div style={{ flexGrow: 1 }} />
                    <Stack direction="column">
                      <Typography
                        variant={"body2"}
                        sx={{
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          width: "100%",
                          color: "#7f7f7f",
                          mt: 2,
                        }}
                      >
                        {"Posted on"}
                      </Typography>

                      <Typography
                        variant={"body1"}
                        sx={{
                          fontFamily: "Raleway",
                          width: "100%",
                        }}
                      >
                        {posted}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    variant={"body2"}
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      width: "100%",
                      color: "#7f7f7f",
                      mt: 2,
                    }}
                  >
                    {" Reports (" + reportsCount + ")"}
                  </Typography>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ width: "100%", mt: 1 }}
                  >
                    {reports.map(({ id, reason }) => {
                      return (
                        <Grid
                          item
                          key={id}
                          sx={{
                            mr: 1,
                            mt: 2,
                          }}
                        >
                          <Typography
                            variant={"caption"}
                            sx={{
                              py: 1,
                              px: 1,
                              fontFamily: "Arvo",
                              border: "1px solid black",
                              borderRadius: 5,
                            }}
                          >
                            {reason}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <Stack direction="row" aligntems="center" sx={{ mt: 5 }}>
                    <Button
                      onClick={handleOpenNote}
                      sx={{
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        textTransform: "none",
                        bgcolor: "white",
                        px: 3,
                        height: 30,
                        borderRadius: 2,
                        border: "1px solid red",
                        color: "red",
                        "&:hover": {
                          bgcolor: "red",
                          color: "white",
                        },
                      }}
                    >
                      Remove
                    </Button>

                    <Button
                      onClick={() => {
                        voidReportedPost(id)
                          .then((payload) => {
                            if (payload?.data?.status === 200) {
                              toast(payload?.data?.message);
                              handleSucess();
                            } else {
                              toast(payload?.data?.message);
                            }
                          })
                          .catch((error) => {
                            toast("Error has occured, try again later.");
                          });
                      }}
                      sx={{
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        textTransform: "none",
                        bgcolor: "white",
                        px: 3,
                        ml: 1,
                        height: 30,
                        borderRadius: 2,
                        border: "1px solid green",
                        color: "green",
                        "&:hover": {
                          bgcolor: "green",
                          color: "white",
                        },
                      }}
                    >
                      Void
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                bgcolor: "white",
                borderRadius: 3,
                mt: 2,
                p: 3,
                height: "70vh",
                overflow: "auto",
                boxShadow: "2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)",
                position: "relative",
              }}
            >
              {id === "" ? (
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <BsFillFilePostFill
                    style={{ fontSize: 80, color: "#B6C7AD" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ mt: 1, fontFamily: "Raleway", color: "#B6C7AD" }}
                  >
                    Select a post
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Box sx={{ width: "100%", height: 150 }}>
                    <img
                      src={image}
                      alt={"post_photo"}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>

                  <Typography
                    variant={"body2"}
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      width: "100%",
                      color: "#7f7f7f",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    {"Caption"}
                  </Typography>

                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      p: 1,
                      ml: 2,
                      border: "1px solid #E0E0E0",
                      borderRadius: 2,
                    }}
                  >
                    {caption}
                  </Typography>

                  <Typography
                    variant={"body2"}
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      width: "100%",
                      color: "#7f7f7f",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    {"Posted by"}
                  </Typography>

                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      ml: 2,
                    }}
                  >
                    {user?.username}
                  </Typography>

                  <Typography
                    variant={"body2"}
                    sx={{
                      fontFamily: "Raleway",
                      fontWeight: "bold",
                      width: "100%",
                      color: "#7f7f7f",
                      ml: 1,
                      mt: 2,
                    }}
                  >
                    {"Posted on"}
                  </Typography>

                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      ml: 2,
                    }}
                  >
                    {posted}
                  </Typography>

                  <Stack direction="row" aligntems="center" sx={{ mt: 5 }}>
                    <Button
                      onClick={handleOpenNote}
                      sx={{
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        textTransform: "none",
                        bgcolor: "white",
                        px: 3,
                        height: 30,
                        borderRadius: 2,
                        border: "1px solid red",
                        color: "red",
                        "&:hover": {
                          bgcolor: "red",
                          color: "white",
                        },
                      }}
                    >
                      Remove
                    </Button>

                    <Button
                      onClick={() => {
                        verifyPost(id)
                          .then((payload) => {
                            if (payload?.data?.status === 200) {
                              toast(payload?.data?.message);
                              handleSucess();
                            } else {
                              toast(payload?.data?.message);
                            }
                          })
                          .catch((error) => {
                            toast("Error has occured, try again later.");
                          });
                      }}
                      sx={{
                        fontFamily: "Raleway",
                        fontWeight: "bold",
                        textTransform: "none",
                        bgcolor: "white",
                        px: 3,
                        ml: 1,
                        height: 30,
                        borderRadius: 2,
                        border: "1px solid green",
                        color: "green",
                        "&:hover": {
                          bgcolor: "green",
                          color: "white",
                        },
                      }}
                    >
                      Verify
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Dialog
        maxWidth={false}
        scroll={"body"}
        open={openNote}
        onClose={handleOpenNote}
      >
        <AddReportNoteDialog
          id={id}
          type={"post"}
          handleClose={() => handleOpenNote()}
          toast={(message) => toast(message)}
          handleSucess={() => handleSucess()}
        />
      </Dialog>
    </Box>
  );
};

export default ManagePost;
