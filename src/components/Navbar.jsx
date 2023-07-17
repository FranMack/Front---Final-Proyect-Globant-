import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SwipeableTemporaryDrawer from "../commons/ButtonHamburgerMenu";
import { Link } from "react-router-dom";

function ResponsiveAppBar() {
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
            color="inherit"
            component={Link}
            to="/profile"
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
          <Button color="inherit" sx={{ color: "#3AB54A" }}>
            Logout
          </Button>
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
