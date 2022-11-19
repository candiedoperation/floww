import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const HomeViewDashboard = (props) => {
    const linkProps = useParams();
    
    return (
        <Box>
            <Typography variant='h2'>👋 Hello, {props.userData.name}.</Typography>
        </Box>
    )
}

export default HomeViewDashboard;