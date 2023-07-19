import React, { useState } from 'react';
import ResponsiveAppBar from './Navbar';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function OfficeMap() {
	const [selectedDesk, setSelectedDesk] = useState(null);

	const handleDeskClick = boxNumber => {
		setSelectedDesk(boxNumber);
	};
	const renderBoxes = (start, end) => {
		const boxes = [];
		for (let i = start; i <= end; i++) {
			const isSelected = selectedDesk === i;
			boxes.push(
				<div
					key={i}
					className={`column ${isSelected ? 'selected' : ''}`}
					onClick={() => handleDeskClick(i)}
				>
					{i}
				</div>,
			);
		}
		return boxes;
	};

	return (
		<>
			<ResponsiveAppBar />

			{!selectedDesk ? (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Please select your desk
				</Typography>
			) : (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Your desk is :{selectedDesk}
				</Typography>
			)}

			<div className='grid-container'>
				<div className='container'>
					<div
						className={`top-container ${selectedDesk === 1 ? 'selected' : ''}`}
						onClick={() => handleDeskClick(1)}
					>
						1
					</div>
					<div className='column-container'>
						{renderBoxes(2, 7)}
						<div
							className={`top-container ${
								selectedDesk === 8 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(8)}
						>
							8
						</div>
					</div>
				</div>
				<div className='container'>
					<div
						className={`top-container ${selectedDesk === 9 ? 'selected' : ''}`}
						onClick={() => handleDeskClick(9)}
					>
						9
					</div>
					<div className='column-container'>
						{renderBoxes(10, 15)}
						<div
							className={`top-container ${
								selectedDesk === 16 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(16)}
						>
							16
						</div>
					</div>
				</div>
				<div className='container'>
					<div
						className={`top-container ${selectedDesk === 17 ? 'selected' : ''}`}
						onClick={() => handleDeskClick(17)}
					>
						17
					</div>
					<div className='column-container'>
						{renderBoxes(18, 23)}
						<div
							className={`top-container ${
								selectedDesk === 24 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(24)}
						>
							24
						</div>
					</div>
				</div>
			</div>
			<div className='grid-circle'>
				<div className='circle-container'>
					<div className='column1'>
						<div
							className={`circle ${selectedDesk === 25 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(25)}
						>
							25
						</div>
						<div
							className={`circle ${selectedDesk === 26 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(26)}
						>
							26
						</div>
					</div>
					<div className='column2'>
						<div
							className={`circle ${selectedDesk === 27 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(27)}
						>
							27
						</div>
						<div
							className={`circle ${selectedDesk === 28 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(28)}
						>
							28
						</div>
					</div>
				</div>
				<div className='circle-container'>
					<div className='column1'>
						<div
							className={`circle ${selectedDesk === 29 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(29)}
						>
							29
						</div>
						<div
							className={`circle ${selectedDesk === 30 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(30)}
						>
							30
						</div>
					</div>
					<div className='column2'>
						<div
							className={`circle ${selectedDesk === 31 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(31)}
						>
							31
						</div>
						<div
							className={`circle ${selectedDesk === 32 ? 'selected' : ''}`}
							onClick={() => handleDeskClick(32)}
						>
							32
						</div>
					</div>
				</div>
			</div>
			<Button
				component={Link}
				to='/home'
				sx={{
					backgroundColor: '#3AB54A',
					color: '#FFFFFF',
					borderRadius: '20px',
				}}
			>
				Accept
			</Button>
		</>
	);
}

export default OfficeMap;
