import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Start from "./view/Start.view";

import Profile from "./components/Profile.jsx";

import Register from "./view/Register.view";

function App() {
  return (
    <Routes>
      <Route path="/perfil" element={<Profile />} />

      <Route exact path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
