import "./App.css";
import React, { useEffect, useState } from "react";
import Start from "./view/Start.view";
import Profile from "./components/Profile.jsx";
import Register from "./view/Register.view";

import { Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import userApi from "./api/modules/user.api";
import { setUser } from "./state/features/userSlice";
import NotFound from "./components/NotFound";

function App() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) {
        dispatch(setUser(response));
      }
      if (err) dispatch(setUser(null));

      setLoading(false);
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      }
    }
  }, [loading, navigate, user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:username" element={<Profile />} />

      <Route path="*" element={<p>Not Found</p>} />
    </Routes>
  );
}

export default App;
