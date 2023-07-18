import React, { useEffect } from 'react';
import globantImage from '../assets/Globant-Original1.png';
import globantBackground from '../assets/Globant-start-view.png';
import RegisterButton from '../commons/ButtonRegister';
import { Box, Grid } from '@mui/material';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import LoginModal from './LoginModal.view';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Start = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.user);

	useEffect(() => {
		if (!user) {
			navigate('/');
		} else {
			navigate('/home');
		}
	}, [user]);
	return (
		<>
			<LoginModal />
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					minHeight: '98vh',
					padding: '5px',
					backgroundImage: `url(${globantBackground})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Grid
					container
					justifyContent='center'
					alignItems='center'
					spacing={2}
					style={{ marginBottom: 'auto' }}
				>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<img
							src={globantImage}
							alt='Globant Logo'
							style={{
								position: 'absolute',
								bottom: '76%',
								width: '80%',
								height: 'auto',
								maxWidth: '400px',
								marginTop: '70px',
								marginLeft: '35px',
							}}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justifyContent='center'
					alignItems='center'
					spacing={2}
					style={{ marginTop: '8px', marginBottom: '50px' }}
				>
					<Grid item xs={12}>
						<Grid container justifyContent='center'>
							<RegisterButton />
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent='center'>
							<>
								Do you have an account?
								<Link
									onClick={() => dispatch(setLoginModalOpen(true))}
									style={{
										color: '#3AB54A',
										marginLeft: '5px',
										textDecoration: 'none',
									}}
								>
									Log in
								</Link>
							</>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Start;
