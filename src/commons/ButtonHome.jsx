import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import shortImage from '../assets/Short-Original.png';

const ButtonHome = () => {
	return (
		<>
			<IconButton component={Link} to='/home'>
				<Box sx={{ width: '47px', height: '32px' }}>
					<img
						src={shortImage}
						alt='Short Image'
						style={{ width: '100%', height: '100%' }}
					/>
				</Box>
			</IconButton>
		</>
	);
};

export default ButtonHome;
