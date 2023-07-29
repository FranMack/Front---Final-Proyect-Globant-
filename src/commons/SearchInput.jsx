/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Box, Input,IconButton,Modal,Button } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const SearchInput = ({ search, handleSearch,date,isoDate,handleDate,showAllTheReports }) => {

const [open,setOpen]=useState(false)


const handleCalendar=()=>{
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
        <IconButton onClick={handleCalendar}>
        <CalendarMonthIcon  sx={{ marginLeft: '5px' }} />
        </IconButton>
   
			</Box>

      {open &&(
      <Modal open={open} sx={{width: { 
        s: 'inherit', md: '400px',
        margin:"0 auto",
				padding: '0 0 20px 0',
        },}}>

        <Box sx={{backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"center",}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={handleDate} />
	
    </LocalizationProvider>
	<Box sx={{display:"flex", justifyContent:"space-around",width:"100%"}}>
	<Button   onClick={showAllTheReports} >Show all</Button>
	  <Button  onClick={handleCalendar}>Close</Button>
	  
	  </Box>
     

        </Box>
      
    </Modal>)}
		</>
	);
};

export default SearchInput;
