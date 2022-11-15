import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import * as React from 'react';

const CollabViewEntry = () => {
    const [currentTab, setCurrentTab] = React.useState(0);

    const CreateRoomPanel = (internal_props) => {
        return (
            <Box sx={{ ...internal_props.sx }}>A</Box>
        )
    }

    const JoinRoomPanel = (internal_props) => {
        return (
            <Box sx={{ ...internal_props.sx }}>B</Box>
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
                <Grid item xs={9}>
                    <Box sx={{ boxShadow: 8, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper sx={{ width: '70%', height: '60%' }} variant="outlined">
                            <Tabs
                                variant='fullWidth'
                                value={currentTab}
                                onChange={(e, newValue) => { setCurrentTab(newValue) }}
                                aria-label="Vertical tabs example"
                                sx={{ borderColor: 'divider' }}
                            >
                                <Tab icon={<AddIcon />} label="Create new Room" aria-label="Create new Room" />
                                <Tab icon={<MeetingRoomIcon />} label="Join existing Room" aria-label="Join existing Room" />
                            </Tabs>
                            <Box>
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