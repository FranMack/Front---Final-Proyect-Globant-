import "./App.css";
import { Route, Routes } from "react-router";
import Start from "./view/Start.view";

function App() {
  return (
    <Routes>
      <Route path="/" element={Start}></Route>
    </Routes>
  );
}

export default App;
