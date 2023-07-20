/* eslint-disable react/prop-types */

import React from "react"
import { Box } from '@mui/material';
import { Link } from "react-router-dom";



const ReportItem=({report})=>{

    return( 

        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '10vh',
        }}
    >
        <Box
          sx={{
            height: '60%', // Cambiamos la altura a 100%
            width: '10%',
            border: '1px solid grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            borderRight: '0px solid',
            backgroundColor:"lightgrey"
          }}
        >
     
        </Box>
  
  
  
        <Box
        component={Link} to={`${report._id}`}
          sx={{
            height: '60%', // Cambiamos la altura a 100%
            width: '60%',
            border: '1px solid grey',
            display: 'flex',
            justifyContent:"space-between",
            alignItems: 'center',
            borderRight:"0px",
            borderLeft:"0px",
            backgroundColor:"lightgrey",
            fontSize:"1.1rem",
            fontWeight:"bolder",
            textDecoration:"none",
            color: "black"
       
          }}
        >
         <p>{report.device}</p>
         <p>{report.date_report}</p>
        </Box>
  
  
        
        <Box
          sx={{
            height: '60%', // Cambiamos la altura a 100%
            width: '10%', // Cambiamos el ancho a 10%
            border: '1px solid grey',
            borderLeft: '0px solid',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px',
            backgroundColor:"lightgrey"
          }}
        >
        
        </Box>
      </Box>)
}

export default ReportItem;