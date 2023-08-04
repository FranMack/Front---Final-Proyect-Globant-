/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import GeocodeUser from '../utils/hookGeocodeUser';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBar from '../components/Navbar';
import { FormControl, Input, Box, Button } from '@mui/material';
import useUserLocation from '../utils/hookUserLocation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import NotFound from './NotFound.view';

const HomeList = () => {
	const geocodeUserLocation = GeocodeUser();

	const navigate = useNavigate();

	const [selectedOffice, setSelectedOffice] = useState('');
	const [selectedDeskNumber, setSelectedDeskNumber] = useState(null);

	const [adress, setAdress] = useState(null);
	const [edit, setEdit] = useState(false);
	const [editButton, setEditButton] = useState('EDIT');

	const handleAdress = event => {
		setAdress(event.target.value);
	};

	const handleEdit = () => {
		if (edit) {
			setEditButton('EDIT');
			setEdit(false);
			setAdress(geocodeUserLocation);
		}
		if (!edit) {
			setEdit(true);
			setAdress(null);
			setEditButton('GPS ADDRES');
		}
	};




	const dateReport = new Date().toISOString()


	const user = useSelector(state => state.user);
	const reportJson = localStorage.getItem('reportData');
	const report = JSON.parse(reportJson);
	const userLocation = useUserLocation();

	const handleSubmitNewReport = async e => {
		e.preventDefault();
		try {
			const reportOffice = {
				user: user.username,
				url_img: report.url_img || report.url_img,
				device: report.device,
				description: report.description,
				location: adress || geocodeUserLocation,
				latitude: userLocation.lat,
				longitude: userLocation.lng,
				homeoffice: true,
				box_number: 0,
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
			{report ? (
				<Box
					component='form'
					onSubmit={handleSubmitNewReport}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
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
								Home office address
							</h3>
						</div>
					</Box>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							marginTop: '10px',
							height: '80vh',
						}}
					>
						<h3 style={{ marginBottom: '5%', marginTop: '5%' }}>
							Please check your adress
						</h3>

						<FormControl style={{ width: '90%' }}>
							<Input
								sx={{ textAlign: 'center' }}
								disabled={!edit}
								value={adress === null ? geocodeUserLocation : adress}
								onChange={handleAdress}
							/>
							<Button onClick={handleEdit} sx={{ color: '#3AB54A' }}>
								{editButton}
							</Button>
						</FormControl>

						<>
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
					</Box>
				</Box>
			) : (
				<NotFound />
			)}
		</>
	);
};

export default HomeList;
