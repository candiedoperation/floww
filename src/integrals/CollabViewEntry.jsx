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
    const socket = io("http://192.168.29.229:3001", { path: '/cbv-socket' });
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [connectStatus, setConnectStatus] = React.useState(false);
    const [joinName, setJoinName] = React.useState("");
    const [roomID, setRoomID] = React.useState("");

    const CreateRoomPanel = (internal_props) => {
        const [joinNameText, setJoinNameText] = React.useState("");

        const createRoom = () => {
            setIsConnecting(true);
            socket.emit('cbv-createRoom', (roomName) => {
                console.log(roomName);
                setRoomID(roomName);
                setJoinName(joinNameText);
                setConnectStatus(true);
            })
        }

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <TextField disabled={isConnecting} value={joinNameText} onChange={(e) => { setJoinNameText(e.target.value) }} sx={{ width: '50%' }} label="Name" variant="outlined" />
                <LoadingButton disabled={(joinNameText.trim().length == 0)} onClick={createRoom} loading={isConnecting} startIcon={<AddIcon />} sx={{ marginTop: '15px' }} variant="contained">Create and Join Room</LoadingButton>
            </Box>
        )
    }

    const JoinRoomPanel = (internal_props) => {
        const [joinNameText, setJoinNameText] = React.useState("");
        const [roomIDText, setRoomIDText] = React.useState("");

        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px' }}>
                <TextField disabled={isConnecting} value={roomIDText} onChange={(e) => { setRoomIDText(e.target.value) }} sx={{ width: '50%', marginBottom: '10px' }} label="Room ID" variant="outlined" />
                <TextField disabled={isConnecting} value={joinNameText} onChange={(e) => { setJoinNameText(e.target.value) }} sx={{ width: '50%' }} label="Name" variant="outlined" />
                <LoadingButton disabled={(joinNameText.trim().length == 0) || (roomIDText.trim().length == 0)} loading={isConnecting} startIcon={<MeetingRoomIcon />} sx={{ marginTop: '15px' }} variant="contained">Join Room</LoadingButton>
            </Box>
        )
    }

    const VCFramework = (internal_props) => {
        const [alertOpen, setAlertOpen] = React.useState(false);
        const [alertSeverity, setAlertSeverity] = React.useState('error');
        const [alertMessage, setAlertMessage] = React.useState('');
        const [currentTab, setCurrentTab] = React.useState(0);

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
                    <Grid item xs={3}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img src='/favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
                            <Typography sx={{ marginTop: '10px' }} variant='h4'>Floww</Typography>
                            <Typography variant='p'>Virtual Classroom</Typography>
                        </Box>
                    </Grid>
                    <Divider orientation='vertical' sx={{ marginRight: '-1px' }} />
                    <Grid item xs={9}>
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper sx={{ width: '70%', height: '60%', display: 'flex', flexDirection: 'column' }}>
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
                                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
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
        (connectStatus === true) ?
            <CollabView socketIO={socket} myName={joinName} roomName={roomID} /> :
            <VCFramework />
    )
}

export default CollabViewEntry;