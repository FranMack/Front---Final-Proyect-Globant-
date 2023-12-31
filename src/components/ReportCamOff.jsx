/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { setOfficeHomeModalOpen } from '../state/features/officeHomeModalSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReport } from '../state/report';

const ReportCamOff = () => {
	const maxChars = 100;
	const [item, setItem] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [selectedFile, setselectedFile] = useState(null);
	const [descripcionError, setDescripcionError] = useState('');
	const [showModal, setShowModal] = useState(false);

	const [isFormValid, setIsFormValid] = useState(false);

	const dispatch = useDispatch();

	const date = {
		url_img: selectedFile,
		device: item,
		description: descripcion,
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		const maxSizeInBytes = 1024 * 60;

		if (file && file.size > maxSizeInBytes) {
			setShowModal(true);
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setselectedFile(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleItemChange = event => {
		setItem(event.target.value);
		if (descripcionError === '' && descripcion != '') setIsFormValid(true);
	};
	const handleDescripcionChange = event => {
		const inputValue = event.target.value;
		const singleSpaceValue = inputValue.replace(/\s+/g, ' ');

		setDescripcion(singleSpaceValue);

		if (singleSpaceValue.length < 10 || singleSpaceValue.length > maxChars) {
			setDescripcionError('Description must be between 10 and 100 characters.');
			setIsFormValid(false);
		} else {
			setDescripcionError('');
			if (item) setIsFormValid(true);
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(setReport(date));
		if (descripcionError && item === '') {
			toast.error(descripcionError);
			setIsFormValid(false);
		} else {
			setIsFormValid(true);
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const remainingChars = maxChars - descripcion.length;

	useEffect(() => {
		const getOffices = async () => {
			try {
				await axios.get('http://localhost:5000/api/v1/office/allOffices');
			} catch (error) {
				console.error('Error:', error);
			}
		};
		getOffices();
	}, []);

	return (
		<>
			<Dialog open={showModal} onClose={handleCloseModal}>
				<DialogTitle>Imagen demasiado grande</DialogTitle>
				<DialogContent>
					<p>
						El tamaño de la imagen excede el límite permitido de 60KB. Por
						favor, selecciona una imagen más pequeña.
					</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} color='primary' autoFocus>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
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
							src={selectedFile}
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
					<InputLabel id='demo-simple-select-label'>Element</InputLabel>
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
					required
				/>
				<Button
					variant='contained'
					type='submit'
					style={{
						backgroundColor: '#3AB54A',
						color: '#FFFFFF',
						borderRadius: '20px',
						margin: '20px',
					}}
					onClick={() => {
						if (isFormValid) {
							dispatch(setOfficeHomeModalOpen(true));
							const reportData = {
								device: item,
								description: descripcion,
								url_img: selectedFile,
							};
							const reportDataJson = JSON.stringify(reportData);
							localStorage.setItem('reportData', reportDataJson);
						} else {
							toast.error('Please complete the form before proceeding.');
						}
					}}
				>
					Next
				</Button>
			</Box>
		</>
	);
};

export default ReportCamOff;
