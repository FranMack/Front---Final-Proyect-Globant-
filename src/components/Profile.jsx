import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import MenuItem from "@mui/material/MenuItem";

import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { fakeData } from "../utils/fakeData";
import { useDispatch } from "react-redux";

const Profile = ({ username }) => {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ubication, setUbication] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/profile/${username}`
        );
        setUserData(response.data[0]);
        setFirstName(response.data[0].first_name);
        setLastName(response.data[0].last_name);
        setEmail(response.data[0].email);
        setUbication(response.data[0].ubication);
        setPhoneNumber(response.data[0].phone_number);
        setImage(response.data[0].url_img);
      } catch (error) {
        return { msg: " Error retrieving user", error };
      }
    };
    getUsers();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        email,
        ubication: ubication,
        phone_number: phoneNumber,
        url_img: image,
      };
      const response = await axios.put(
        `http://localhost:5000/api/v1/user/profile/${username}`,
        updatedData
      );
      setUserData(response.data);
      setEditing(false);
    } catch (error) {
      return { msg: " Error editing user", error };
    }
  };
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "15px" }}
        >
          <IconButton component={Link} to="/home">
            <KeyboardBackspaceIcon />
          </IconButton>
          <h3 style={{ marginLeft: "16px", color: "grey" }}>Profile</h3>
        </div>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid grey",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            marginLeft: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="avatar-upload"
          />

          <label htmlFor="avatar-upload">
            <Avatar
              component="span"
              sx={{ width: 90, height: 90, cursor: "pointer" }}
              disabled={!editing}
              src={image || userData.url_img}
            >
              {!image && userData.first_name && userData.last_name
                ? userData.first_name.charAt(0).toUpperCase() +
                  userData.last_name.charAt(0).toUpperCase()
                : null}
            </Avatar>
          </label>

          <div style={{ marginLeft: "70px" }}>
            <Stack spac ing={2}>
              <FormControl sx={{ width: "140px", marginTop: "10px" }}>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editing}
                  id="name"
                  type="text"
                  aria-describedby="name-helper"
                  sx={{ borderBottom: "1.5px solid #808080" }}
                />
                <FormHelperText
                  id="name-helper"
                  sx={{ fontSize: "11px", textAlign: "center" }}
                >
                  Name
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: "140px" }}>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editing}
                  id="name"
                  type="text"
                  aria-describedby="name-helper"
                  sx={{ borderBottom: "1.5px solid #808080" }}
                />

                <FormHelperText
                  sx={{ fontSize: "11px", textAlign: "center" }}
                  id="name-helper"
                >
                  Last Name
                </FormHelperText>
              </FormControl>
            </Stack>
          </div>
        </Box>
      </Box>
      <Box>
        <FormControl
          sx={{ width: "300px", marginLeft: "30px", marginTop: "40px" }}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!editing}
            id="name"
            type="text"
            aria-describedby="name-helper"
            sx={{ borderBottom: "1.5px solid #808080" }}
          />

          <FormHelperText
            sx={{ fontSize: "11px", textAlign: "center" }}
            id="name-helper"
          >
            Email
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: "300px", marginLeft: "30px", marginTop: "10px" }}
        >
          <Input
            value={ubication}
            id="name"
            type="text"
            onChange={(e) => setUbication(e.target.value)}
            disabled={!editing}
            aria-describedby="name-helper"
            sx={{ borderBottom: "1.5px solid #808080" }}
          />

          <FormHelperText
            sx={{ fontSize: "11px", textAlign: "center" }}
            id="name-helper"
          >
            Ubication
          </FormHelperText>
        </FormControl>

        <FormControl
          sx={{ width: "300px", marginLeft: "30px", marginTop: "10px" }}
        >
          <Input
            value={phoneNumber}
            id="name"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!editing}
            aria-describedby="name-helper"
            sx={{ borderBottom: "1.5px solid #808080" }}
          />

          <FormHelperText
            sx={{ fontSize: "11px", textAlign: "center" }}
            id="name-helper"
          >
            Phone Number
          </FormHelperText>
        </FormControl>
        <div>
          <FormControl sx={{ m: 1, width: "325px", marginTop: "30px" }}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              sx={{ height: "40px", marginLeft: "24px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {fakeData.map((item, index) => (
                <MenuItem key={index} value={item.localidad}>
                  {item.localidad},{item.direccion}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{
                fontSize: "11px",
                textAlign: "center",
              }}
              id="name-helper"
            >
              Office
            </FormHelperText>
          </FormControl>
        </div>
      </Box>
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {editing ? (
          <Button
            variant="contained"
            onClick={handleSaveClick}
            color="success"
            style={{ width: "130px", borderRadius: "20px" }}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleEditClick}
            style={{ width: "130px", borderRadius: "20px" }}
          >
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
