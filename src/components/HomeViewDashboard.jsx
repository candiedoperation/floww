import { Box, Divider, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const LearnerDashboard = (props) => {
    return (
        <Box>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h4">👋 Hello, {props.userData.name}.</Typography>
            <Divider sx={{ display: { xs: 'none', md: 'block' }, marginTop: '10px' }} />
        </Box>
    )    
}

const HomeViewDashboard = (props) => {
    const [dashboardType, setDashboardType] = React.useState('learner');

    switch(dashboardType) {
        case 'learner': return(<LearnerDashboard { ...props } />);
    }
}

export default HomeViewDashboard;