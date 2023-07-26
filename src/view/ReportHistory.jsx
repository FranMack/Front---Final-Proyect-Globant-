/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import { Box, Button, Stack, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchInput from '../commons/SearchInput';
import ReportItem from '../commons/ReportItem';
import { Link } from 'react-router-dom';
import { TransformISOdate } from '../utils/functions';
import { orderByDate } from '../utils/functions';


const ReportHistory = () => {
	const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
	const [date,setDate]=useState(null)
	const [isoDate,setIsoDate]=useState(null)
	const[allReports,setAllreports]=useState(false)

	const handleShowMore=()=>{
		setAllreports(!allReports)
	}

	const handleDate=(newDate)=>{

		setDate(newDate)

		setIsoDate(TransformISOdate(newDate.$d))
	
	
	}
	

    const handleSearch = (e) => {
        setSearch(e.target.value);
      };


	  const showAllTheReports=(event)=>{
		event.preventDefault()
		axios.get("http://localhost:5000/api/v1/report/all")
        .then((res)=>setReports(res.data))
        .catch((error)=>{console.log(error)})

	  }



    useEffect(()=>{

        axios.get("http://localhost:5000/api/v1/report/all")
        .then((res)=>setReports(res.data))
        .catch((error)=>{console.log(error)})


    },[])

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/v1/report/search?device=${search}`)
		  .then((res)=>setReports(res.data))
          .catch((err) => console.log(err));
      }, [search]);
	  

	  useEffect(() => {
		if(date){
			axios
			.get(`http://localhost:5000/api/v1/report/search-by-date?date=${isoDate}`)
			.then((res)=>setReports(res.data))
			.catch((err) => console.log(err));
		}
       
      }, [date]);


	console.log("date",isoDate)
	console.log("date",date)
	console.log("reports",reports)
	

	return (
		<>
		<Navbar/>
		<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<Box sx={{marginLeft:{xs:"10%", md:"3%"}}}>

				<h3 style={{ color: 'grey' }}>Inactive report history</h3>
				</Box>
				
			</Box>
		<Box
			sx={{
				height: '100vh',
				width: { xs: 'inherit', md: '600px' },
				display: 'flex,',
				margin:{xs:"0 auto", md:"3% auto"}
			}}
		>
			

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '10%',
					marginTop: '5%',
				}}
			>
				<SearchInput  search={search} handleSearch={handleSearch} date={date} isoDate={isoDate} handleDate={handleDate} showAllTheReports={showAllTheReports}/>
			</Box>

			<Stack sx={{ marginTop: '10%' }}>
  {allReports
    ? orderByDate(reports).map((report, i) => {
        return (
          <div key={i}>
            <ReportItem report={report} />
          </div>
        );
      })
    : orderByDate(reports).slice(0, 4).map((report, i) => {
        return (
          <div key={i}>
            <ReportItem report={report} />
          </div>
        );
      })}
</Stack>

			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Button
				onClick={handleShowMore}
					sx={{
						color: '#3AB54A',
						marginLeft: '5px',
						textDecoration: 'none',
					}}
				>
					{allReports ? `Mostrar menos`: `Mostrar mas...`}
				</Button>
			</Box>
		</Box>
		</>
	);
};

export default ReportHistory;