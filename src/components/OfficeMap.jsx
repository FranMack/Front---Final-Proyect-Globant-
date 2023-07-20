import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
				></div>,
			);
		}
		return boxes;
	};

	return (
		<div>
			<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
				Select your floor
			</Typography>
			<FormControl
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<InputLabel id='item-label'>Floor</InputLabel>
				<Select label='floor' id='office-select' sx={{ width: '90%' }}>
					<MenuItem value='1'>1</MenuItem>
					<MenuItem value='2'>2</MenuItem>
				</Select>
			</FormControl>

			{!selectedDesk ? (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Please select your desk
				</Typography>
			) : (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Your desk is: {selectedDesk}
				</Typography>
			)}
			<div className='map'>
				<div className='grid-container'>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 1 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(1)}
						/>
						<div className='column-container'>
							{renderBoxes(2, 7)}
							<div
								className={`top-container ${
									selectedDesk === 8 ? 'selected' : ''
								}`}
								onClick={() => handleDeskClick(8)}
							/>
						</div>
					</div>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 9 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(9)}
						/>

						<div className='column-container'>
							{renderBoxes(10, 15)}
							<div
								className={`top-container ${
									selectedDesk === 16 ? 'selected' : ''
								}`}
								onClick={() => handleDeskClick(16)}
							/>
						</div>
					</div>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 17 ? 'selected' : ''
							}`}
							onClick={() => handleDeskClick(17)}
						/>

						<div className='column-container'>
							{renderBoxes(18, 23)}
							<div
								className={`top-container ${
									selectedDesk === 24 ? 'selected' : ''
								}`}
								onClick={() => handleDeskClick(24)}
							/>
						</div>
					</div>
				</div>
				<div className='grid-circle'>
					<div className='circle-container'>
						<div className='column1'>
							<div
								className={`circle ${selectedDesk === 25 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(25)}
							/>
							<div
								className={`circle ${selectedDesk === 26 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(26)}
							/>
						</div>
						<div className='column2'>
							<div
								className={`circle ${selectedDesk === 27 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(27)}
							/>
							<div
								className={`circle ${selectedDesk === 28 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(28)}
							/>
						</div>
					</div>
					<div className='circle-container'>
						<div className='column1'>
							<div
								className={`circle ${selectedDesk === 29 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(29)}
							/>
							<div
								className={`circle ${selectedDesk === 30 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(30)}
							/>
						</div>
						<div className='column2'>
							<div
								className={`circle ${selectedDesk === 31 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(31)}
							/>
							<div
								className={`circle ${selectedDesk === 32 ? 'selected' : ''}`}
								onClick={() => handleDeskClick(32)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OfficeMap;
