import React from "react";
import "./profile.css";
import Avatar from "@mui/material/Avatar";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import Button from "@mui/material/Button";

const Profile = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid gray",
          padding: "16px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <ArrowBackIcon />
          </Link>
          <h3 style={{ marginLeft: "16px" }}>Perfil</h3>
        </div>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid gray",
          padding: "16px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
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
          <Avatar sx={{ width: 90, height: 90 }}> MU</Avatar>
          <div style={{ marginLeft: "70px" }}>
            <Box
              sx={{
                borderBottom: "1px solid gray",
                width: "140px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4>Micaela</h4>
            </Box>
            <Box
              sx={{
                borderBottom: "1px solid gray",
                width: "140px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4>Uvilla</h4>
            </Box>
          </div>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            borderBottom: "1px solid gray",
            width: "300px",
            marginLeft: "30px",
            marginTop: "50px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h4>micaelauvilla@gmail.com</h4>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid gray",
            width: "300px",
            marginLeft: "30px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h4>Mendoza</h4>
        </Box>

        <Box
          sx={{
            borderBottom: "1px solid gray",
            width: "300px",
            marginLeft: "30px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h4>02 de Mayo de 1998</h4>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid gray",
            width: "300px",
            marginLeft: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h4>Oficina</h4>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "100px",
              height: "30px",
              fontSize: "8px",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            Seleccionar
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="cotained"
          style={{
            background: "rgba(255,0,0,0.8)",
            color: "white",
            width: "130px",
            borderRadius: "20px",
          }}
        >
          Salir
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ width: "130px", borderRadius: "20px" }}
        >
          Editar
        </Button>
      </Box>
    </Box>
  );
};
//  <div>
{
  /* <Box
sx={{
  borderBottom: "1px  gray",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)",
}}
>
<div className="title">
  <Link to="/" className="arrow">
    <ArrowBackIcon />
  </Link>
  <h4>Perfil</h4>
</div>
</Box>

<Stack direction="row">
<Avatar sx={{ bgcolor: deepOrange[500] }}>MU</Avatar>
</Stack>
</div> */
}

export default Profile;
