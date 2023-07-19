import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import technicalServiceImage from '../assets/technical-service-image.png';
import {
	Box,
	TextField,
	FormControl,
	InputLabel,
	IconButton,
	Select,
	MenuItem,
	Button,
} from '@mui/material';

const ReportCamOff = () => {
	const [item, setItem] = useState('');
	const [descripcion, setDescripcion] = useState('');

	const handleItemChange = event => {
		setItem(event.target.value);
	};

	const handleDescripcionChange = event => {
		setDescripcion(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log('Item:', item);
		console.log('Descripción:', descripcion);
		setItem('');
		setDescripcion('');
	};

	return (
		<>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					borderBottom: '1px solid grey',
				}}
			>
				<div
					style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}
				>
					<IconButton component={Link} to='/home'>
						<KeyboardBackspaceIcon />
					</IconButton>
					<h3 style={{ marginLeft: '16px', color: 'grey' }}>New Report</h3>
				</div>
			</Box>
			<Box
				component='form'
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h3
					style={{
						textAlign: 'center',
						fontSize: '26px',
						color: 'rgb(77, 75, 75)',
					}}
				>
					Enter the Damaged item manually
				</h3>

				<img
					src={technicalServiceImage}
					alt='Technical Service'
					style={{ width: '200px' }}
				/>
				<FormControl style={{ width: '90%' }}>
					<Select
						labelId='item-label'
						id='item-select'
						value={item}
						onChange={handleItemChange}
					>
						<MenuItem value='cable-hdmi'>Cable HDMI</MenuItem>
						<MenuItem value='teclado'>Teclado</MenuItem>
						<MenuItem value='mouse'>Mouse</MenuItem>
					</Select>
					<InputLabel id='item-label'>Item</InputLabel>
				</FormControl>

				<TextField
					label='Description'
					multiline
					rows={4}
					value={descripcion}
					onChange={handleDescripcionChange}
					margin='normal'
					variant='outlined'
					style={{ width: '90%' }}
				/>

				<Button type='submit' variant='contained' color='primary'>
					Create
				</Button>
			</Box>
		</>
	);
};

export default ReportCamOff;
