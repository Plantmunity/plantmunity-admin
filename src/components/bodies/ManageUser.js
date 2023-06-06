import React, { useState } from "react";
import {
  Avatar,
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

import { useUnbanUserMutation } from "../../app/services/manageApi";
import AddReportNoteDialog from "../dialogs/AddReportNoteDialog";

import ReportedUsersTable from "../tables/ReportedUserTable";
import UsersTable from "../tables/UsersTable";
import { FaUserCircle } from "react-icons/fa";

const ManageUsers = ({ toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));

  const [value, setValue] = React.useState(1);
  const [unbanUser] = useUnbanUserMutation();

  const [openNote, setOpenNote] = useState(false);

  const handleOpenNote = () => {
    setOpenNote(!openNote);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setId("");
    setFirstname("");
    setLastname("");
    setUsername("");
    setDate("");
    setImage("");
    setBio("");
    setSex("");
    setShop("");
    setReports("");
    setReportsCount("");
    setStatus("");
  };
  const handleSucess = () => {
    setId("");
    setFirstname("");
    setLastname("");
    setUsername("");
    setDate("");
    setImage("");
    setBio("");
    setSex("");
    setShop("");
    setReports("");
    setReportsCount("");
    setStatus("");
  };

  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [reports, setReports] = useState([]);
  const [reportsCount, setReportsCount] = useState("");
  const [image, setImage] = useState("");

  const [date, setDate] = useState("");
  const [bio, setBio] = useState("");
  const [sex, setSex] = useState("");
  const [shop, setShop] = useState([]);

  const tags = shop.length === 0 ? "" : shop.tags;
  const shopTags = tags.split(",");

  const handleClick = (
    id,
    first_name,
    last_name,
    username,
    reports,
    reports_count,
    image
  ) => {
    setId(id);
    setFirstname(first_name);
    setLastname(last_name);
    setUsername(username);
    setReports(reports);
    setReportsCount(reports_count);
    setImage(image);
  };

  const handleClickUsers = (
    id,
    first_name,
    last_name,
    username,
    status,
    date,
    image,
    bio,
    sex,
    shop
  ) => {
    setId(id);
    setFirstname(first_name);
    setLastname(last_name);
    setUsername(username);
    setStatus(status);
    setDate(date);
    setImage(image);
    setBio(bio);
    setSex(sex === null ? "unidentified" : sex);
    setShop(shop === null ? [] : shop);
  };

  const time_stamp = new Date(date);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }

  const join =
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
          User Management
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
                Users
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
              <ReportedUsersTable
                handleClick={(
                  id,
                  first_name,
                  last_name,
                  username,
                  reports,
                  reports_count,
                  image
                ) =>
                  handleClick(
                    id,
                    first_name,
                    last_name,
                    username,
                    reports,
                    reports_count,
                    image
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
              <UsersTable
                handleClick={(
                  id,
                  first_name,
                  last_name,
                  username,
                  status,
                  date,
                  image,
                  bio,
                  sex,
                  shop
                ) =>
                  handleClickUsers(
                    id,
                    first_name,
                    last_name,
                    username,
                    status,
                    date,
                    image,
                    bio,
                    sex,
                    shop
                  )
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
              {username === "" ? (
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
                  <FaUserCircle style={{ fontSize: 80, color: "#B6C7AD" }} />
                  <Typography
                    variant="h5"
                    sx={{ mt: 1, fontFamily: "Raleway", color: "#B6C7AD" }}
                  >
                    Select a user
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Avatar src={image} sx={{ width: 100, height: 100 }} />
                  <Typography
                    variant={"h6"}
                    sx={{ fontFamily: "Arvo", mt: 1.5 }}
                  >
                    {firstname + " " + lastname}
                  </Typography>
                  <Typography variant={"body1"} sx={{ fontFamily: "Raleway" }}>
                    {"@" + username}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ width: "100%", mt: 2 }}
                  >
                    <Typography
                      variant={"body1"}
                      sx={{ fontFamily: "Raleway" }}
                    >
                      {" Reports (" + reportsCount + ")"}
                    </Typography>
                    <Box sx={{ flexGrow: 1, ml: 1, mr: 1 }}>
                      <Divider />
                    </Box>
                    <Button
                      onClick={handleOpenNote}
                      sx={{
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
                      Ban
                    </Button>
                  </Stack>

                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ width: "100%", mt: 3 }}
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
              {username === "" ? (
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
                  <FaUserCircle style={{ fontSize: 80, color: "#B6C7AD" }} />
                  <Typography
                    variant="h5"
                    sx={{ mt: 1, fontFamily: "Raleway", color: "#B6C7AD" }}
                  >
                    Select a user
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="column"
                  alignItems={"center"}
                  sx={{ width: "100%" }}
                >
                  <Avatar src={image} sx={{ width: 100, height: 100 }} />
                  <Typography
                    variant={"h6"}
                    sx={{ fontFamily: "Arvo", mt: 1.5 }}
                  >
                    {firstname + " " + lastname}
                  </Typography>
                  <Typography variant={"body1"} sx={{ fontFamily: "Raleway" }}>
                    {"@" + username}
                  </Typography>

                  {status === "Banned" ? (
                    <Button
                      onClick={() => {
                        unbanUser(id)
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
                        bgcolor: "white",
                        px: 3,
                        height: 30,
                        borderRadius: 2,
                        border: "1px solid green",
                        color: "green",
                        mt: 1,
                        "&:hover": {
                          bgcolor: "green",
                          color: "white",
                        },
                      }}
                    >
                      Unban
                    </Button>
                  ) : null}

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
                    {"Joined Plantmunity on"}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      ml: 1,
                    }}
                  >
                    {join}
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
                    {"Sex"}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    sx={{
                      fontFamily: "Raleway",
                      width: "100%",
                      ml: 1,
                    }}
                  >
                    {sex}
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
                    {"Bionote"}
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
                    {bio}
                  </Typography>

                  {shop.length === 0 ? (
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
                      {"No available shop"}
                    </Typography>
                  ) : (
                    <React.Fragment>
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
                        {"Shop"}
                      </Typography>
                      <Typography
                        variant={"body1"}
                        sx={{
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          width: "100%",
                          ml: 1,
                        }}
                      >
                        {shop?.shop_name}
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
                        {"Shop tags"}
                      </Typography>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        sx={{ width: "100%", mt: 1 }}
                      >
                        {shopTags.map((tag, index) => {
                          return (
                            <Grid
                              item
                              key={index}
                              sx={{
                                borderRadius: 5,
                                bgcolor: "#F5F5F7",
                                p: 0.2,
                                px: 2,
                                mr: 1,
                                mt: 1,
                                border: "1px solid #5C6D63",
                              }}
                            >
                              <Typography variant="caption">{tag}</Typography>
                            </Grid>
                          );
                        })}
                      </Grid>{" "}
                    </React.Fragment>
                  )}
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
          type={"user"}
          handleClose={() => handleOpenNote()}
          toast={(message) => toast(message)}
          handleSucess={() => handleSucess()}
        />
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
