import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SwipeableTemporaryDrawer() {
  const user = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={user.user.url_img}
          component="span"
          sx={{ width: 50, height: 50 }}
        >
          {!user.user.url_img
            ? user.user.first_name.charAt(0).toUpperCase() +
              user.user.last_name.charAt(0).toUpperCase()
            : null}
        </Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography>
            {user.user.first_name} {user.user.last_name}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={{ marginLeft: "18px" }}>
        {[
          {
            text: "Reports",
            icon: <SignalCellularAltOutlinedIcon sx={{ color: "#3AB54A" }} />,
            path: "/reports",
          },
          {
            text: "Profile",
            icon: <AccountCircleOutlinedIcon sx={{ color: "#3AB54A" }} />,
            path: "/profile",
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            style={{ color: "#3AB54A" }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
