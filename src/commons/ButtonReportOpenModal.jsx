import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tooltip } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { setReportModalOpen } from '../state/features/reportModalSlice';

const ButtonReportOpenModal = () => {
	const dispatch = useDispatch();

	const handleReportButtonClick = () => {
		dispatch(setReportModalOpen(true));
	};
	return (
		<Tooltip title='¡New report!' placement='left'>
			<Button
				variant='contained'
				color='success'
				className='button-rotate'
				sx={{
					marginRight: '10px',
					backgroundColor: '#3AB54A',
					minWidth: '60px',
					width: '60px',
					height: '60px',
					borderRadius: '50%',
					position: 'fixed',
					right: 0,
					bottom: '100px',
					zIndex: 99,
				}}
				onClick={handleReportButtonClick}
			>
				<PostAddIcon className='icon-rotate' fontSize='large' />
			</Button>
		</Tooltip>
	);
};
export default ButtonReportOpenModal;
