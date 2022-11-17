import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import * as React from 'react';

const HomeLogin = (props) => {
    const [currentTab, setCurrentTab] = React.useState(0);
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [connectStatus, setConnectStatus] = React.useState(false);

    const SigninPanel = (internal_props) => {
        const [usernameText, setUsernameText] = React.useState("");
        const [passwordText, setPasswordText] = React.useState("");

        //props.initSignin

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <TextField type="email" disabled={isConnecting} value={usernameText} onChange={(e) => { setUsernameText(e.target.value) }} sx={{ marginBottom: '10px', width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Email" variant="outlined" />
                <TextField type="password" disabled={isConnecting} value={passwordText} onChange={(e) => { setPasswordText(e.target.value) }} sx={{ width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Password" variant="outlined" />
                <LoadingButton disabled={(usernameText.trim().length == 0)} onClick={initiateSignIn} loading={isConnecting} startIcon={<LoginIcon />} sx={{ marginTop: '15px' }} variant="contained">Login</LoadingButton>
            </Box>
        )
    }

    const SignupPanel = (props) => {

    }

    const initiateSignIn = (data) => {

    }

    return (
        <Box sx={{ height: '100vh', maxHeight: '100vh' }}>
            <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={0} sm={0} md={3} lg={3} xl={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img src='/favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
                        <Typography sx={{ marginTop: '10px' }} variant='h4'>Floww</Typography>
                        <Typography variant='p'>Login</Typography>
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
                                <SigninPanel initSignIn={initiateSignIn} sx={{ display: (currentTab == 0 ? 'flex' : 'none') }}></SigninPanel>
                                <SignupPanel sx={{ display: (currentTab == 1 ? 'flex' : 'none') }}></SignupPanel>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomeLogin;