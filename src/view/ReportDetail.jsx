/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import { Box, Button, Stack, IconButton, Avatar } from '@mui/material';
import { useParams } from 'react-router';

import { ConvertISOdateToRegular } from '../utils/functions';

const ReportDetail = () => {
	const reportId = useParams().id;

	const [report, setReport] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/v1/report/${reportId}`)
			.then(res => setReport(res.data));
	}, []);

	console.log(report);

	return (
		<>
			<Navbar />
			<Box
				sx={{
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<Box sx={{ marginLeft: { xs: '10%', md: '3%' } }}>
					<h3 style={{ color: 'grey' }}>Detalles de reporte</h3>
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
                        backgroundPosition:"center"
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
					<h4 style={{ color: 'grey', marginLeft: '10%' }}>{`Reporte: ${
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
						Dispositivo:
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							width: '35%',
						
						}}
					>
						Estado:
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
					Descripción:
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
					Ubicación:
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
                        color:"grey",
                        marginTop:"2%"
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							width: '35%',
					
						}}
					>
						{`Piso:`}
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							width: '35%',
				
						}}
					>
						{`Box:`}
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
                            marginBottom:"1%"
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
