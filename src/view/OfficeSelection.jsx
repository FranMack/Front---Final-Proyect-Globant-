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
} from '@mui/material';
import OfficeMap from '../components/OfficeMap';
import { haversineDistance } from '../utils/calculus';
import useUserLocation from '../utils/hookUserLocation';
import { fakeData } from '../utils/fakeData';
import { useSelector } from 'react-redux';

const OfficeSelection = () => {
	const [officeList, setOfficeList] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState('');
	const user = useSelector((state)=> state.user)
	const report = useSelector((state)=> state.report)
	

	const isOfficeSelected = !!selectedOffice;

	const userLocation = useUserLocation();

	const filterNearbyOffices = radius => {
		radius = 32;
		if (!userLocation) return []; 

		const nearbyOffices = fakeData.filter(office => {
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

	const officeLocation = ()=>{
        return fakeData.filter(office =>{
			return office.direccion;
		}) 
	}

	const handleNearbyOfficeChange = event => {
		setSelectedOffice(event.target.value);
	};

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/v1/office/allOffices')
			.then(res => setOfficeList(res.data))
			.catch(error => {
				console.log(error);
			});
	}, []);

	const handleSubmitNewReport = (e)=>{
		e.preventDefault();
		axios.post('http://localhost:5000/api/v1/report/newReport',{
         user: user.username,
		 url_img: report.url_img.name,
		 device: report.device,
         description: report.description,
		 location: officeLocation,
		 latitude: userLocation.lat,
		 longitude: userLocation.lng,
		 status_report: "Open",
		 date_report: Date(),
		})
	}

	return (
		<>
			<ResponsiveAppBar />
			<Box
			    component='form'
				onSubmit={handleSubmitNewReport}
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
						value={selectedOffice}
						onChange={handleNearbyOfficeChange}
						label='Nearby Offices'
					>
						<MenuItem value=''>
							<em>None</em>
						</MenuItem>
						{filterNearbyOffices(10).map(office => (
							<MenuItem key={office.id} value={office.localidad}>
								{office.localidad},{office.direccion}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{isOfficeSelected && <OfficeMap />}
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

export default OfficeSelection;
