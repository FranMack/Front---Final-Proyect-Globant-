import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setReportModalOpen } from '../state/features/reportModalSlice';
import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Link } from 'react-router-dom';

const ReportModal = () => {
	const { reportModalOpen } = useSelector(state => state.reportModal);
	const dispatch = useDispatch();

	const handleReportModalClose = () => dispatch(setReportModalOpen(false));

	return (
		<Modal open={reportModalOpen} onClose={handleReportModalClose}>
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
						to='/report-cam-on'
						style={{
							backgroundColor: '#3AB54A',
							color: '#FFFFFF',
							borderRadius: '20px',
							width: '90%',
						}}
						onClick={() => dispatch(setReportModalOpen(false))}
					>
						I HAVE CAMERA
						<VideocamIcon />
					</Button>
					<Button
						component={Link}
						variant='contained'
						to='/report-cam-off'
						style={{
							backgroundColor: '#FFFFFF',
							color: '#3AB54A',
							borderRadius: '20px',
							width: '90%',
							border: '1px solid #3AB54A',
						}}
						onClick={() => dispatch(setReportModalOpen(false))}
					>
						I DON&apos;T HAVE A CAMERA
						<VideocamOffIcon />
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ReportModal;
