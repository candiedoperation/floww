import * as React from 'react';
import { io } from 'socket.io-client';
import { styled } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
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
import CollabViewPenSettings from '../components/CollabViewPenSettings';
import CollabViewActiveUsers from '../components/CollabViewActiveUsers';

const drawerWidth = 320;
const myName = Math.random();
const socket = io("http://192.168.29.229:3001");

socket.on('connect', () => {
  //let newUserData = {};
  //newUserData[socket.id] = { name: myName };
  /*console.log("joining room: jvksvf")
  socket.emit('cbv-joinRoom', {
    roomName: 'jvksvf'
  });*/

  console.log(`connected: ${socket.id}`)

  console.log("emiting")
  socket.emit('cbv-newActiveUser', {
    uId: socket.id,
    uName: myName,
    roomName: 'jvksvf'
  });
});

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

export default function CollabView() {
  const [whiteboardObject, setWhiteboardObject] = React.useState(null);
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
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: 'hidden' }}>
      <AppBar elevation={0} position="static" sx={{ background: '#ffffff', color: '#000000' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ lineHeight: 'initial' }}>Floww</Typography>
            <Typography variant="caption" component="div" sx={{ lineHeight: 'initial' }}>Room: jvksvf</Typography>
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
      <Box sx={{ height: "calc(100% - 60px)", width: "100%", display: 'flex', flexDirection: 'row' }}>
        <Main open={open}>
          <DrawingBoard uName={myName} roomName={'jvksvf'} socketIO={socket} sendWhiteboardObject={onGetWhiteboardObject}></DrawingBoard>
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
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <CollabViewPenSettings whiteboardObject={whiteboardObject} sx={{ display: (currentTab == 0 ? 'block' : 'none') }}></CollabViewPenSettings>
              <CollabViewActiveUsers socketIO={socket} uName={myName} sx={{ display: (currentTab == 1 ? 'block' : 'none') }}></CollabViewActiveUsers>
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
                <Tab icon={<PeopleIcon />} aria-label="phone" />
              </Tabs>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}