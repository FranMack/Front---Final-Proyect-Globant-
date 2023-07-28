import React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setOfficeHomeModalOpen } from '../state/features/officeHomeModalSlice';
import { Link } from 'react-router-dom';
import GiteIcon from '@mui/icons-material/Gite';
import ApartmentIcon from '@mui/icons-material/Apartment';

const OfficeHomeModal = () => {
	const { officeHomeModalOpen } = useSelector(state => state.officeHomeModal);
	const dispatch = useDispatch();

	const handleReportModalClose = () => dispatch(setOfficeHomeModalOpen(false));

	return (
		<Modal open={officeHomeModalOpen} onClose={handleReportModalClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '25%',
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
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						rowGap: '8px',
					}}
				>
					<Button
						component={Link}
						variant='contained'
						to='/home-list'
						style={{
							backgroundColor: '#3AB54A',
							color: '#FFFFFF',
							borderRadius: '20px',
							width: '90%',
						}}
						onClick={() => dispatch(setOfficeHomeModalOpen(false))}
					>
						Home
						<GiteIcon />
					</Button>
					<Button
						component={Link}
						variant='contained'
						to='/office-list'
						style={{
							backgroundColor: '#FFFFFF',
							color: '#3AB54A',
							borderRadius: '20px',
							width: '90%',
							border: '1px solid #3AB54A',
						}}
						onClick={() => dispatch(setOfficeHomeModalOpen(false))}
					>
						Office
						<ApartmentIcon />
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default OfficeHomeModal;
