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

import { Divider, IconButton, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { serverURL } from "./../middleware/FlowwServerParamConn";
import * as React from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

const HomeLogin = (props) => {
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [authStatus, setAuthStatus] = React.useState(0);
    const navigate = useNavigate();
    const linkLocation = useLocation()

    React.useEffect(() => {
        axios
            .post(`${serverURL}/api/auth/verify`,
                undefined,
                { withCredentials: true }
            )
            .then((res) => {
                setTimeout(() => {
                    setAuthStatus(2);
                }, 700);
            })
            .catch((res) => {
                setAuthStatus(1);
            })
    }, []);

    const SigninPanel = (internal_props) => {
        const [usernameText, setUsernameText] = React.useState("");
        const [passwordText, setPasswordText] = React.useState("");

        const initiateSignIn = () => {
            setIsConnecting(true);
            axios
                .post(`${serverURL}/api/auth/login`, {
                    email: usernameText,
                    password: passwordText
                }, { withCredentials: true })
                .then((res) => {
                    let forLink = new URLSearchParams(linkLocation.search).get('for');
                    forLink = (forLink === null) ? "" : forLink;
                    (forLink === "/" || forLink.trim() === "") ? navigate("/dashboard") : navigate(forLink);
                })
                .catch((res) => {
                    setTimeout(() => {
                        console.log(res);
                        setIsConnecting(false);
                        console.log("error sign in.");
                    }, 400);
                })
        }

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <TextField type="email" disabled={isConnecting} value={usernameText} onChange={(e) => { setUsernameText(e.target.value) }} sx={{ marginBottom: '10px', width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Email" variant="outlined" />
                <TextField type="password" disabled={isConnecting} value={passwordText} onChange={(e) => { setPasswordText(e.target.value) }} sx={{ width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Password" variant="outlined" />
                <LoadingButton disabled={(usernameText.trim().length === 0 || passwordText.trim().length === 0)} onClick={initiateSignIn} loading={isConnecting} startIcon={<LoginIcon />} sx={{ marginTop: '15px' }} variant="contained">Login</LoadingButton>
            </Box>
        )
    }

    const SignupPanel = (props) => {

    }

    const LoginPage = (internal_props) => {
        const [currentTab, setCurrentTab] = React.useState(0);
        return (
            <Box sx={{ height: '100%', maxHeight: '100%' }}>
                <Grid container sx={{ height: '100%', width: '100%' }}>
                    <Grid item xs={0} sm={0} md={3} lg={3} xl={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <img src='/favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
                                <Typography sx={{ marginTop: '10px' }} variant='h4'>Floww</Typography>
                                <Typography variant='p'>Login</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ flexGrow: 1, marginLeft: '5px' }} variant='p'>© Floww Authors</Typography>
                                <IconButton onClick={props.toggleTheme}><BrightnessMediumIcon/></IconButton>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider orientation='vertical' sx={{ marginRight: '-1px', display: { xs: 'none', md: 'block', lg: 'block' } }} />
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} >
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper sx={{ width: { xs: '100%', sm: '100%', md: '70%', lg: '70%' }, height: { xs: '100%', sm: '100%', md: '60%', lg: '60%' }, display: 'flex', flexDirection: 'column' }} elevation={3}>
                                <Tabs
                                    variant='fullWidth'
                                    value={currentTab}
                                    onChange={(e, newValue) => { setCurrentTab(newValue) }}
                                    aria-label="Vertical tabs example"
                                    sx={{ borderColor: 'divider', minHeight: '72px' }}
                                >
                                    <Tab icon={<LoginIcon />} label="Sign In" aria-label="Sign In" />
                                    <Tab icon={<PersonAddIcon />} label="Create Account" aria-label="Create Account" />
                                </Tabs>
                                <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: '10px' }}>
                                    <SigninPanel sx={{ display: (currentTab == 0 ? 'flex' : 'none') }}></SigninPanel>
                                    <SignupPanel sx={{ display: (currentTab == 1 ? 'flex' : 'none') }}></SignupPanel>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    const LoginSpinner = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6">⚡ Blazzzing through the Internet...</Typography>
                <LinearProgress sx={{ width: '80%' }} />
            </Box>
        )
    }

    switch (authStatus) {
        case 0: return (<LoginSpinner />)
        case 1: return (<LoginPage />)
        case 2: return (<Navigate to="/dashboard" />)
    }
}

export default HomeLogin;