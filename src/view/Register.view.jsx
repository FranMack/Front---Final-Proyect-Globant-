import React, { useState } from 'react';
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

import globantImage from '../assets/Globant-Original1.png';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
	const [number, setNumber] = useState('');
	const [image, setImage] = useState('');
	const [errorMessage, setErrorMessage] = useState();
	const [isLoginRequest, setIsLoginRequest] = useState(false);

	const handleImageUpload = e => {
		const file = e.target.files[0];
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
						phone_number: Number(number),
						ubication: values.location,
						genre: 'no binario',
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

	const buttonStyles = {
		borderRadius: '50px',
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
		color: '#000000',
		border: '2px solid #808080',
		padding: '8px 50px',
		marginTop: '20px',
	};
	return (
		<>
			<ToastContainer />
			<Box
				component='form'
				onSubmit={signupForm.handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '16px',
					marginLeft: '2px',
				}}
			>
				<Grid
					container
					spacing={2}
					style={{ borderBottom: '1px solid grey', width: '100%' }}
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
					spacing={2}
					justifyContent='center'
					alignItems='center'
					style={{
						marginTop: '1px',
						marginBottom: '16px',
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
					</Grid>
					<Grid item style={{ marginBottom: '20px' }}>
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
									error={
										signupForm.touched.first_name &&
										signupForm.errors.first_name !== undefined
									}
									helperText={
										signupForm.touched.first_name &&
										signupForm.errors.first_name
									}
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
									error={
										signupForm.touched.last_name &&
										signupForm.errors.last_name !== undefined
									}
									helperText={
										signupForm.touched.last_name && signupForm.errors.last_name
									}
								/>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						style={{
							borderBottom: '1px solid grey',
							width: '100%',
							marginTop: '20px',
							marginLeft: '5px',
						}}
					></Grid>

					<Grid item>
						<TextField
							color='success'
							sx={{ width: '300px' }}
							name='email'
							label='Email'
							variant='standard'
							value={signupForm.values.email}
							onChange={signupForm.handleChange}
							error={
								signupForm.touched.email &&
								signupForm.errors.email !== undefined
							}
							helperText={signupForm.touched.email && signupForm.errors.email}
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
							error={
								signupForm.touched.username &&
								signupForm.errors.username !== undefined
							}
							helperText={
								signupForm.touched.username && signupForm.errors.username
							}
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
							error={
								signupForm.touched.password &&
								signupForm.errors.password !== undefined
							}
							helperText={
								signupForm.touched.password && signupForm.errors.password
							}
						/>
					</Grid>
					<Grid item>
						<Grid container spacing={2}>
							<Grid item>
								<TextField
									color='success'
									sx={{ width: '140px' }}
									name='location'
									label='Location'
									variant='standard'
									value={signupForm.values.location}
									onChange={signupForm.handleChange}
									error={
										signupForm.touched.location &&
										signupForm.errors.location !== undefined
									}
									helperText={
										signupForm.touched.location && signupForm.errors.location
									}
								/>
							</Grid>
							<Grid item>
								<TextField
									color='success'
									sx={{ width: '140px' }}
									name='phone_number'
									label='Phone number'
									variant='standard'
									value={number}
									onChange={e => setNumber(e.target.value)}
								/>
							</Grid>
						</Grid>
					</Grid>
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
				>
					NEW ACCOUNT
				</LoadingButton>

				<Grid item xs={12} sm={6} md={4} lg={3} style={{ marginTop: '40px' }}>
					<img
						src={globantImage}
						alt='Globant Logo'
						style={{
							width: '60%',
							height: 'auto',
							maxWidth: '400px',
							marginLeft: '69px',
						}}
					/>
				</Grid>
			</Box>
		</>
	);
};

export default Register;
