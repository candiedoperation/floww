import CollabViewEntry from "./integrals/CollabViewEntry";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import HomeView from "./integrals/HomeView";
import HomeLogin from "./integrals/HomeLogin";

const CheckAuth = (props) => {
    const cookies = new Cookies();
    if (cookies.get("authKey")) {
        return (
          props.children
        )
    } else {
      return (
        <Navigate to="/login"></Navigate>
      )
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
