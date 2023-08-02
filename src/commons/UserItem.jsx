/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { ConvertISOdateToRegular } from '../utils/functions';

const UserItem = ({ user }) => {
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
					backgroundColor: 'lightgrey',
				}}
			>
				<Avatar
					component='span'
					sx={{ width: `85%`, height: `85%`, cursor: 'pointer' }}
					src={user.url_img}
				>
					{!user.url_img && user.first_name && user.last_name
						? user.first_name.charAt(0).toUpperCase() +
						  user.last_name.charAt(0).toUpperCase()
						: null}
				</Avatar>
			</Box>

			<Box
				component={Link}
				to={`/reports/${user._id}`}
				sx={{
					height: '60%', // Cambiamos la altura a 100%
					width: '60%',
					border: '1px solid grey',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRight: '0px',
					borderLeft: '0px',
					backgroundColor: 'lightgrey',
					fontSize: '1.1rem',
					fontWeight: 'bolder',
					textDecoration: 'none',
					color: 'black',
				}}
			>
				<p>{`${user.last_name} ${user.first_name} `}</p>
              
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
			></Box>
		</Box>
	);
};

export default UserItem;
