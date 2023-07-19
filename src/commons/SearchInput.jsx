import React from "react"
import { Box, Input } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';;  

const SearchInput=()=>{

    return( 

        <>
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
          <SearchIcon sx={{ marginLeft: '5px' }} />
        </Box>
  
  
  
        <Box
          sx={{
            height: '60%', // Cambiamos la altura a 100%
            width: '60%',
            border: '1px solid grey',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            borderRight:"0px",
            borderLeft:"0px",
            backgroundColor:"lightgrey"
       
          }}
        >
          <Input
        disableUnderline={true}
          placeholder='Buscar'
          sx={{
            height: '100%', // Cambiamos la altura a 100%
           
          }}
        />
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
          <CalendarMonthIcon sx={{ marginLeft: '5px' }} />
        </Box>
      </>)
}

export default SearchInput;