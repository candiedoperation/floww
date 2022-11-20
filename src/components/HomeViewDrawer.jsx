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