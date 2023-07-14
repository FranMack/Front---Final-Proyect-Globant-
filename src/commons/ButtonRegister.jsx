import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function RegisterButton() {
  const buttonStyles = {
    borderRadius: "50px",
    textTransform: "none",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    color: "#000000",
    border: "2px solid #808080",
    padding: "5px 100px",
  };

  return (
    <Button
      component={Link}
      to="/register"
      variant="outlined"
      style={buttonStyles}
    >
      REGISTER
    </Button>
  );
}
