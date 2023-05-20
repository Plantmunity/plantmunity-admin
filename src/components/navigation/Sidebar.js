import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Title } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

// icons
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import { RiPlantFill } from 'react-icons/ri';
import { BsFillFilePostFill } from 'react-icons/bs';
import { Stack } from '@mui/material';
import Logo from '../../images/Background.png'

//components
import Dashboard from '../bodies/Dashboard';
import ManageUser from '../bodies/ManageUser';
import ManageAdmin from '../bodies/ManageAdmin';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedvalue] = useState(1);

    const handleMenuClick = (menuId) => {
        setSelectedvalue(menuId)
    }

    const menu = [
        {
            id: 1,
            title: "Dashboard"
        },
        {
            id: 2,
            title: "Concerns"
        },
        {
            id: 3,
            title: "Manage Posts"
        },
        {
            id: 4,
            title: "Manage Forum"
        },
        {
            id: 5,
            title: "Manage Products"
        },
        {
            id: 6,
            title: "User Accounts"
        },
        {
            id: 7,
            title: "Admin Accounts"
        },
        {
            id: 8,
            title: "FAQs"
        },

    ]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const iconChanger = (menuItem) => {
        if (menuItem === 1) {
            return <DashboardRoundedIcon sx={{ color: selectedValue === 1 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 2) {
            return <HelpRoundedIcon sx={{ color: selectedValue === 2 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 3) {
            return <BsFillFilePostFill style={{ fontSize: 23, color: selectedValue === 3 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 4) {
            return <ForumRoundedIcon sx={{ color: selectedValue === 4 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 5) {
            return <RiPlantFill style={{ fontSize: 23, color: selectedValue === 5 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 6) {
            return <PersonRoundedIcon sx={{ fontSize: 25, color: selectedValue === 6 ? "#bfcba5" : "#5c6d63" }} />
        } else if (menuItem === 7) {
            return <AdminPanelSettingsRoundedIcon sx={{ color: selectedValue === 7 ? "#bfcba5" : "#5c6d63" }}/>
        } else {
            return <LiveHelpRoundedIcon sx={{ color: selectedValue === 8 ? "#bfcba5" : "#5c6d63" }} />
        }
        
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: "#5c6d63" }} >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                            color: "white"
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack direction="row" alignItems="center" sx={{ width: "100%", height: 60 }}>
                        <Box sx={{ height: 45, width: 100 }}>
                            <img
                                src={Logo}
                                alt='plantmunity logo'
                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Avatar
                            alt="Admin profile"
                            src="https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/322488993_551869643477498_7530720587339957688_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFU6unFGhPrOxA0HHlOpLkl6tPvXZn6bE3q0-9dmfpsTf9HWYBvuX70CsjBXwUF81u_Olcs_NXZNxdtDn6UEqFC&_nc_ohc=qNyajEQuousAX_eWpb9&_nc_ht=scontent.fdvo2-2.fna&oh=00_AfADrZpJnGBFNtyWKjxN-SF0tpk5wU5AVyzwCzQor-ecgg&oe=64193C2F"
                            sx={{ width: 45, height: 45 }}
                        />

                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu.map(({ id, title }) => (
                        <ListItem key={id} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => handleMenuClick(id)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {iconChanger(id)}

                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontFamily: 'Raleway', fontWeight: "bold", color: selectedValue === id ? "#bfcba5" : "#5c6d63" }}>
                                            {title}
                                        </Typography>
                                    }
                                    sx={{ opacity: open ? 1 : 0, ml: open ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
                <DrawerHeader />
                <Box
                    sx={{
                        display: selectedValue === 1 ? "flex" : "none",
                        width: "100%",
                        height: 60
                    }}>
                    <Dashboard handleGoTo={(id)=>handleMenuClick(id)}/>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 2 ? "flex" : "none",
                        width: 100,
                        height: 60,
                    }}>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 3 ? "flex" : "none",
                        width: 100,
                        height: 60
                    }}>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 4 ? "flex" : "none",
                        width: 100,
                        height: 60
                    }}>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 5 ? "flex" : "none",
                        width: 100,
                        height: 60
                    }}>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 6 ? "flex" : "none",
                        width: "100%",
                        height: 60
                    }}>
                        <ManageUser handleGoTo={(id)=>handleMenuClick(id)}/>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 7 ? "flex" : "none",
                        width: "100%",
                        height: 60
                    }}>
                        <ManageAdmin handleGoTo={(id)=>handleMenuClick(id)}/>
                </Box>
                <Box
                    sx={{
                        display: selectedValue === 8 ? "flex" : "none",
                        width: "100%",
                        height: 90
                    }}>
                        
                </Box>

            </Box>
        </Box>
    );
}