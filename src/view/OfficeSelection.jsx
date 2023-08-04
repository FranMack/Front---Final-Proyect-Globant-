/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { haversineDistance } from '../utils/calculus';
import useUserLocation from '../utils/hookUserLocation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import NotFound from './NotFound.view';

const OfficeSelection = () => {
	const navigate = useNavigate();
	const [officeList, setOfficeList] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState('');
	const [selectedDeskNumber, setSelectedDeskNumber] = useState(null);

	const dateReport = new Date()
		.toLocaleDateString('es-AR')
		.split('/')
		.reverse()
		.join('-');

	const user = useSelector(state => state.user);
	const reportJson = localStorage.getItem('reportData');
	const report = JSON.parse(reportJson);
	const userLocation = useUserLocation();

	const filterNearbyOffices = radius => {
		radius = 500;
		if (!userLocation) return [];

		const nearbyOffices = officeList.filter(office => {
			const distance = haversineDistance(
				userLocation.lat,
				userLocation.lng,
				office.latitude,
				office.longitude,
			);

			return distance <= radius;
		});

		return nearbyOffices;
	};

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

	const handleSubmitNewReport = async e => {
		e.preventDefault();
		try {
			const reportOffice = {
				user: user.username,
				url_img: report.url_img || report.url_img,
				device: report.device,
				description: report.description,
				location: selectedOffice.location,
				latitude: userLocation.lat,
				longitude: userLocation.lng,
				homeoffice: false,
				box_number: selectedDeskNumber,
				status_report: 'Open',
				date_report: dateReport,
			};

			const response = await axios.post(
				'http://localhost:5000/api/v1/report/newReport',
				reportOffice,
			);
			console.log('Report submitted successfully:', response.data);
			toast.success('Report create successfully');
			navigate('/home');

			localStorage.removeItem('reportData');

			await axios.put('http://localhost:5000/api/v1/office/selectDesk', {
				officeId: selectedOffice._id,
				deskNumber: selectedDeskNumber,
			});
		} catch (error) {
			console.error('Error submitting report:', error);
		}
	};

	return (
		<>
			{reportJson ? (
				<Box
					component='form'
					onSubmit={handleSubmitNewReport}
					sx={{ height: '110vh' }}
				>
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
								Select your nearby office
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
							<InputLabel id='nearby-office-label'>Nearby Offices</InputLabel>
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
								{filterNearbyOffices(10).map(office => (
									<MenuItem key={office._id} value={office._id}>
										{office.location}, {office.location}
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
									New Report
								</Button>
							</>
						) : (
							<Typography variant='body1'>
								Please select your nearby office to see the map.
							</Typography>
						)}
					</Box>
				</Box>
			) : (
				<NotFound />
			)}
		</>
	);
};

export default OfficeSelection;
