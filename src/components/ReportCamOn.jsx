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
	InputAdornment,
} from '@mui/material';
import { setOfficeHomeModalOpen } from '../state/features/officeHomeModalSlice';

import { useNavigate } from 'react-router';
import axios from 'axios';
import { setReport } from '../state/report';
import { useDispatch } from 'react-redux';

const ReportCamOn = ({
	objectInCamera,
	capturedImage,
	handleConfirmObject,
}) => {
	const maxChars = 100;
	const navigate = useNavigate();
	const [item, setItem] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [selectedFile, setselectedFile] = useState(null);
	const [descripcionError, setDescripcionError] = useState('');
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);

	const handleFileChange = e => {
		const file = e.target.files[0];
		setselectedFile(file);

		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
		}
	};
	const date = {
		url_img: selectedFile,
		device: item,
		description: descripcion,
	};

	const handleDescripcionChange = event => {
		const inputValue = event.target.value;
		const singleSpaceValue = inputValue.replace(/\s+/g, ' ');

		setDescripcion(singleSpaceValue);

		if (singleSpaceValue.length < 10 || singleSpaceValue.length > maxChars) {
			setDescripcionError('Description must be between 10 and 100 characters.');
		} else {
			setDescripcionError('');
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(setReport(date));
		if (descripcionError || item === '') {
			toast.error(descripcionError);
			setIsFormValid(false);
		}
	};

	useEffect(() => {
		if (descripcion && !descripcionError && item) {
			setIsFormValid(true);
		}
	}, [descripcion]);

	const remainingChars = maxChars - descripcion.length;

	useEffect(() => {
		const getOffices = async () => {
			try {
				await axios.get('http://localhost:5000/api/v1/office/allOffices');
				setItem(objectInCamera);
				setselectedFile(capturedImage);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		getOffices();
	}, []);

	console.log('item', item);
	console.log('description', descripcion);
	console.log('todoListo', isFormValid);
	console.log('descriptionError', descripcionError);

	return (
		<>
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
					Enter the Damaged item
				</h3>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '90%',
						paddingBottom: '20px',
					}}
				>
					{selectedFile ? (
						<img
							src={selectedFile}
							alt='Uploaded File'
							style={{ width: '200px' }}
						/>
					) : null}
				</Box>

				<FormControl style={{ width: '90%' }}>
					<InputLabel id='demo-simple-select-label' required>
						Item
					</InputLabel>
					<Select
						id='demo-simple-select'
						value={objectInCamera}
						label='item'
						onChange={handleConfirmObject}
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
						<MenuItem value={objectInCamera}>{objectInCamera}</MenuItem>
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

export default ReportCamOn;
