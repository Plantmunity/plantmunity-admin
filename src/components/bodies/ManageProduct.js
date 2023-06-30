import React, { useState } from "react";
import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import AddReportNoteDialog from "../dialogs/AddReportNoteDialog";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useVerifyProductMutation } from "../../app/services/manageApi";
import { RiPlantFill } from "react-icons/ri";
import ProductsTable from "../tables/ProductsTable";

const ManageProduct = ({ toast }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));
  const medium = useMediaQuery(theme.breakpoints.down(1100));

  const [verifyProduct] = useVerifyProductMutation();

  const [openNote, setOpenNote] = useState(false);

  const handleOpenNote = () => {
    setOpenNote(!openNote);
  };

  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState([]);

  const handleClick = (id, image, title, description, user, date) => {
    setId(id);
    setImage(image);
    setDate(date);
    setTitle(title);
    setDescription(description);
    setUser(user);
  };

  const handleSucess = () => {
    setId("");
    setImage("");
    setDate("");
    setTitle("");
    setDescription("");
    setUser([]);
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
      <Typography
        variant={mobile ? "body1" : small ? "h6" : "h4"}
        sx={{
          fontFamily: "Arvo",
          fontWeight: "bold",
          flexGrow: 1,
          ml: mobile ? 0 : 3,
        }}
      >
        Product Management
      </Typography>

      <Box sx={{ width: "100%", mt: 1 }}>
        <Divider />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: small ? "column" : "row",
        }}
      >
        <Box sx={{ p: 1, width: small ? "100%" : medium ? "60%" : "70%" }}>
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
            <ProductsTable
              handleClick={(
                id,
                image,
                title,
                description,
                user,
                date,
                reports,
                reports_count
              ) =>
                handleClick(
                  id,
                  image,
                  title,
                  description,
                  user,
                  date,
                  reports,
                  reports_count
                )
              }
            />
          </Box>
        </Box>
        <Box sx={{ p: 1, width: small ? "100%" : medium ? "40%" : "30%" }}>
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
                  width: "100%",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <RiPlantFill
                  style={{
                    fontSize: mobile ? 50 : small ? 70 : 80,
                    color: "#B6C7AD",
                  }}
                />
                <Typography
                  align={"center"}
                  variant={mobile ? "h6" : "h5"}
                  sx={{ mt: 1, fontFamily: "Raleway", color: "#B6C7AD" }}
                >
                  Select a product
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
                    alt={"product_photo"}
                    src={image}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>

                <Typography
                  variant={"caption"}
                  sx={{
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                    width: "100%",
                    color: "#7f7f7f",
                    mt: 2,
                  }}
                >
                  {"Title"}
                </Typography>

                <Typography
                  variant={"body2"}
                  sx={{
                    fontFamily: "Raleway",
                    width: "100%",
                    mt: 0.5,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant={"caption"}
                  sx={{
                    fontFamily: "Raleway",
                    fontWeight: "bold",
                    width: "100%",
                    color: "#7f7f7f",
                    mt: 2,
                  }}
                >
                  {"Description"}
                </Typography>

                <Typography
                  align={"justify"}
                  variant={"body2"}
                  sx={{
                    fontFamily: "Raleway",
                    width: "100%",
                    mt: 0.5,
                  }}
                >
                  {description}
                </Typography>

                <Stack direction="row" sx={{ width: "100%", mt: 1 }}>
                  <Stack direction="column">
                    <Typography
                      variant={"caption"}
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
                      variant={"body2"}
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
                      variant={"caption"}
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
                      variant={"body2"}
                      sx={{
                        fontFamily: "Raleway",
                        width: "100%",
                      }}
                    >
                      {posted}
                    </Typography>
                  </Stack>
                </Stack>

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
                      verifyProduct(id)
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
          type={"product"}
          handleClose={() => handleOpenNote()}
          toast={(message) => toast(message)}
          handleSucess={() => handleSucess()}
        />
      </Dialog>
    </Box>
  );
};

export default ManageProduct;
