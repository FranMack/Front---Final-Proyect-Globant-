import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import LoginForm from '../components/LoginForm';
import React from 'react';
const LoginModal = () => {
	const { loginModalOpen } = useSelector(state => state.loginModal);
	const dispatch = useDispatch();

	const handleClose = () => dispatch(setLoginModalOpen(false));

	return (
		<Modal open={loginModalOpen} onClose={handleClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					maxWidth: '600px',
					padding: 4,
					outline: 'none',
				}}
			>
				<Box
					sx={{
						padding: 4,
						boxShadow: 24,
						backgroundColor: 'background.paper',
						borderRadius: '20px',
					}}
				>
					<LoginForm />
				</Box>
			</Box>
		</Modal>
	);
};

export default LoginModal;
