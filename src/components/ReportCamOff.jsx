import React, { useState } from 'react';
import { fakeData } from '../utils/fakeData';
import technicalServiceImage from '../assets/technical-service-image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Box,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	IconButton,
	Typography,
	InputAdornment,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import OfficeMap from './OfficeMap';
import ResponsiveAppBar from './Navbar';
import { useNavigate } from 'react-router';
import { haversineDistance } from '../utils/calculus';
import useUserLocation from '../utils/hookUserLocation';

const ReportCamOff = () => {
	const maxChars = 100;
	const navigate = useNavigate();
	const [item, setItem] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [selectedFile, setselectedFile] = useState(null);
	const [descripcionError, setDescripcionError] = useState('');
	const [isHomeOffice, setIsHomeOffice] = useState(false);
	const [selectedOffice, setSelectedOffice] = useState('');

	const userLocation = useUserLocation();

	const filterNearbyOffices = radius => {
		if (!userLocation) return []; // Return an empty array if userLocation is not available

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

	const handleNearbyOfficeChange = event => {
		setSelectedOffice(event.target.value);
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		setselectedFile(file);

		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleItemChange = event => {
		setItem(event.target.value);
	};
	// const handleOfficeChange = event => {
	// 	setOffice(event.target.value);
	// };

	const handleDescripcionChange = event => {
		const inputValue = event.target.value;
		const singleSpaceValue = inputValue.replace(/\s+/g, ' '); // Replace multiple spaces with a single space

		setDescripcion(singleSpaceValue);

		if (singleSpaceValue.length < 10 || singleSpaceValue.length > maxChars) {
			setDescripcionError('Description must be between 10 and 100 characters.');
		} else {
			setDescripcionError('');
		}
	};

	const handleHomeOfficeChange = event => {
		setIsHomeOffice(event.target.checked);
		setSelectedOffice(''); // Reset the selected office when switching between home office and regular office
	};

	const handleSubmit = event => {
		event.preventDefault();

		if (descripcionError) {
			toast.error(descripcionError);
		} else {
			toast.success('Report create successful');
			setItem('');
			setDescripcion('');
			setTimeout(() => {
				navigate('/home');
			}, 1000);
		}
	};
	const isOfficeSelected = !!selectedOffice;

	const remainingChars = maxChars - descripcion.length;

	return (
		<>
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
					<h3 style={{ marginLeft: '16px', color: 'grey' }}>New Report</h3>
				</div>
			</Box>
			<Box
				component='form'
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h3
					style={{
						textAlign: 'center',
						fontSize: '26px',
						color: 'rgb(77, 75, 75)',
					}}
				>
					Enter the Damaged item manually
				</h3>
				<img
					src={technicalServiceImage}
					alt='Technical Service'
					style={{ width: '200px', margin: '20px' }}
				/>
				<Box
					sx={{
						margin: 0,
						display: 'flex',
						alignItems: 'center',
						width: '90%',
						paddingBottom: '20px',
					}}
				>
					{selectedFile ? (
						<img
							src={URL.createObjectURL(selectedFile)}
							alt='Uploaded File'
							style={{ width: '150px', marginRight: '10px' }}
						/>
					) : null}
					<Typography
						variant='body1'
						style={{ flexGrow: 1, marginRight: '10px' }}
					>
						{selectedFile ? selectedFile.name : 'no files selected'}
					</Typography>
					<label htmlFor='fileInput'>
						<input
							type='file'
							accept='image/jpeg, image/png'
							onChange={handleFileChange}
							style={{ display: 'none' }}
							id='fileInput'
						/>
						<IconButton
							color='primary'
							aria-label='upload picture'
							component='span'
						>
							<PhotoCameraIcon />
						</IconButton>
					</label>
				</Box>

				<FormControl style={{ width: '90%' }}>
					<InputLabel id='demo-simple-select-label' required>
						Item
					</InputLabel>
					<Select
						id='demo-simple-select'
						value={item}
						label='item'
						onChange={handleItemChange}
						required
					>
						<MenuItem value='notebook-charger'>Notebook Charger</MenuItem>
						<MenuItem value='cell-phone-charger'>Cellphone Charger</MenuItem>
						<MenuItem value='port-adapter'>Port Adapter</MenuItem>
						<MenuItem value='cable-hdmi'>HDMI Cable</MenuItem>
						<MenuItem value='cell-phone'>Cellphone</MenuItem>
						<MenuItem value='chair'>Chair</MenuItem>
						<MenuItem value='headset'>Headset</MenuItem>
						<MenuItem value='keyboard'>Keyboard</MenuItem>
						<MenuItem value='laptop'>Laptop</MenuItem>
						<MenuItem value='modem'>Modem</MenuItem>
						<MenuItem value='monitor'>Monitor</MenuItem>
						<MenuItem value='mouse'>Mouse</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label='Description'
					multiline
					rows={4}
					required
					value={descripcion}
					onChange={handleDescripcionChange}
					error={!!descripcionError}
					helperText={descripcionError}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end' style={{ alignSelf: 'flex-end' }}>
								Max chars.: {remainingChars}/{maxChars}
							</InputAdornment>
						),
					}}
					margin='normal'
					variant='outlined'
					style={{ width: '90%' }}
				/>

				{/* Add the checkbox */}
				<FormControlLabel
					control={
						<Checkbox
							checked={isHomeOffice}
							onChange={handleHomeOfficeChange}
							name='homeOffice'
							color='primary'
						/>
					}
					label='If you are doing home office, check the box.'
					style={{ alignSelf: 'flex-start', marginLeft: '20px' }}
				/>

				{isHomeOffice ? (
					<Typography variant='body1' style={{ margin: '10px' }}>
						Home office selected. Office options, floor, and office map will be
						hidden.
					</Typography>
				) : (
					<>
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
					</>
				)}
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

export default ReportCamOff;
