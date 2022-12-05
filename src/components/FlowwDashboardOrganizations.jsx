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

import { Box, Divider, List, ListSubheader, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const FlowwDashboardOrganizations = (props) => {
    const [organizations, setOrganizations] = React.useState([]);

    return (
        <Box>
            <List>
                <ListSubheader sx={{ fontSize: 32, padding: '0px' }}>You're a part of...</ListSubheader>
                {
                    (!organizations.length > 0) ?
                    <Typography variant="h5">No Organizations. Create one, or ask someone to add you.</Typography> : 
                    organizations.map((organization) => {
                        return (
                            <h1>jk</h1>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default FlowwDashboardOrganizations;