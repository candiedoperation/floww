import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import * as React from 'react';

const CollabViewEntry = () => {
    return (
        <Box sx={{ height: '100vh', maxHeight: '100vh' }}>
            <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={4}>
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
                        <img src='favicon512.png' style={{ borderRadius: '15%', aspectRatio: '1 / 1', width: '15%' }} />
                        <Typography sx={{ marginTop: '10px' }} variant='h4'>Floww</Typography>
                        <Typography variant='p'>Virtual Classroom</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ boxShadow: 8, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper sx={{ width: '70%', height: '60%' }} variant="outlined">Apple</Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CollabViewEntry;