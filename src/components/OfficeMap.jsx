/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';

function OfficeMap({
	officeId,

	setSelectedDeskNumber,
}) {
	const [selectedDesk, setSelectedDesk] = useState(null);
	const user = useSelector(state => state.user);

	const handleDeskClick = async boxNumber => {
		const desk = officeId.desks.find(desk => desk.deskNumber === boxNumber);

		if (user.is_admin === 'false') {
			if (desk && desk.isOccupied) {
				return console.log('El escritorio está ocupado');
			}
		}

		setSelectedDeskNumber(boxNumber);
		setSelectedDesk(boxNumber);
	};

	const renderBoxes = (start, end) => {
		const boxes = [];
		for (let i = start; i <= end; i++) {
			const isSelected = selectedDesk === i;
			const desk = officeId.desks.find(desk => desk.deskNumber === i);
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
			{!selectedDesk ? (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Please select a desk
				</Typography>
			) : (
				<Typography sx={{ textAlign: 'center', marginTop: '5px' }} variant='h6'>
					Selected desktop: {selectedDesk}
				</Typography>
			)}
			<div className='map'>
				<div className='grid-container'>
					<div className='container'>
						<div
							className={`top-container ${
								selectedDesk === 1 ? 'selected' : ''
							} ${
								officeId.desks.find(desk => desk.deskNumber === 1)?.isOccupied
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
									officeId.desks.find(desk => desk.deskNumber === 8)?.isOccupied
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
								officeId.desks.find(desk => desk.deskNumber === 9)?.isOccupied
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
									officeId.desks.find(desk => desk.deskNumber === 16)
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
								officeId.desks.find(desk => desk.deskNumber === 17)?.isOccupied
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
									officeId.desks.find(desk => desk.deskNumber === 24)
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
									officeId.desks.find(desk => desk.deskNumber === 25)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(25)}
							/>
							<div
								className={`circle ${selectedDesk === 26 ? 'selected' : ''} ${
									officeId.desks.find(desk => desk.deskNumber === 26)
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
									officeId.desks.find(desk => desk.deskNumber === 27)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(27)}
							/>
							<div
								className={`circle ${selectedDesk === 28 ? 'selected' : ''} ${
									officeId.desks.find(desk => desk.deskNumber === 28)
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
									officeId.desks.find(desk => desk.deskNumber === 29)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(29)}
							/>
							<div
								className={`circle ${selectedDesk === 30 ? 'selected' : ''} ${
									officeId.desks.find(desk => desk.deskNumber === 30)
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
									officeId.desks.find(desk => desk.deskNumber === 31)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(31)}
							/>
							<div
								className={`circle ${selectedDesk === 32 ? 'selected' : ''} ${
									officeId.desks.find(desk => desk.deskNumber === 32)
										?.isOccupied
										? 'red-background'
										: ''
								}`}
								onClick={() => handleDeskClick(32)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OfficeMap;
