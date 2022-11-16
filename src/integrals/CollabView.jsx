import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Badge, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawingBoard from '../components/DrawingBoard';
import GestureIcon from '@mui/icons-material/Gesture';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import CollabViewComments from '../components/CollabViewComments';
import CollabViewPenSettings from '../components/CollabViewPenSettings';
import CollabViewActiveUsers from '../components/CollabViewActiveUsers';
import PollIcon from '@mui/icons-material/Poll';
import CollabViewConference from '../components/CollabViewConference';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const drawerWidth = 320;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

//Certain Stateless variables for arithmetic applications
let statelessCurrentTab = 0;

export default function CollabView(props) {
  const socket = props.socketIO;
  const [whiteboardObject, setWhiteboardObject] = React.useState(null);
  const [commentBadgeValue, setCommentBadgeValue] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState(0);
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    window.dispatchEvent(new Event('resize'));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    window.dispatchEvent(new Event('resize'));
  };

  const onGetWhiteboardObject = (res) => {
    setWhiteboardObject(res);
  }

  const switchTab = (event, newValue) => {
    setCurrentTab(newValue);
    statelessCurrentTab = newValue;
  }

  React.useEffect(() => {
    socket.on('connect', () => {
      socket.emit('cbv-joinRoom', {
        uName: props.myName,
        roomName: props.roomName,
        uId: socket.id,
      })
    })

    socket.on('cbv-comment', (m) => {
      if (statelessCurrentTab != 3) setCommentBadgeValue((val) => (val + 1))
    })
  }, [])

  React.useEffect(() => {
    if (statelessCurrentTab == 3) setCommentBadgeValue(0);
  }, [currentTab]);

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: 'hidden' }}>
      <AppBar elevation={0} position="static" sx={{ background: '#ffffff', color: '#000000' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ lineHeight: 'initial' }}>Floww</Typography>
            <Typography variant="caption" component="div" sx={{ lineHeight: 'initial' }}>Room: {props.roomName}</Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <Box sx={{ height: "calc(100% - 64px)", width: "100%", display: 'flex', flexDirection: 'row' }}>
        <Main open={open}>
          <DrawingBoard uName={props.myName} roomName={props.roomName} socketIO={socket} sendWhiteboardObject={onGetWhiteboardObject}></DrawingBoard>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              overflow: 'hidden',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ display: 'flex', height: 'calc(100% - 64px)' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <CollabViewPenSettings whiteboardObject={whiteboardObject} sx={{ display: (currentTab == 0 ? 'block' : 'none') }}></CollabViewPenSettings>
              <CollabViewActiveUsers socketIO={socket} uName={props.myName} sx={{ display: (currentTab == 1 ? 'block' : 'none') }}></CollabViewActiveUsers>
              <CollabViewConference roomName={props.roomName} socketIO={socket} uName={props.myName} sx={{ display: (currentTab == 2 ? 'flex' : 'none') }}></CollabViewConference>
              <CollabViewComments roomName={props.roomName} socketIO={socket} uName={props.myName} sx={{ display: (currentTab == 3 ? 'flex' : 'none') }}></CollabViewComments>
            </Box>
            <Divider orientation='vertical' />
            <Box>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={currentTab}
                onChange={switchTab}
                aria-label="Vertical tabs example"
                sx={{ borderColor: 'divider' }}
              >
                <Tab icon={<GestureIcon />} aria-label="Pen Color" />
                <Tab icon={<PeopleIcon />} aria-label="Participants" />
                <Tab icon={<VideoChatIcon />} aria-label="Virtual Classroom" />
                <Tab icon={<Badge badgeContent={commentBadgeValue} color="primary"><ChatIcon /></Badge>} aria-label="Messages" />
                <Tab icon={<PollIcon />} aria-label="Poll" />
              </Tabs>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}