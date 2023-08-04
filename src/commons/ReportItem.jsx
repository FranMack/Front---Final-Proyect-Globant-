/* eslint-disable react/prop-types */

import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ConvertISOdateToRegular } from '../utils/functions';

const ReportItem = ({ report }) => {
	return (
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
				component={Link}
				to={`/reports/${report._id}`}
				sx={{
					height: '60%', // Cambiamos la altura a 100%
					width: '80%',
					border: '1px solid grey',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderRight: '0px',
					borderLeft: '0px',
					backgroundColor: 'lightgrey',
					fontSize: '1.1rem',
					fontWeight: 'bolder',
					textDecoration: 'none',
					color: 'black',
					borderTopRightRadius: '30px',
					borderBottomRightRadius: '30px',
					borderTopLeftRadius:"30px",
					WebkitBorderBottomLeftRadius:"30px"
				}}
			>
				<p style={{marginLeft:"5%"}}>{report.device}</p>
				<p style={{marginRight:"2%",fontSize:"1rem"}}>{ConvertISOdateToRegular(report.date_report)}</p>
			</Box>

		</Box>
	);
};

export default ReportItem;
