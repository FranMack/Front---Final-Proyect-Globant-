import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';

import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';

import { setLoginModalOpen } from '../state/features/loginModalSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';

const Register = () => {
	const [number, setNumber] = useState('');
	const [image, setImage] = useState('');
	const [errorMessage, setErrorMessage] = useState();
	const [isLoginRequest, setIsLoginRequest] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [formInitialized, setFormInitialized] = useState(false);
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');

	const handleImageUpload = e => {
		const file = e.target.files[0];
		const maxSizeInBytes = 1024 * 60;

		if (file && file.size > maxSizeInBytes) {
			setShowModal(true);
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signupForm = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			location: '',
			email: '',
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			first_name: Yup.string()
				.min(1, 'firstname minimum 1 character')
				.required('firstname is required'),
			last_name: Yup.string()
				.min(1, 'lastname minimum 1 character')
				.required('lastname is required'),
			location: Yup.string()
				.min(1, 'location minimum 1 character')
				.required('location is required'),
			email: Yup.string().email('invalid email').required('email is required'),
			username: Yup.string()
				.min(4, 'username minimum 4 characters')
				.required('username is required'),
			password: Yup.string()
				.min(8, 'password minimum 8 characters')
				.matches(
					/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
					'password must contain at least one special character',
				)
				.matches(/\d/, 'password must contain at least one number')
				.matches(/[a-z]/, 'password must contain at least one lowercase letter')
				.matches(/[A-Z]/, 'password must contain at least one capital letter')
				.required('password is required'),
		}),
		onSubmit: async values => {
			setErrorMessage(undefined);
			setIsLoginRequest(true);
			try {
				const response = await axios.post(
					'http://localhost:5000/api/v1/user/register',
					{
						first_name: values.first_name,
						last_name: values.last_name,
						phone_number: '+' + selectedCountry + '' + Number(number),
						location: values.location,
						email: values.email,
						username: values.username,
						is_admin: false,
						password: values.password,
						url_img: image,
					},
				);

				const user = response.data.user;
				toast.success(`User created ${user.username}`);
				navigate('/');
				dispatch(setLoginModalOpen(true));
			} catch (error) {
				const errorMessage =
					error.response?.data?.message ||
					'An error occurred during registration';
				setErrorMessage(errorMessage);
				toast.error(errorMessage);
			}
			setIsLoginRequest(false);
		},
	});

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		if (!formInitialized && signupForm.isValid) {
			setFormInitialized(true);
		}
	}, [formInitialized, signupForm.isValid]);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await axios.get('https://restcountries.com/v2/all');
				setCountries(response.data);
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		};

		fetchCountries();
	}, []);

	const handleCountryChange = event => {
		setSelectedCountry(event.target.value);
	};

	const handlePhoneNumberChange = e => {
		const inputValue = e.target.value;
		const numericValue = inputValue.replace(/[^0-9]/g, '').slice(0, 10);
		setNumber(numericValue);
	};

	const buttonStyles = {
		borderRadius: '50px',
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
		color: '#000000',
		border: '2px solid #808080',
		padding: '8px 50px',
		marginTop: '20px',
		backgroundColor:
			!formInitialized || !signupForm.isValid || !signupForm.dirty
				? '#F0F0F0'
				: 'initial',
	};
	return (
		<>
			<ToastContainer />
			<Box
				component='form'
				onSubmit={signupForm.handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: { xs: 'inherit', md: '0px auto' },
					padding: '0 0 20px 0',
					boxSizing: 'border-box',
				}}
			>
				<Grid
					container
					spacing={2}
					style={{
						borderBottom: '1px solid grey',
						width: '100%',
						marginTop: 0,
						marginLeft: 0,
					}}
				>
					<Grid style={{ display: 'flex', alignItems: 'center' }}>
						<IconButton component={Link} to='/'>
							<KeyboardBackspaceIcon />
						</IconButton>
						<h5 style={{ marginLeft: '8px', color: 'grey' }}>NEW REGISTER</h5>
					</Grid>
				</Grid>
				<Grid
					container
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						margin: '0 auto',
						width: '400px',
					}}
				>
					<Box
						sx={{
							borderBottom: '1px solid grey',
							padding: '10px 16px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								marginLeft: '10px',
							}}
						>
							<Grid>
								<input
									type='file'
									accept='image/jpeg, image/png'
									onChange={handleImageUpload}
									style={{ display: 'none' }}
									id='avatar-upload'
								/>
								<label htmlFor='avatar-upload'>
									<Avatar
										component='span'
										sx={{ width: 90, height: 90, cursor: 'pointer' }}
										src={image}
									>
										{!image &&
										signupForm.values.first_name &&
										signupForm.values.last_name
											? signupForm.values.first_name.charAt(0).toUpperCase() +
											  signupForm.values.last_name.charAt(0).toUpperCase()
											: null}
									</Avatar>
								</label>
								<Dialog open={showModal} onClose={handleCloseModal}>
									<DialogTitle>Imagen demasiado grande</DialogTitle>
									<DialogContent>
										<p>
											El tamaño de la imagen excede el límite permitido de 60KB.
											Por favor, selecciona una imagen más pequeña.
										</p>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={handleCloseModal}
											color='primary'
											autoFocus
										>
											Cerrar
										</Button>
									</DialogActions>
								</Dialog>
							</Grid>
							<Grid item style={{ marginBottom: '20px', padding: '16px' }}>
								<Grid container direction='column'>
									<Grid item>
										<TextField
											color='success'
											sx={{ width: '180px' }}
											name='first_name'
											label='Name'
											variant='standard'
											value={signupForm.values.first_name}
											onChange={signupForm.handleChange}
											onBlur={signupForm.handleBlur}
											error={
												signupForm.touched.first_name &&
												signupForm.errors.first_name !== undefined
											}
											helperText={
												signupForm.touched.first_name &&
												signupForm.errors.first_name
											}
											required
										/>
									</Grid>
									<Grid item>
										<TextField
											color='success'
											sx={{ width: '180px' }}
											name='last_name'
											label='Last name'
											variant='standard'
											value={signupForm.values.last_name}
											onChange={signupForm.handleChange}
											onBlur={signupForm.handleBlur}
											error={
												signupForm.touched.last_name &&
												signupForm.errors.last_name !== undefined
											}
											helperText={
												signupForm.touched.last_name &&
												signupForm.errors.last_name
											}
											required
										/>
									</Grid>
								</Grid>
							</Grid>

							<Grid
								style={{
									borderBottom: '1px solid grey',
									width: '100%',
									marginTop: '20px',
								}}
							></Grid>
						</Box>
					</Box>
					<Box
						sx={{
							padding: '16px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							rowGap: '10px',
						}}
					>
						<Grid item>
							<TextField
								color='success'
								sx={{ width: '300px' }}
								name='email'
								label='Email'
								variant='standard'
								value={signupForm.values.email}
								onChange={signupForm.handleChange}
								onBlur={signupForm.handleBlur}
								error={
									signupForm.touched.email &&
									signupForm.errors.email !== undefined
								}
								helperText={signupForm.touched.email && signupForm.errors.email}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								color='success'
								sx={{ width: '300px' }}
								name='username'
								label='Username'
								variant='standard'
								value={signupForm.values.username}
								onChange={signupForm.handleChange}
								onBlur={signupForm.handleBlur}
								error={
									signupForm.touched.username &&
									signupForm.errors.username !== undefined
								}
								helperText={
									signupForm.touched.username && signupForm.errors.username
								}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								color='success'
								sx={{ width: '300px' }}
								name='password'
								label='Password'
								variant='standard'
								type='password'
								value={signupForm.values.password}
								onChange={signupForm.handleChange}
								onBlur={signupForm.handleBlur}
								error={
									signupForm.touched.password &&
									signupForm.errors.password !== undefined
								}
								helperText={
									signupForm.touched.password && signupForm.errors.password
								}
								required
							/>
						</Grid>
						<Grid item>
							<TextField
								color='success'
								sx={{ width: '300px' }}
								name='location'
								label='Location'
								variant='standard'
								value={signupForm.values.location}
								onChange={signupForm.handleChange}
								onBlur={signupForm.handleBlur}
								error={
									signupForm.touched.location &&
									signupForm.errors.location !== undefined
								}
								helperText={
									signupForm.touched.location && signupForm.errors.location
								}
								required
							/>
						</Grid>
						<Grid item sx={{ width: '300px' }}>
							<Grid
								container
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									columnGap: '5px',
								}}
							>
								<Grid item>
									<FormControl
										variant='outlined'
										size='small'
										sx={{ width: '98px', marginTop: '16px' }}
									>
										<InputLabel id='country-select-label'>Country</InputLabel>
										<Select
											labelId='country-select-label'
											label='Country'
											value={selectedCountry}
											onChange={handleCountryChange}
											renderValue={value => `+${value}`}
										>
											{countries.map(country => (
												<MenuItem
													key={country.alpha2Code}
													value={country.callingCodes[0]}
												>
													{`${country.name} (+${country.callingCodes[0]})`}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item>
									<TextField
										color='success'
										name='phone_number'
										label='Phone number'
										variant='standard'
										sx={{ width: '197px' }}
										value={number}
										onChange={handlePhoneNumberChange}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				{errorMessage && (
					<Box sx={{ marginTop: 2 }}>
						<Alert severity='error' variant='outlined'>
							{errorMessage}
						</Alert>
					</Box>
				)}

				<LoadingButton
					type='submit'
					variant='outlined'
					style={buttonStyles}
					loading={isLoginRequest}
					disabled={
						!formInitialized || !signupForm.isValid || !signupForm.dirty
					}
				>
					NEW ACCOUNT
				</LoadingButton>
			</Box>
		</>
	);
};

export default Register;
