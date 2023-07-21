/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function BasicDateCalendar() {

const [open,setOpen]=useState(false)
const [date,setDate]=useState(null)

const handleCalendar=()=>{
    setOpen(!open)
}

const handleDate=(newDate)=>{

    setDate(newDate)

}

if(date){console.log("date",date.$d)}



  return (
    <>
    
   {/* <button onClick={handleCalendar}>Calendario</button>
    {open &&(<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={handleDate} />
    </LocalizationProvider>)}
    */}
    </>
  );
}

export default BasicDateCalendar;



/*
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function BasicDateCalendar() {

const [open,setOpen]=useState(false)
const [date,setDate]=useState(null)

const handleCalendar=()=>{
    setOpen(!open)
}

const handleDate=(newDate)=>{

    setDate(newDate)

}

if(date){console.log("date",date.$d)}



  return (
    <>
    <button onClick={handleCalendar}>Calendario</button>
    {open &&(<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={handleDate} />
    </LocalizationProvider>)}
    
    </>
  );
}

export default BasicDateCalendar;
*/