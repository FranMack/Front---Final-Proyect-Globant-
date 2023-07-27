/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { emailReport } from '../utils/functions';


import {
	Box,
	Button,
	Input,
	FormControl,
	Avatar,
	Modal,
	IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router';

import { ConvertISOdateToRegular } from '../utils/functions';

const ReportDetail = () => {
	const [open, setOpen] = useState(false);
	const[email,setEmail]=useState("")
	const [contentEmail,setContentEmail]=useState("")


	const handleModal = () => {
		setOpen(!open);
		setEmail("")
	};

	const handleEmail = (element) => {
		
		setEmail(element.target.value);
	};

	const sendEmail = async (event) => {
		event.preventDefault();
		
	
		  await axios.post("http://localhost:5000/api/v1/report/send-email", { email,contentEmail })
		  .then(()=>{
		  toast.success('¡Email sent successfully', {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 3000, 
			hideProgressBar: false,
		  });
		  setEmail("");
		  setOpen(false) })
		  
	.catch((error)=>{console.log(error)})
	  };



	const reportId = useParams().id;

	const [report, setReport] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/v1/report/single/${reportId}`)
			.then((res)=>{ setReport(res.data)
				setContentEmail(emailReport(res.data))
			});
	}, []);


console.log(report)
	return (
		<>
		<ToastContainer/>
			<Button
				onClick={handleModal}
				variant='contained'
				style={{
					marginRight: '16px',
					backgroundColor: '#3ab54a',
					color: '#FFFFFF',
					minWidth: '40px',
					width: '40px',
					height: '40px',
					borderRadius: '50%',
					position: 'fixed',
					right: 0,
					bottom: '50px',
					zIndex: 99,
				}}
			>
				<SendIcon />
			</Button>
			<Navbar />

			{open && (
				<Modal
					open={open}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: {
							s: 'inherit',
							md: '400px',
							margin: '0 auto',
							padding: '0 0 20px 0',
						},
					}}
				>
					<Box
						sx={{
							backgroundColor: 'white',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '75%',
							height: '40%',
							borderRadius: '25px',
						}}
					>
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
							<IconButton onClick={handleModal}>
								<CloseIcon />
							</IconButton>
						</Box>

						<h3 style={{color:"grey"}}>SHARE REPORT</h3>

						<Box component="form" onSubmit={sendEmail} sx={{ width: '%100', marginTop: '10px',display:"flex", flexDirection:"column", justifyContent:"space-between",alignItems:"center"  }}>

						<FormControl  sx={{ width: '100%', marginTop: '10px'}}>
							<Input
							value={email}
								onChange={handleEmail}
								id='name'
								type='email'
								required
								aria-describedby='email-helper'
								placeholder='EMAIL'
							
							/>
						</FormControl>

						<Button  type="submit" variant='contained' sx={{ marginTop: '15%',marginBottom:"10%", paddingInline:"12%",backgroundColor:"#2e7d32" }} >
							Send
						</Button>
						</Box>
					</Box>
				</Modal>
			)}

			<Box
				sx={{
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<Box sx={{ marginLeft: { xs: '10%', md: '3%' } }}>
					<h3 style={{ color: 'grey' }}>Report details</h3>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '90vh',
					width: { xs: 'inherit', md: '600px' },
					margin: { xs: '0 auto', md: '3% auto' },
				}}
			>
				<Avatar
					variant='square'
					src={report.url_img}
					sx={{
						width: '50%',
						height: '30%',
						marginTop: '3%',
						cursor: 'pointer',
						borderRadius: '20px',
						marginBottom: '2%',
						backgroundColor: '#d3d3d3',
						backgroundPosition: 'center',
					}}
				>
					Foto
				</Avatar>

				<Box
					sx={{
						width: '100%',
						height: '5%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderBottom: '1px solid grey',
					}}
				>
					<h4 style={{ color: 'grey', marginLeft: '10%' }}>{`Report: ${
						report._id ? report._id.slice(-6) : ''
					}`}</h4>
					<h4 style={{ color: 'grey', marginRight: '10%' }}>
						{ConvertISOdateToRegular(report.date_report)}
					</h4>
				</Box>

				<Box
					sx={{
						width: '100%',
						marginTop: '3%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						fontSize: '0.9rem',
						fontWeight: 'bolder',
						color: 'grey',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							width: '35%',
							borderRadius: '10px',
						}}
					>
						Device:
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							width: '35%',
						}}
					>
						State:
					</Box>
				</Box>

				<Box
					sx={{
						width: '100%',
						height: '6%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						fontSize: '1.1rem',
						fontWeight: 'bolder',
						marginBottom: '2%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#d3d3d3',
							height: '100%',
							width: '35%',
							borderRadius: '10px',
							textAlign: 'center',
						}}
					>
						{report.device}
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#d3d3d3',
							height: '100%',
							width: '35%',
							borderRadius: '10px',
							textAlign: 'center',
						}}
					>
						{report.status_report}
					</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'start',
						alignItems: 'center',
						width: '85%',
						fontSize: '0.9rem',
						fontWeight: 'bolder',
						color: 'grey',
					}}
				>
					Description:
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#d3d3d3',
						minHeight: '14%',
						width: '85%',
						borderRadius: '10px',

						textAlign: 'center',

						fontSize: '1.1rem',
						fontWeight: 'bolder',
					}}
				>
					{report.description}
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'start',
						width: '85%',
						borderRadius: '10px',
						marginTop: '3%',
						fontSize: '0.9rem',
						fontWeight: 'bolder',
						color: 'grey',
					}}
				>
					Location:
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#d3d3d3',
						height: '6%',
						width: '85%',
						borderRadius: '10px',
						textAlign: 'center',
						fontSize: '1.1rem',
						fontWeight: 'bolder',
					}}
				>
					{`${report.location}`}
				</Box>

				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-around',
						fontSize: '0.9rem',
						fontWeight: 'bolder',
						color: 'grey',
						marginTop: '2%',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							width: '35%',
						}}
					>
						Floor:
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							width: '35%',
						}}
					>
						Box:
					</Box>
				</Box>

				<Box
					sx={{
						width: '100%',
						height: '6%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						fontSize: '1.1rem',
						fontWeight: 'bolder',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#d3d3d3',
							height: '100%',
							width: '35%',
							borderRadius: '10px',
							textAlign: 'center',
							marginBottom: '1%',
						}}
					>
						{`${report.floor_number}`}
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#d3d3d3',
							height: '100%',
							width: '35%',
							borderRadius: '10px',
							textAlign: 'center',
						}}
					>
						{` ${report.box_number}`}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ReportDetail;
