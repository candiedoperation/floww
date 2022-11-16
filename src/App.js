import CollabViewEntry from "./integrals/CollabViewEntry";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/classroom/*" element={<CollabViewEntry />} exact></Route>
    </Routes>
  );
}

export default App;
