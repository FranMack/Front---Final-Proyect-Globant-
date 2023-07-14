import "./App.css";
import React from "react";
import Start from "./view/Start.view";
import Profile from "./components/Profile.jsx";
import Register from "./view/Register.view";

import { Route, Routes } from "react-router";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route exact path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
