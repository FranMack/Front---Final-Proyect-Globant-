/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import GeocodeUser from '../utils/hookGeocodeUser';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBar from '../components/Navbar';
import {
	FormControl,
	InputLabel,
	Input,
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

const HomeList = () => {

	const geocodeUserLocation = GeocodeUser();
	
	const navigate = useNavigate();
	const [officeList, setOfficeList] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState('');
	const [selectedDeskNumber, setSelectedDeskNumber] = useState(null);
	
	const [selectedLocation, setSelectedLocation] = useState('');
	const [adress,setAdress]=useState(null)
	const [eddit,setEddit]=useState(false)

	const clearAdress=()=>{
		setAdress("Insert your adress")
	}

	const handleAdress=(event)=>{
		setAdress(event.target.value)
	}

	const handleEddit=()=>{
		if(eddit){
			setEddit(!eddit)
		}

		else{

			setAdress(null)
			setEddit(!eddit)
		}
		
	}

	const handleNearbyOfficeChange = event => {
		setSelectedLocation(event.target.value);
	};

	const dateReport = new Date()
		.toLocaleDateString('es-AR')
		.split('/')
		.reverse()
		.join('-');

	const user = useSelector(state => state.user);
	const report = useSelector(state => state.report);
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

			await axios.put('http://localhost:5000/api/v1/office/selectDesk', {
				officeId: selectedOffice._id,
				deskNumber: selectedDeskNumber,
			});
		} catch (error) {
			console.error('Error submitting report:', error);
		}
	};




	console.log('adress', adress);
	return (
		<Box component='form' onSubmit={handleSubmitNewReport} sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
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
				}}
			>
				<Typography variant='body1' sx={{marginBottom:"5%",marginTop:"5%"}}>
					Please check your adress
				</Typography>

				<FormControl style={{ width: '90%' }}>
					
					<Input
					disabled={!eddit}
					 value={adress===null ? geocodeUserLocation:adress}
					onChange={handleAdress}/>
					<Button onClick={handleEddit} sx={{color: '#3AB54A',}}>Edit</Button>
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
	);
};

export default HomeList;
