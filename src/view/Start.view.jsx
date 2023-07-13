import React from "react";
import globantImage from "../assets/Globant-Original1.png";

import RegisterButton from "../commons/ButtonRegister";
import { Box, Grid, Stack } from "@mui/material";
import { setLoginModalOpen } from "../state/features/loginModalSlice";
import { useDispatch } from "react-redux";
import LoginModal from "./LoginModal.view";
import { Link } from "react-router-dom";

const Start = () => {
  const dispatch = useDispatch();
  return (
    <>
      <LoginModal />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          padding: "16px",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ marginBottom: "auto" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <img
              src={globantImage}
              alt="Globant Logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                marginTop: "70px",
                marginLeft: "10px",
              }}
            />
          </Grid>
        </Grid>
<<<<<<< HEAD
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ marginTop: "8px", marginBottom: "50px" }}
        >
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <RegisterButton />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <>
                Do you have an account?
                <Link
                  onClick={() => dispatch(setLoginModalOpen(true))}
                  style={{
                    color: "#3AB54A",
                    marginLeft: "5px",
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
              </>
            </Grid>
=======
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <p>
              Do you have an account?
              <Link style={{ color: "#3AB54A" }}>Log in</Link>
            </p>
>>>>>>> ff1cebf5e027573dc6d8ccbf2bfcb8a106bb7c6d
          </Grid>
        </Grid>
      </Box>
    </>
  );

};

export default Start;
