/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Box, Input,IconButton,Modal,Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const SearchUsers = ({ search, handleSearch,searchLocation,handleSearchLocation,showAllTheUsers }) => {

const [open,setOpen]=useState(false)


const handleModal=()=>{
    setOpen(!open)
    console.log("aaaaaaaaaa",open)

}




	return (
		<>
			<Box
				sx={{
					height: '60%',
					width: '10%',
					border: '1px solid grey',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderTopLeftRadius: '30px',
					borderBottomLeftRadius: '30px',
					borderRight: '0px solid',
					backgroundColor: 'lightgrey',
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
					borderRight: '0px',
					borderLeft: '0px',
					backgroundColor: 'lightgrey',
				}}
			>
				<Input
					value={search}
					onChange={handleSearch}
					disableUnderline={true}
					placeholder='Search'
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
					backgroundColor: 'lightgrey',
				}}
			>
        <IconButton onClick={handleModal}>
        <PersonPinCircleIcon fontSize="large"  sx={{ marginLeft: '5px' }} />
        </IconButton>
   
			</Box>

      {open &&(
      <Modal open={open} sx={{width: { 
        s: 'inherit', md: '400px',
        margin:"0 auto",
				padding: '0 0 20px 0',
        },}}>

        <Box sx={{backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"center",}}>
            <h3 style={{color:"grey"}}>Filter by location</h3>
            <Input placeholder='Location' value={searchLocation} onChange={handleSearchLocation} sx={{marginTop:"2%",marginBottom:"5%"}}/>
   
	<Box sx={{display:"flex", justifyContent:"space-around",width:"100%"}}>
	<Button   onClick={showAllTheUsers} >Show all</Button>
	  <Button  onClick={handleModal}>Close</Button>
	  
	  </Box>
     

        </Box>
      
    </Modal>)}
		</>
	);
};

export default SearchUsers;
