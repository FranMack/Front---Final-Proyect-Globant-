import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Start from "./view/Start.view";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />}></Route>
    </Routes>
  );
}

export default App;
