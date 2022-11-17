import * as React from 'react';
import axios from "axios";
import CollabViewEntry from "./integrals/CollabViewEntry";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./integrals/HomeView";
import HomeLogin from "./integrals/HomeLogin";
import { serverURL } from "./middleware/FlowwServerParamConn";
import { Box, LinearProgress, Typography } from '@mui/material';

const CheckAuth = (props) => {
    const [authenticated, setAuthenticated] = React.useState(0);

    React.useEffect(() => {
      axios
        .post(`${serverURL}/api/verifyauth`)
        .then((res) => {
          const flowwResponse = res.response.data;
          (flowwResponse.status === true) ? setAuthenticated(2) : setAuthenticated(1);
        })
        .catch((res) => {
          setTimeout(() => {
            setAuthenticated(1);
          }, 1200);
        })
    }, [])

    const LoadingPageElement = () => {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6">🧐 Confirming it's you!</Typography>
          <LinearProgress sx={{ width: '80%' }} />
        </Box>
      )
    }

    switch (authenticated) {
      case 0: return (<LoadingPageElement />)
      case 1: return (<Navigate to="/login" />)
      case 2: return (props.children)
    }
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLogin />} exact></Route>
      <Route path="/login" element={<HomeLogin />} exact></Route>
      <Route path="/dashboard/*" element={<CheckAuth><HomeView /></CheckAuth>} exact></Route>
      <Route path="/classroom/*" element={<CollabViewEntry />} exact></Route>
    </Routes>
  );
}

export default App;
