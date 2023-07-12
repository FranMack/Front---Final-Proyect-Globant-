import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Start from "./view/Start.view";
import Register from "./view/Register.view";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
  );
}

export default App;
