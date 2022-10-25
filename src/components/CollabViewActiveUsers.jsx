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
    let socketListener = null;
    const [activeUsers, setActiveUsers] = React.useState([]);

    React.useState(() => {
        props.socketIO.on('cbv-cachedActiveUsersList', (uList) => {
            setActiveUsers((activeUsers) => uList)
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
                            <ListItemText primaryTypographyProps={{ textOverflow: 'ellipsis', overflow: 'hidden' }} secondaryTypographyProps={{ textOverflow: 'ellipsis', overflow: 'hidden' }} primary={user.uName} secondary={user.uId} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default CollabViewActiveUsers;