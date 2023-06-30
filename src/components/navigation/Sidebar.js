import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Dialog,
  Divider,
  MenuItem,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material/";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

//For notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import { RiPlantFill } from "react-icons/ri";
import { BsFillFilePostFill, BsMegaphoneFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { Stack } from "@mui/material";
import Logo from "../../images/Background.png";
import { BiLogOut, BiUser } from "react-icons/bi";

import { useSelector } from "react-redux";

//components
import Dashboard from "../bodies/Dashboard";
import ManageUser from "../bodies/ManageUser";
import ManageAdmin from "../bodies/ManageAdmin";
import LogOutDialog from "../dialogs/LogOutDialog";
import Concern from "../bodies/Concern";
import ManagePost from "../bodies/ManagePost";
import ManageForum from "../bodies/ManageForum";
import ManageProduct from "../bodies/ManageProduct";
import ManageFAQs from "../bodies/ManageFAQs";
import FeedbackViewer from "../bodies/FeedbackViewer";
import ViewAccountDialog from "../dialogs/ViewAccountDialog";
import ManageAdvertisement from "../bodies/ManageAdvertisement";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedvalue] = useState(1);

  const handleMenuClick = (menuId) => {
    setSelectedvalue(menuId);
  };

  //initializing a toast as a function that will be dynamic depending on the action done by the user.
  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const profile = useSelector((state) => state.user.image);
  const fname = useSelector((state) => state.user.first_name);
  const lname = useSelector((state) => state.user.last_name);
  const fullname = fname + " " + lname;
  const email = useSelector((state) => state.user.email);
  const type = useSelector((state) => state.user.type);
  const typeIdentifier =
    type === "Admin"
      ? "SA-Admin"
      : type === "Moderator"
      ? "SA-Moderator"
      : "SA";

  const settings = ["Account", "Logout"];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openLogOut, setOpenLogOut] = useState(false);

  const handleLogOut = () => {
    setOpenLogOut(!openLogOut);
  };
  const [openAccount, setOpenAccount] = useState(false);

  const handleAccount = () => {
    setOpenAccount(!openAccount);
  };

  const menu = [
    {
      type: "all",
      id: 1,
      title: "Dashboard",
    },
    {
      type: "all",
      id: 2,
      title: "Concerns",
    },
    {
      type: "SA-Moderator",
      id: 3,
      title: "Manage Posts",
    },
    {
      type: "SA-Moderator",
      id: 4,
      title: "Manage Forum",
    },
    {
      type: "SA-Moderator",
      id: 5,
      title: "Manage Products",
    },
    {
      type: "SA-Admin",
      id: 6,
      title: "User Accounts",
    },
    {
      type: "SA",
      id: 7,
      title: "Admin Accounts",
    },
    {
      type: "all",
      id: 10,
      title: "Advertisements",
    },
    {
      type: "SA-Admin",
      id: 8,
      title: "FAQs Management",
    },
    {
      type: "SA-Admin",
      id: 9,
      title: "Feedbacks",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconChanger = (menuItem) => {
    if (menuItem === 1) {
      return (
        <DashboardRoundedIcon
          sx={{ color: selectedValue === 1 ? "#bfcba5" : "#5c6d63" }}
        />
      );
    } else if (menuItem === 2) {
      return (
        <HelpRoundedIcon
          sx={{ color: selectedValue === 2 ? "#bfcba5" : "#5c6d63" }}
        />
      );
    } else if (menuItem === 3) {
      return (
        <BsFillFilePostFill
          style={{
            fontSize: 23,
            color: selectedValue === 3 ? "#bfcba5" : "#5c6d63",
          }}
        />
      );
    } else if (menuItem === 4) {
      return (
        <ForumRoundedIcon
          sx={{ color: selectedValue === 4 ? "#bfcba5" : "#5c6d63" }}
        />
      );
    } else if (menuItem === 5) {
      return (
        <RiPlantFill
          style={{
            fontSize: 23,
            color: selectedValue === 5 ? "#bfcba5" : "#5c6d63",
          }}
        />
      );
    } else if (menuItem === 6) {
      return (
        <PersonRoundedIcon
          sx={{
            fontSize: 26,
            color: selectedValue === 6 ? "#bfcba5" : "#5c6d63",
          }}
        />
      );
    } else if (menuItem === 7) {
      return (
        <AdminPanelSettingsRoundedIcon
          sx={{ color: selectedValue === 7 ? "#bfcba5" : "#5c6d63" }}
        />
      );
    } else if (menuItem === 9) {
      return (
        <MdFeedback
          style={{
            fontSize: 23,
            color: selectedValue === 9 ? "#bfcba5" : "#5c6d63",
          }}
        />
      );
    } else if (menuItem === 10) {
      return (
        <BsMegaphoneFill
          style={{
            fontSize: 19,
            color: selectedValue === 10 ? "#bfcba5" : "#5c6d63",
          }}
        />
      );
    } else {
      return (
        <LiveHelpRoundedIcon
          sx={{ color: selectedValue === 8 ? "#bfcba5" : "#5c6d63" }}
        />
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#5C6D63" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ width: "100%", height: 60 }}
          >
            <Box sx={{ height: 45, width: 120 }}>
              <img
                src={Logo}
                alt="plantmunity logo"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={fname} src={profile} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography
                  variant="body1"
                  sx={{
                    px: 3,
                    pb: 0,
                    pt: 1,
                    fontFamily: "Arvo",
                    fontWeight: "bold",
                  }}
                >
                  {fullname}
                </Typography>
                <Typography
                  variant="BODY2"
                  sx={{
                    px: 3,
                    pb: 1,
                    fontFamily: "raleway",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  {email}
                </Typography>

                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setting === "Logout" ? handleLogOut() : handleAccount();
                    }}
                    sx={{ mt: setting === "Account" ? 2 : 0.5 }}
                  >
                    <Stack direction="row" alignItems="center">
                      {setting === "Logout" ? (
                        <BiLogOut style={{ fontSize: 22 }} />
                      ) : (
                        <BiUser style={{ fontSize: 22 }} />
                      )}

                      <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                          ml: 1,
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                        }}
                      >
                        {setting}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map(({ id, title, type }) =>
            type === typeIdentifier ||
            type === "all" ||
            typeIdentifier === "SA" ? (
              <ListItem key={id} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleMenuClick(id)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {iconChanger(id)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: "Raleway",
                          fontWeight: "bold",
                          color: selectedValue === id ? "#bfcba5" : "#5c6d63",
                        }}
                      >
                        {title}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0, ml: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ width: small ? "90%" : "100%", p: 3, pt: 0 }}>
        <DrawerHeader />

        {selectedValue === 1 ? (
          <Dashboard handleGoTo={(id) => handleMenuClick(id)} />
        ) : selectedValue === 2 ? (
          <Concern toast={(message) => notify(message)} />
        ) : selectedValue === 3 ? (
          <ManagePost toast={(message) => notify(message)} />
        ) : selectedValue === 4 ? (
          <ManageForum toast={(message) => notify(message)} />
        ) : selectedValue === 5 ? (
          <ManageProduct toast={(message) => notify(message)} />
        ) : selectedValue === 6 ? (
          <ManageUser toast={(message) => notify(message)} />
        ) : selectedValue === 7 ? (
          <ManageAdmin toast={(message) => notify(message)} />
        ) : selectedValue === 8 ? (
          <ManageFAQs toast={(message) => notify(message)} />
        ) : selectedValue === 9 ? (
          <FeedbackViewer toast={(message) => notify(message)} />
        ) : selectedValue === 10 ? (
          <ManageAdvertisement toast={(message) => notify(message)} />
        ) : null}
      </Box>

      <Dialog open={openLogOut} onClose={handleLogOut} maxWidth={false}>
        <LogOutDialog handleClose={() => handleLogOut()} />
      </Dialog>

      <Dialog open={openAccount} onClose={handleAccount} maxWidth={false}>
        <ViewAccountDialog
          handleClose={() => handleAccount()}
          toast={(message) => notify(message)}
        />
      </Dialog>
    </Box>
  );
}
