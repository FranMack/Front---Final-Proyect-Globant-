import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Start from "./view/Start.view";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Start />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
}

export default App;
