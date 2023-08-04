import { LoadingButton } from '@mui/lab';
import { Alert, Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import { setUser } from '../state/features/userSlice';
import userApi from '../api/modules/user.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
const LoginForm = () => {
	const dispatch = useDispatch();
	const [isLoginRequest, setIsLoginRequest] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const navigate = useNavigate();

	const signinForm = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('invalid email').required('email is required'),
			password: Yup.string()
				.min(8, 'password minimum 8 characters')
				.required('password is required'),
		}),
		onSubmit: async values => {
			setErrorMessage('');
			setIsLoginRequest(true);
			const { response, err } = await userApi.login(values);
			setIsLoginRequest(false);
			if (response) {
				signinForm.resetForm();
				dispatch(setUser(response));
				dispatch(setLoginModalOpen(false));
				navigate('/home');
				toast.success('Login successful');
			} else {
				setErrorMessage(err.message);
				toast.error(err.message);
			}
		},
	});

	const handleUpdatePassword = () => {};

	return (
		<Box component='form' onSubmit={signinForm.handleSubmit}>
			<Stack spacing={3}>
				<TextField
					type='email'
					placeholder='EMAIL'
					name='email'
					fullWidth
					value={signinForm.values.email}
					onChange={signinForm.handleChange}
					autoFocus
					variant='standard'
					color='success'
					error={
						signinForm.touched.email && signinForm.errors.email !== undefined
					}
					helperText={signinForm.touched.email && signinForm.errors.email}
				/>
				<TextField
					type='password'
					placeholder='PASSWORD'
					name='password'
					fullWidth
					value={signinForm.values.password}
					onChange={signinForm.handleChange}
					variant='standard'
					color='success'
					error={
						signinForm.touched.password &&
						signinForm.errors.password !== undefined
					}
					helperText={signinForm.touched.password && signinForm.errors.password}
				/>
			</Stack>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 3,
					marginBottom: 3,
				}}
			>
				<LoadingButton
					type='submit'
					variant='contained'
					color='success'
					size='large'
					sx={{
						width: '50%',
						marginBottom: 3,
						borderRadius: '20px',
					}}
					loading={isLoginRequest}
				>
					LOG IN
				</LoadingButton>
				<Link
					style={{ textDecoration: 'none', color: '#595757' }}
					onClick={handleUpdatePassword}
				>
					DID YOU FORGET YOUR PASSWORD?
				</Link>
			</Box>
			{errorMessage && (
				<Box sx={{ marginTop: 2 }}>
					<Alert severity='error' variant='outlined'>
						{errorMessage}
					</Alert>
				</Box>
			)}
		</Box>
	);
};

export default LoginForm;
