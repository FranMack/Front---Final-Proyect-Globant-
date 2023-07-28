/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import OfficeSelection from '../view/OfficeSelection';

function OfficeMap(props) {
	const [selectedDesk, setSelectedDesk] = useState(null);
	const [selectedFloor, setSelectedFloor] = useState('');

	const handleChange = event => {
		setSelectedFloor(event.target.value); // Update the selected floor when the value changes
	};

	const handleDeskClick = async boxNumber => {
		const desk = props.officeId.desks.find(
			desk => desk.deskNumber === boxNumber,
		);

		if (desk && desk.isOccupied) {
			return console.log('El escritorio está ocupado');
		}
		props.setSelectedDeskNumber(boxNumber);
		setSelectedDesk(boxNumber);
	};

	const renderBoxes = (start, end) => {
		const boxes = [];
		for (let i = start; i <= end; i++) {
			const isSelected = selectedDesk === i;
			const desk = props.officeId.desks.find(desk => desk.deskNumber === i);
			const isOccupied = desk ? desk.isOccupied : false;
			const deskClassName = `column ${isSelected ? 'selected' : ''} ${
				isOccupied ? 'red-background' : ''
			}`;

			boxes.push(
				<div
					key={i}
					className={deskClassName}
					onClick={() => handleDeskClick(i)}
				></div>,
			);
		}
		return boxes;
	};

	return (
		<>
			<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
				Select your floor
			</Typography>
			<FormControl
				style={{
					width: '90%',
				}}
			>
				<InputLabel id='item-label' required>
					floor
				</InputLabel>
				<Select
					label='floor'
					id='office-select'
					value={selectedFloor}
					onChange={handleChange}
					required
				>
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
							} ${
								props.officeId.desks.find(desk => desk.deskNumber === 1)
									?.isOccupied
									? 'red-background'
									: ''
							}`}
							onClick={() => handleDeskClick(1)}
						/>
						<div className='column-container'>
							{renderBoxes(2, 7)}
							<div
								className={`top-container ${
									selectedDesk === 8 ? 'selected' : ''
								} ${
									props.officeId.desks.find(desk => desk.deskNumber === 8)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(8)}
							/>
						</div>
					</div>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 9 ? 'selected' : ''
							} ${
								props.officeId.desks.find(desk => desk.deskNumber === 9)
									?.isOccupied
									? 'red-background'
									: ''
							}`}
							onClick={() => handleDeskClick(9)}
						/>

						<div className='column-container'>
							{renderBoxes(10, 15)}
							<div
								className={`top-container ${
									selectedDesk === 16 ? 'selected' : ''
								} ${
									props.officeId.desks.find(desk => desk.deskNumber === 16)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(16)}
							/>
						</div>
					</div>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 17 ? 'selected' : ''
							} ${
								props.officeId.desks.find(desk => desk.deskNumber === 17)
									?.isOccupied
									? 'red-background'
									: ''
							}`}
							onClick={() => handleDeskClick(17)}
						/>

						<div className='column-container'>
							{renderBoxes(18, 23)}
							<div
								className={`top-container ${
									selectedDesk === 24 ? 'selected' : ''
								} ${
									props.officeId.desks.find(desk => desk.deskNumber === 24)
										?.isOccupied
										? 'red-background'
										: ''
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
								className={`circle ${selectedDesk === 25 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 25)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(25)}
							/>
							<div
								className={`circle ${selectedDesk === 26 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 26)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(26)}
							/>
						</div>
						<div className='column2'>
							<div
								className={`circle ${selectedDesk === 27 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 27)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(27)}
							/>
							<div
								className={`circle ${selectedDesk === 28 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 28)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(28)}
							/>
						</div>
					</div>
					<div className='circle-container'>
						<div className='column1'>
							<div
								className={`circle ${selectedDesk === 29 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 29)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(29)}
							/>
							<div
								className={`circle ${selectedDesk === 30 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 30)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(30)}
							/>
						</div>
						<div className='column2'>
							<div
								className={`circle ${selectedDesk === 31 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 31)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(31)}
							/>
							<div
								className={`circle ${selectedDesk === 32 ? 'selected' : ''} ${
									props.officeId.desks.find(desk => desk.deskNumber === 32)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(32)}
							/>
							<OfficeSelection
								selectedDesk={selectedDesk}
								selectedFloor={selectedFloor}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OfficeMap;
