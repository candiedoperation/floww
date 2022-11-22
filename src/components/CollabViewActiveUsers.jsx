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
import { Box } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Person2Icon from '@mui/icons-material/Person2';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar'

const CollabViewActiveUsers = (props) => {
    const [activeUsers, setActiveUsers] = React.useState([]);

    React.useState(() => {
        props.socketIO.on('cbv-cachedActiveUsersList', (uList) => {
            setActiveUsers((activeUsers) => [{
                uName: `You (${props.uName})`,
                uId: props.socketIO.id
            }, ...uList])
        })

        props.socketIO.on('cbv-newActiveUser', (user) => {
            setActiveUsers((activeUsers) => [...activeUsers, user])
        });

        props.socketIO.on('cbv-delActiveUser', (user) => {
            setActiveUsers((activeUsers) =>
                activeUsers.filter((activeUser) => (activeUser.uId != user.uId))
            );
        });
    }, []);

    return (
        <Box sx={{ ...props.sx, marginBottom: '70px' }}>
            <List>
                {activeUsers.map((user) => (
                    <ListItem key={user.uId} disablePadding>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    {(user.photo ? <Person2Icon /> : <Person2Icon />)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primaryTypographyProps={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} secondaryTypographyProps={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} primary={user.uName} secondary={user.uId} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default CollabViewActiveUsers;