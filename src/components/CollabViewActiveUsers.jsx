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
    const [auElements, setAuElements] = React.useState([]);

    props
        .activeUsers
        .forEach((user) => {
            setAuElements([
                ...auElements,
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    {(user.photo ? <Person2Icon /> : <Person2Icon />)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} secondary={user.sockId} />
                        </ListItemButton>
                    </ListItem>
                </List>
            ])
        })

    return (
        <Box sx={{ ...props.sx, marginBottom: '70px' }}>
            {auElements}
        </Box>
    );
}

export default CollabViewActiveUsers;