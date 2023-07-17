import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SwipeableTemporaryDrawer from "../commons/ButtonHamburgerMenu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/features/userSlice";

function ResponsiveAppBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ background: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            color="inherit"
            sx={{
              color: "#3AB54A",
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            Reports
          </Button>
          <Button
            component={Link}
            to={`/profile/${user.user.username}`}
            color="inherit"
            sx={{
              color: "#3AB54A",
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            Profile
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <SwipeableTemporaryDrawer />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Button
            color="inherit"
            style={{
              color: "#3AB54A",
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
