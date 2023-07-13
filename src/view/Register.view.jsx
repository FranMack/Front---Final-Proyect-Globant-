import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";
import globantImage from "../assets/Globant-Original1.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginModalOpen } from "../state/features/loginModalSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        {
          first_name: name,
          last_name: lastname,
          phone_number: Number(number),
          ubication: location,
          genre: "no binario",
          email: email,
          username: username,
          is_admin: false,
          password: password,
          url_img: image,
        }
      );
      alert(`User created ${user.data.user.username}`);
      navigate("/");
      dispatch(setLoginModalOpen(true));
    } catch (error) {
      alert("User can not be created");
    }
  };

  const buttonStyles = {
    borderRadius: "50px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    color: "#000000",
    border: "2px solid #808080",
    padding: "8px 50px",
    marginTop: "20px",
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
          marginLeft: "2px",
        }}
      >
        <Grid
          container
          spacing={2}
          style={{ borderBottom: "1px solid grey", width: "100%" }}
        >
          <Grid style={{ display: "flex", alignItems: "center" }}>
            <IconButton component={Link} to="/">
              <KeyboardBackspaceIcon />
            </IconButton>
            <h5 style={{ marginLeft: "8px", color: "grey" }}>NEW REGISTER</h5>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{
            marginTop: "1px",
            marginBottom: "16px" /* marginLeft: "50px" */,
          }}
        >
          <Grid>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="avatar-upload"
            />

            <label htmlFor="avatar-upload">
              <Avatar
                component="span"
                sx={{ width: 90, height: 90, cursor: "pointer" }}
                src={image}
              ></Avatar>
            </label>
          </Grid>
          <Grid item style={{ marginBottom: "20px" }}>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  color="success"
                  required
                  sx={{ width: "180px" }}
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  color="success"
                  required
                  sx={{ width: "180px" }}
                  id="standard-basic"
                  label="Last name"
                  variant="standard"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            style={{
              borderBottom: "1px solid grey",
              width: "100%",
              marginTop: "20px",
              marginLeft: "5px",
            }}
          ></Grid>

          <Grid item>
            <TextField
              color="success"
              required
              sx={{ width: "300px" }}
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              color="success"
              required
              sx={{ width: "300px" }}
              id="standard-basic"
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              color="success"
              required
              sx={{ width: "300px" }}
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  color="success"
                  required
                  sx={{ width: "140px" }}
                  id="standard-basic"
                  label="Location"
                  variant="standard"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  color="success"
                  sx={{ width: "140px" }}
                  id="standard-basic"
                  label="Phone number"
                  variant="standard"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Button type="submit" variant="outlined" style={buttonStyles}>
          NEW ACCOUNT
        </Button>

        <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginTop: "40px" }}>
          <img
            src={globantImage}
            alt="Globant Logo"
            style={{
              width: "60%",
              height: "auto",
              maxWidth: "400px",
              marginLeft: "69px",
            }}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Register;
