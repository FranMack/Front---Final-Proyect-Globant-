import React, { useState } from 'react';
import GeocodeUser from '../utils/hookGeocodeUser';
import ResponsiveAppBar from '../components/Navbar';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';

const HomeList = () => {
	const geocodeUserLocation = GeocodeUser();
	const [selectedLocation, setSelectedLocation] = useState('');

	const handleNearbyOfficeChange = event => {
		setSelectedLocation(event.target.value);
	};

	/*   const handleSubmitNewReport = () => {
  
  };
 */
	return (
		<>
			<ResponsiveAppBar />
			<Box
				/* component='form'
        onSubmit={handleSubmitNewReport} */
				style={{
					display: 'flex',
					alignItems: 'center',
					borderBottom: '1px solid grey',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						marginLeft: '15px',
					}}
				>
					<h3 style={{ marginLeft: '16px', color: 'grey' }}>
						Select your direction
					</h3>
				</div>
			</Box>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '10px',
				}}
			>
				<FormControl style={{ width: '90%' }}>
					<InputLabel id='nearby-office-label'>Home direction</InputLabel>
					<Select
						labelId='nearby-office-label'
						id='nearby-office-select'
						value={selectedLocation}
						onChange={handleNearbyOfficeChange}
						label='Nearby Offices'
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{geocodeUserLocation && (
							<MenuItem value={geocodeUserLocation}>
								{geocodeUserLocation}
							</MenuItem>
						)}
					</Select>
				</FormControl>
				<Button
					type='submit'
					variant='contained'
					style={{
						backgroundColor: '#3AB54A',
						color: '#FFFFFF',
						borderRadius: '20px',
						margin: '20px',
					}}
				>
					New Report
				</Button>
			</Box>
		</>
	);
};

export default HomeList;
