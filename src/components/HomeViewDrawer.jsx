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

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate, useParams } from 'react-router-dom';

const HomeViewDrawer = (props) => {
    const navigate = useNavigate();
    const [drawerLinks, setDrawerLinks] = React.useState([]);

    React.useEffect(() => {
        setDrawerLinks((drawerLinks) => [...drawerLinks, {
            linkName: 'Home',
            path: './home',
            icon: <HomeIcon />
        }])
    }, []);

    return (
        <List sx={{ marginTop: '64px', padding: '0px' }}>
            {
                drawerLinks.map((drawerLink) => {
                    return (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { navigate(drawerLink.path); }} selected={(props.currentPage === drawerLink.linkName)}>
                                <ListItemIcon>
                                    {drawerLink.icon}
                                </ListItemIcon>
                                <ListItemText primary={drawerLink.linkName} />
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default HomeViewDrawer;