/*
    Floww
    Copyright (C) 2022  Atheesh Thirumalairajan <howdy@atheesh.org>
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import FlowwDashboardHome from '../components/FlowwDashboardHome';
import FlowwDashboardDrawer from '../components/FlowwDashboardDrawer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider, ListItemIcon, ListItemText, alpha } from '@mui/material';
import axios from 'axios';
import { MD5 } from 'crypto-js';
import { serverURL } from '../middleware/FlowwServerParamConn';
import FlowwDashboardOrganizations from '../components/FlowwDashboardOrganizations';
import { getCurrentTheme } from '../middleware/FlowwAppThemeController';

const drawerWidth = 240;
const FlowwDashboard = (props) => {
    const { window } = props;
    const linkProps = useParams();
    const pageLocation = useLocation();
    const [userAvatar, setUserAvatar] = React.useState("");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState("Home");
    const [backdrop, setBackdrop] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;

    React.useEffect(() => {
        switch (linkProps["*"].split("/")[0]) {
            case 'home': return setCurrentPage('Home');
            case 'organizations': return setCurrentPage('Organizations');
            default: return setCurrentPage('Dashboard');
        }
    }, [pageLocation]);

    React.useEffect(() => {
        document.title = `Floww ??? ${currentPage}`
    }, [currentPage]);

    React.useEffect(() => {
        setUserAvatar(`https://www.gravatar.com/avatar/${MD5(props.userData.email.toLowerCase())}`)
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const AvatarMenu = (internal_props) => {
        const navigate = useNavigate();
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const logoutAction = () => {
            handleClose();
            setBackdrop(true);
            axios
                .post(
                    `${serverURL}/api/auth/logout`,
                    undefined,
                    { withCredentials: true }
                )
                .then((res) => {
                    setTimeout(() => {
                        navigate("/");
                        setBackdrop(false);
                    }, 1000);
                })
        }

        return (
            <Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClick}
                >
                    <Avatar sx={{ width: '40px', height: '40px' }} src={userAvatar}>{props.userData.name.charAt(0)}</Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem sx={{ opacity: '1 !important' }} disabled>
                        <Avatar sx={{ width: '35px', height: '35px', marginRight: '8px' }} src={userAvatar}>{props.userData.name.charAt(0)}</Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="p" component="div" sx={{ lineHeight: 'initial' }}>{props.userData.name}</Typography>
                            <Typography variant="caption" component="div" sx={{ lineHeight: 'initial', fontWeight: 'bold', color: 'text.disabled' }}>{props.userData.email}</Typography>
                        </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={props.toggleTheme}>
                        <ListItemIcon>
                            {(getCurrentTheme() === 'light') ? <DarkModeIcon /> : <LightModeIcon />}
                        </ListItemIcon>
                        <ListItemText>
                            {(getCurrentTheme() === 'light') ? "Dark Mode" : "Light Mode"}
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={{ ":hover": { color: 'error.dark', backgroundColor: (theme) => alpha(theme.palette.error.dark, 0.2) } }} onClick={logoutAction}>
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <LogoutIcon sx={{ color: 'inherit' }} />
                        </ListItemIcon>
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: '100%',
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ lineHeight: 'initial' }}>Floww</Typography>
                        <Typography variant="caption" component="div" sx={{ lineHeight: 'initial' }}>{currentPage}</Typography>
                    </Box>
                    <Box>
                        <AvatarMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {<FlowwDashboardDrawer onClose={handleDrawerToggle} currentPage={currentPage} />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {<FlowwDashboardDrawer currentPage={currentPage} />}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ width: '100%', maxHeight: 'calc(100vh - 64px)', overflow: 'hidden', p: 3 }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Navigate to="./home" />} />
                    <Route path="/home/*" element={<FlowwDashboardHome userData={props.userData} />} />
                    <Route path="/organizations/*" element={<FlowwDashboardOrganizations userData={props.userData} />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default FlowwDashboard;