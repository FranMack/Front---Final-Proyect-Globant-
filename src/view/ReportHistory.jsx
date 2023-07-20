/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { reportFakeData } from '../utils/reportFakeData';

import { Box, Button, Stack, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchInput from '../commons/SearchInput';
import ReportItem from '../commons/ReportItem';
import { Link } from 'react-router-dom';
const ReportHistory = () => {
	const [reports, setReports] = useState(reportFakeData);

	console.log(reports, setReports);

	return (
		<Box
			sx={{
				height: '100vh',
				margin: { xs: 'inherit', md: '30px auto' },
				padding: '0 0 20px 0',
				width: { xs: 'inherit', md: '400px' },
				display: 'flex,',
				boxShadow: { xs: 'inherit', md: '0 6px 10px rgba(0, 0, 0, 0.15)' },
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<IconButton component={Link} to='/home'>
					<KeyboardBackspaceIcon
						sx={{ marginLeft: '5%', marginRight: '15px', color: 'grey' }}
					/>
				</IconButton>
				<h3 style={{ color: 'grey' }}>Historial de reportes</h3>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '8%',
					borderBottom: '1px solid grey',
				}}
			>
				<h3 style={{ color: 'grey', marginLeft: '10%' }}>REPORTES INACTIVOS</h3>
			</Box>

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
				<SearchInput />
			</Box>

			<Stack sx={{ marginTop: '10%' }}>
				{reports.map((report, i) => {
					return (
						<div key={i}>
							<ReportItem report={report} />
						</div>
					);
				})}
			</Stack>

			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Button
					sx={{
						color: '#3AB54A',
						marginLeft: '5px',
						textDecoration: 'none',
					}}
				>
					Mostrar mas...
				</Button>
			</Box>
		</Box>
	);
};

export default ReportHistory;
