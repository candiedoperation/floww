import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import * as React from 'react';

const CollabViewEntry = () => {
    const [currentTab, setCurrentTab] = React.useState(0);

    const CreateRoomPanel = (internal_props) => {
        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px'}}>
                <TextField sx={{ width: '50%' }} label="Name" variant="outlined" />
                <Button startIcon={<AddIcon />} sx={{ marginTop: '15px' }} variant="contained">Create and Join Room</Button>
            </Box>
        )
    }

    const JoinRoomPanel = (internal_props) => {
        return (
            <Box sx={{ ...internal_props.sx, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%', minHeight: '200px'}}>
                <TextField sx={{ width: '50%', marginBottom: '10px' }} label="Room ID" variant="outlined" />
                <TextField sx={{ width: '50%' }} label="Name" variant="outlined" />
                <Button startIcon={<MeetingRoomIcon />} sx={{ marginTop: '15px' }} variant="contained">Join Room</Button>
            </Box>
        )
    }

    return (
        <Box sx={{ height: '100vh', maxHeight: '100vh' }}>
            <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={3}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img src='favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
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
                            <Box sx={{ flexGrow: 1, overflow: 'auto'  }}>
                                <CreateRoomPanel sx={{ display: (currentTab == 0 ? 'flex' : 'none') }}></CreateRoomPanel>
                                <JoinRoomPanel sx={{ display: (currentTab == 1 ? 'flex' : 'none') }}></JoinRoomPanel>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CollabViewEntry;