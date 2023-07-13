import "./App.css";
import React from "react";
import Start from "./view/Start.view";
import Profile from "./components/Profile.jsx";
import Register from "./view/Register.view";

import { Route, Routes } from "react-router";


function App() {
  return (
    <Routes>

   
   
      <Route path="/perfil/:username" element={<Profile />} />


      <Route exact path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register />}></Route>

    </Routes>
  );
}

export default App;
