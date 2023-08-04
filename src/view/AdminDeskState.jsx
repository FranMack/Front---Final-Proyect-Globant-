import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/Navbar';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Button,
	Typography,
} from '@mui/material';
import OfficeMap from '../components/OfficeMap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDeskState = () => {
	const [officeList, setOfficeList] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState('');
	const [selectedDeskNumber, setSelectedDeskNumber] = useState(null);

	const handleOfficeChange = event => {
		const selectedLocation = event.target.value;
		const selectedOfficeData = officeList.find(
			office => office._id === selectedLocation,
		);
		setSelectedOffice(selectedOfficeData);
	};
	useEffect(() => {
		axios.get('http://localhost:5000/api/v1/office/allOffices').then(res => {
			setOfficeList(res.data);
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await axios.put('http://localhost:5000/api/v1/userAdmin/select-desk', {
				officeId: selectedOffice._id,
				deskNumber: selectedDeskNumber,
			});

			toast.success('Desk changed successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error submitting report:', error);
		}
	};

	return (
		<Box component='form' onSubmit={handleSubmit} sx={{ height: '110vh' }}>
			<ResponsiveAppBar />
			<Box
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
						Select an office
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
					<InputLabel id='nearby-office-label'>All Offices</InputLabel>
					<Select
						labelId='nearby-office-label'
						id='nearby-office-select'
						value={selectedOffice ? selectedOffice._id : ''}
						onChange={handleOfficeChange}
						label='Nearby Offices'
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: '200px',
									width: 'auto',
									overflowX: 'auto',
								},
							},
						}}
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{officeList.map(office => (
							<MenuItem key={office._id} value={office._id}>
								{office.name}, {office.location}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{selectedOffice ? (
					<>
						<OfficeMap
							officeId={selectedOffice}
							setSelectedDeskNumber={setSelectedDeskNumber}
						/>
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
							update desktop
						</Button>
					</>
				) : (
					<Typography variant='body1'>
						Select an office to view the map.
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default AdminDeskState;
