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

import { Box, Divider, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const FlowwDashboardHome = (props) => {
    return (
        <Box>
            <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h4">👋 Hello, {props.userData.name}.</Typography>
            <Divider sx={{ display: { xs: 'none', md: 'block' }, marginTop: '10px' }} />
        </Box>
    )
}

export default FlowwDashboardHome;