import "./App.css";
import React, { useEffect, useState } from "react";
import Start from "./view/Start.view";
import Profile from "./components/Profile.jsx";
import Register from "./view/Register.view";
import Loading from "./view/Loading";
import NotFound from "./view/NotFound.view";

import { Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import userApi from "./api/modules/user.api";
import { setUser } from "./state/features/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) {
        dispatch(setUser(response));
        setUsername(response.username);
      }
      if (err) dispatch(setUser(null));

      setLoading(false);
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user && window.location.pathname !== "/register") {
        navigate("/");
      }
    }
  }, [loading, navigate, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Start />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="profile" element={<Profile username={username} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
