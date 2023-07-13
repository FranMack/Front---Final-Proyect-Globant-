import React, { useState } from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import { Box, Grid } from "@mui/material";
import globantImage from "../assets/Globant-Original1.png";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {

    const [name,setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");



    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const user = await axios.post(
              "http://localhost:8000/api/v1/user/register",
              {
                first_name: name,
                last_name: lastname,
                phone_number: Number(number),
                ubication: location,
                genre: genre,
                email: email,
                username: username,
                is_admin: false,
                password: password,

              }
            );
            alert(`User created ${user.data.user.username}`);
          } catch (error) {
            alert("User already exist");
          }

    }
      
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
      component="form"
      onSubmit={handleSubmit}
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
            <IconButton component={Link} to="/">
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
            <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(e)=> setName(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Last name" variant="standard" value={lastname} onChange={(e)=> setLastname(e.target.value)}/>
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Genre" variant="standard" value={genre} onChange={(e)=> setGenre(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Username" variant="standard" value={username} onChange={(e)=> setUsername(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Password" variant="standard" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Location" variant="standard" value={location} onChange={(e)=> setLocation(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="Phone number" variant="standard" value={number} onChange={(e)=> setNumber(e.target.value)} />
          </Grid>
        </Grid>

        <Button type="submit" variant="outlined" style={buttonStyles}>New account</Button>

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


