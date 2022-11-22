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
import axios from "axios";
import CollabViewEntry from "./integrals/CollabViewEntry";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./integrals/HomeView";
import HomeLogin from "./integrals/HomeLogin";
import { serverURL } from "./middleware/FlowwServerParamConn";
import { Box, LinearProgress, Typography } from '@mui/material';

const CheckAuth = (props) => {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    axios
      .post(`${serverURL}/api/verifyauth`,
        undefined,
        { withCredentials: true }
      )
      .then((res) => {
        setTimeout(() => {
          props.setUserData(() => (res.data))
          props.setAuthenticated(2)
          setAuthenticated(2)
        }, 700);
      })
      .catch((res) => {
        setTimeout(() => {
          props.setAuthenticated(1);
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
  const [authenticated, setAuthenticated] = React.useState(0);
  const [userData, setUserData] = React.useState({});

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} exact></Route>
      <Route path="/login" element={<HomeLogin />} exact></Route>
      <Route path="/dashboard/*" element={<CheckAuth setAuthenticated={setAuthenticated} setUserData={setUserData}><HomeView userData={userData} /></CheckAuth>}></Route>
      <Route path="/classroom/*" element={<CollabViewEntry />} exact></Route>
    </Routes>
  );
}

export default App;
