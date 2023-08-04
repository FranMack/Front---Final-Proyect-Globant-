import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
	Box,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Input,
	Stack,
} from '@mui/material';

import Button from '@mui/material/Button';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../state/features/userSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Profile = () => {
	const user = useSelector(state => state.user);

	const [userData, setUserData] = useState({});
	const [editing, setEditing] = useState(false);
	const [image, setImage] = useState(user.url_img);
	const [showModal, setShowModal] = useState(false);
	const [office, setOffice] = useState([]);
	const [selectedOffice, setSelectedOffice] = useState({});

	const dispatch = useDispatch();

	const validationSchema = Yup.object({
		firstName: Yup.string()
			.min(3, 'First name minimum 3 characters')
			.required('First name is required')
			.matches(/^[A-Za-z]+$/, 'First name should contain only letters'),
		lastName: Yup.string()
			.min(3, 'Last name minimum 3 characters')
			.matches(/^[A-Za-z]+$/, 'Last name should contain only letters')
			.required('Last name is required'),
		email: Yup.string().email('Invalid email').required('Email is required'),
		location: Yup.string()
			.min(3, 'location minimum 3 characters')
			.required('location is required'),
		phoneNumber: Yup.number()
			.required('Phone number is required')
			.typeError('phone number must be a number')
			.integer('phone number must be a integer'),
	});

	const handleEditClick = () => {
		setEditing(true);
		setSelectedOffice(userData.office);
	};

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/v1/user/profile/${user.username}`,
				);
				setUserData(response.data[0]);
				if (response.data[0].office) {
					setSelectedOffice(response.data[0].office);
				}

				setImage(response.data[0].url_img);
			} catch (error) {
				return { msg: ' Error retrieving user', error };
			}
		};
		const getOffices = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/v1/office/allOffices',
				);

				setOffice(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		getOffices();
		getUsers();
	}, [user.username]);
	const profileForm = useFormik({
		initialValues: {
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			location: user.location,
			phoneNumber: user.phone_number,
			office: user.office ? user.office : null,
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			try {
				const updatedData = {
					first_name: values.firstName,
					last_name: values.lastName,
					username: user.username,
					email: values.email,
					location: values.location,
					phone_number: values.phoneNumber,
					url_img: image,
					office: selectedOffice,
				};
				const response = await axios.put(
					`http://localhost:5000/api/v1/user/profile/${user.username}`,
					updatedData,
				);
				setUserData(response.data);
				dispatch(setUser(updatedData));

				setEditing(false);
			} catch (error) {
				console.error('Error editing user', error);
			}
		},
	});

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

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleChangeOffice = event => {
		setSelectedOffice(event.target.value);
	};

	return (
		<>
			<Box
				sx={{
					margin: { xs: 'inherit', md: '0px auto' },
					paddingBottom: '70px',
				}}
				onSubmit={profileForm.handleSubmit}
			>
				<Box
					sx={{
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
						<h3 style={{ marginLeft: '16px', color: 'grey' }}>Profile</h3>
					</div>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						margin: '0 auto',
						width: '90%',
						marginTop: '70px',
					}}
				>
					<Card
						style={{
							padding: '20px 5px',
							border: '2px solid grey',
						}}
					>
						<Box
							sx={{
								padding: '10px 16px',
								display: 'flex',
								alignItems: 'center',
								marginLeft: '10px',
								marginBottom: '20px',
								borderBottom: '1px solid grey',
							}}
						>
							<input
								type='file'
								disabled={!editing}
								accept='image/jpeg, image/png'
								onChange={handleImageUpload}
								style={{ display: 'none' }}
								id='avatar-upload'
							/>

							<label htmlFor='avatar-upload'>
								<Avatar
									component='span'
									sx={{ width: 90, height: 90, cursor: 'pointer' }}
									src={image || userData.url_img}
								>
									{!image && userData.first_name && userData.last_name
										? userData.first_name.charAt(0).toUpperCase() +
										  userData.last_name.charAt(0).toUpperCase()
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
									<Button onClick={handleCloseModal} color='primary' autoFocus>
										Cerrar
									</Button>
								</DialogActions>
							</Dialog>

							<div style={{ padding: '16px' }}>
								<Stack spac ing={2}>
									<FormControl sx={{ width: '100%', marginTop: '10px' }}>
										<Input
											value={profileForm.values.firstName}
											onChange={profileForm.handleChange}
											disabled={!editing}
											name='firstName'
											label='Name'
											aria-describedby='name-helper'
											sx={{ borderBottom: '1.5px solid #808080' }}
										/>
										{!profileForm.errors.firstName ? (
											<FormHelperText
												sx={{ fontSize: '11px', textAlign: 'center' }}
												id='name-helper'
											>
												Firts Name
											</FormHelperText>
										) : (
											<FormHelperText
												sx={{
													fontSize: '11px',
													textAlign: 'center',
													color: 'red',
												}}
											>
												{profileForm.errors.firstName}
											</FormHelperText>
										)}
									</FormControl>
									<FormControl sx={{ width: '100%' }}>
										<Input
											value={profileForm.values.lastName}
											onChange={profileForm.handleChange}
											disabled={!editing}
											name='lastName'
											label='Last name'
											aria-describedby='name-helper'
											sx={{ borderBottom: '1.5px solid #808080' }}
										/>
										{!profileForm.errors.lastName ? (
											<FormHelperText
												sx={{ fontSize: '11px', textAlign: 'center' }}
												id='lastname-helper'
											>
												Last Name
											</FormHelperText>
										) : (
											<FormHelperText
												sx={{
													fontSize: '11px',
													textAlign: 'center',
													color: 'red',
												}}
											>
												{profileForm.errors.lastName}
											</FormHelperText>
										)}
									</FormControl>
								</Stack>
							</div>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								padding: '16px',
							}}
						>
							<FormControl sx={{ width: '100%', marginTop: '10px' }}>
								<Input
									onChange={profileForm.handleChange}
									value={profileForm.values.email}
									disabled={!editing}
									id='email'
									type='email'
									aria-describedby='email-helper'
									sx={{ borderBottom: '1.5px solid #808080' }}
								/>

								{!profileForm.errors.email ? (
									<FormHelperText
										sx={{ fontSize: '11px', textAlign: 'center' }}
										id='email-helper'
									>
										email
									</FormHelperText>
								) : (
									<FormHelperText
										sx={{
											fontSize: '11px',
											textAlign: 'center',
											color: 'red',
										}}
									>
										{profileForm.errors.email}
									</FormHelperText>
								)}
							</FormControl>
							<FormControl sx={{ width: '100%', marginTop: '10px' }}>
								<Input
									value={profileForm.values.location}
									id='location'
									type='text'
									onChange={profileForm.handleChange}
									disabled={!editing}
									aria-describedby='location-helper'
									sx={{ borderBottom: '1.5px solid #808080' }}
								/>

								{!profileForm.errors.location ? (
									<FormHelperText
										sx={{ fontSize: '11px', textAlign: 'center' }}
										id='location-helper'
									>
										Location
									</FormHelperText>
								) : (
									<FormHelperText
										sx={{
											fontSize: '11px',
											textAlign: 'center',
											color: 'red',
										}}
									>
										{profileForm.errors.location}
									</FormHelperText>
								)}
							</FormControl>
							<FormControl sx={{ width: '100%', marginTop: '10px' }}>
								<Input
									value={profileForm.values.phoneNumber}
									onChange={profileForm.handleChange}
									id='phoneNumber'
									type='text'
									disabled={!editing}
									aria-describedby='phoneNumber-helper'
									sx={{ borderBottom: '1.5px solid #808080' }}
								/>

								{!profileForm.errors.phoneNumber ? (
									<FormHelperText
										sx={{ fontSize: '11px', textAlign: 'center' }}
										id='phoneNumber-helper'
									>
										Phone Number
									</FormHelperText>
								) : (
									<FormHelperText
										sx={{
											fontSize: '11px',
											textAlign: 'center',
											color: 'red',
										}}
									>
										{profileForm.errors.phoneNumber}
									</FormHelperText>
								)}
							</FormControl>
							<FormControl sx={{ m: 1, width: '300px', marginTop: '30px' }}>
								<Select
									labelId='demo-controlled-open-select-label'
									id='demo-controlled-open-select'
									sx={{ height: '40px' }}
									value={selectedOffice}
									disabled={editing ? false : true}
									onChange={handleChangeOffice}
								>
									<MenuItem value=''>Select an office</MenuItem>
									{office?.map((item, index) => (
										<MenuItem
											key={index}
											value={`${item.name},${item.location}`}
										>
											{item.name},{item.location}
										</MenuItem>
									))}
								</Select>
								<FormHelperText
									sx={{
										fontSize: '11px',
										textAlign: 'center',
									}}
									id='name-helper'
								>
									Office
								</FormHelperText>
							</FormControl>
						</Box>
						<Box
							sx={{
								textAlign: 'center',
							}}
						>
							{editing ? (
								<Button
									variant='contained'
									type='submit'
									color='success'
									onClick={profileForm.handleSubmit}
									style={{ width: '130px', borderRadius: '20px' }}
								>
									Save
								</Button>
							) : (
								<Button
									variant='contained'
									color='success'
									onClick={handleEditClick}
									style={{ width: '130px', borderRadius: '20px' }}
								>
									Edit
								</Button>
							)}
						</Box>
					</Card>
				</Box>
			</Box>
		</>
	);
};

export default Profile;
