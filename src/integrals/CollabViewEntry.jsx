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

import { io } from 'socket.io-client';
import { Divider, Typography } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import * as React from 'react';
import CollabView from './CollabView';

const CollabViewEntry = () => {
    const socket = io("https://192.168.29.229:5001", { path: '/cbv-socket' });
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [connectStatus, setConnectStatus] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('error');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [currentTab, setCurrentTab] = React.useState(0);
    const [joinName, setJoinName] = React.useState("");
    const [roomID, setRoomID] = React.useState("");

    const CreateRoomPanel = (internal_props) => {
        const [joinNameText, setJoinNameText] = React.useState("");

        const createRoom = () => {
            setIsConnecting(true);
            socket.emit('cbv-createRoom', (roomName) => {
                setTimeout(() => {
                    setRoomID(roomName);
                    setJoinName(joinNameText);
                    setConnectStatus(true);
                }, 1000);
            })
        }

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <Typography variant="h3" sx={{ marginBottom: '30px', display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>Create Room</Typography>
                <TextField disabled={isConnecting} value={joinNameText} onChange={(e) => { setJoinNameText(e.target.value) }} sx={{ width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Name" variant="outlined" />
                <LoadingButton disabled={(joinNameText.trim().length == 0)} onClick={createRoom} loading={isConnecting} startIcon={<AddIcon />} sx={{ marginTop: '15px' }} variant="contained">Create and Join Room</LoadingButton>
            </Box>
        )
    }

    const JoinRoomPanel = (internal_props) => {
        const [joinNameText, setJoinNameText] = React.useState("");
        const [roomIDText, setRoomIDText] = React.useState("");

        const joinRoom = () => {
            setIsConnecting(true);
            socket.emit("cbv-roomExists",
                roomIDText,
                (status) => {
                    if (status === true) {
                        setTimeout(() => {
                            setRoomID(roomIDText);
                            setJoinName(joinNameText);
                            setConnectStatus(true);
                        }, 1000);
                    } else {
                        setIsConnecting(false);
                        setAlertSeverity('error');
                        setAlertMessage(`Room ${roomIDText} does not exist.`)
                        setAlertOpen(true);
                    }
                }
            );
        }

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <Typography variant="h3" sx={{ marginBottom: '30px', display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>Join Room</Typography>
                <TextField disabled={isConnecting} value={roomIDText} onChange={(e) => { setRoomIDText(e.target.value) }} sx={{ width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' }, marginBottom: '10px' }} label="Room ID" variant="outlined" />
                <TextField disabled={isConnecting} value={joinNameText} onChange={(e) => { setJoinNameText(e.target.value) }} sx={{ width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' } }} label="Name" variant="outlined" />
                <LoadingButton onClick={joinRoom} disabled={(joinNameText.trim().length == 0) || (roomIDText.trim().length == 0)} loading={isConnecting} startIcon={<MeetingRoomIcon />} sx={{ marginTop: '15px' }} variant="contained">Join Room</LoadingButton>
            </Box>
        )
    }

    const VCFramework = (internal_props) => {
        React.useEffect(() => {
            socket.on('connect_error', () => {
                setAlertSeverity('error');
                setAlertMessage('Server Connection Failed!');
                setAlertOpen(true);
            });

            socket.on('connected', () => {
                setAlertOpen(false);
            })
        }, []);

        return (
            <Box sx={{ height: '100vh', maxHeight: '100vh' }}>
                <Grid container sx={{ height: '100%', width: '100%' }}>
                    <Grid item xs={0} sm={0} md={3} lg={3} xl={3} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img src='/favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
                            <Typography sx={{ marginTop: '10px' }} variant='h4'>Floww</Typography>
                            <Typography variant='p'>Virtual Classroom</Typography>
                        </Box>
                    </Grid>
                    <Divider orientation='vertical' sx={{ marginRight: '-1px', display: { xs: 'none', md: 'block', lg: 'block' } }} />
                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} >
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper sx={{ width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }, height: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }, display: 'flex', flexDirection: 'column' }} elevation={3}>
                                <Tabs
                                    variant='fullWidth'
                                    value={currentTab}
                                    onChange={(e, newValue) => { setCurrentTab(newValue) }}
                                    aria-label="Vertical tabs example"
                                    sx={{ borderColor: 'divider', minHeight: '72px' }}
                                >
                                    <Tab icon={<AddIcon />} label="Create new Room" aria-label="Create new Room" />
                                    <Tab icon={<MeetingRoomIcon />} label="Join existing Room" aria-label="Join existing Room" />
                                </Tabs>
                                <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' }, width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Typography sx={{ marginTop: '20px' }} variant='h4'>Floww</Typography>
                                    <Typography variant='p'>Virtual Classroom</Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: '10px' }}>
                                    <CreateRoomPanel sx={{ display: (currentTab == 0 ? 'flex' : 'none') }}></CreateRoomPanel>
                                    <JoinRoomPanel sx={{ display: (currentTab == 1 ? 'flex' : 'none') }}></JoinRoomPanel>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => { setAlertOpen(!alertOpen) }}>
                    <Alert severity={alertSeverity} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Box>)
    }

    return (
        (connectStatus == true) ?
            <CollabView socketIO={socket} myName={joinName} roomName={roomID} /> :
            <VCFramework />
    )
}

export default CollabViewEntry;