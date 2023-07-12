import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { Box, Grid } from "@mui/material";
import globantImage from "../assets/Globant-Original1.png";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

const Register = () => {
    
    const buttonStyles = {
        borderRadius: "50px",
        textTransform: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        color: "#000000",
        border: "2px solid #808080",
        padding: "5px 50px",
    };    

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Grid
          container
          spacing={2}
          style={{  marginLeft: "4px", borderBottom: "1px solid grey", width: "100%" }}
        >
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <KeyboardBackspaceIcon />
            </IconButton>
            <h5 style={{ marginLeft: "8px", color:"grey" }}>New Register</h5>
          </Grid>
        </Grid> 

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "2px", marginBottom: "16px" }}
        >
          <Grid item>
            <Avatar>H</Avatar>
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Name" variant="standard" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Last name" variant="standard" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Genre" variant="standard" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Email" variant="standard" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Location" variant="standard" />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Date of Birth" variant="standard" />
          </Grid>
        </Grid>

        <Button variant="outlined" style={buttonStyles}>New account</Button>

        <Grid item xs={12} sm={6} md={4} lg={3}  style={{ marginTop: "40px"}} >
          <img
            src={globantImage}
            alt="Globant Logo"
            style={{
              width: "60%",
              height: "auto",
              maxWidth: "400px",
              marginLeft: "60px"
            }}
          />
        </Grid>
      </Box>
    </>
  );
}

export default Register;


