import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import {
	Box,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
} from '@mui/material';
import SearchInput from '../commons/SearchInput';
import ReportItem from '../commons/ReportItem';
import { TransformISOdate } from '../utils/functions';
import { orderByDate } from '../utils/functions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = ['Open', 'In progress'];

const ReportHome = () => {
	const [reports, setReports] = useState([]);
	const [search, setSearch] = useState('');
	const [date, setDate] = useState(null);
	const [isoDate, setIsoDate] = useState(null);
	const [allReports, setAllreports] = useState(false);
	const [stateReport, setStateReport] = useState(['Open']);

	const handleShowMore = () => {
		setAllreports(!allReports);
	};
	console.log(reports);
	const handleDate = newDate => {
		setDate(newDate);

		setIsoDate(TransformISOdate(newDate.$d));
	};

	const handleSearch = e => {
		setSearch(e.target.value);
	};

	const showAllTheReports = event => {
		event.preventDefault();
		axios
			.get('http://localhost:5000/api/v1/report/status/Open')
			.then(res => setReports(res.data))
			.catch(error => {
				console.log(error);
			});
	};

	const handleChange = event => {
		const { value } = event.target;
		setStateReport(typeof value === 'string' ? value.split(',') : value);
	};

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/v1/report/status/' + stateReport)
			.then(res => setReports(res.data))
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/api/v1/report/search?device=${search}&state=${stateReport}`,
			)
			.then(res => setReports(res.data))
			.catch(err => console.log(err));
	}, [search]);

	useEffect(() => {
		if (date) {
			axios
				.get(
					`http://localhost:5000/api/v1/report/search-by-date?date=${isoDate}&state=${stateReport}`,
				)
				.then(res => setReports(res.data))
				.catch(err => console.log(err));
		}
	}, [date]);

	return (
		<>
			<Box
				sx={{
					height: '100vh',
					width: { xs: 'inherit', md: '600px' },
					display: 'flex,',
					margin: { xs: '0 auto', md: '3% auto' },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '10%',
						marginTop: '5%',
					}}
				>
					<SearchInput
						search={search}
						handleSearch={handleSearch}
						date={date}
						isoDate={isoDate}
						handleDate={handleDate}
						showAllTheReports={showAllTheReports}
					/>
				</Box>

				<Box sx={{ textAlign: 'center' }}>
					<FormControl
						sx={{
							width: '80%',
							margin: '10px 0',
						}}
					>
						<InputLabel id='demo-multiple-checkbox-label'>State</InputLabel>
						<Select
							labelId='demo-multiple-checkbox-label'
							id='demo-multiple-checkbox'
							multiple
							value={stateReport}
							onChange={handleChange}
							input={<OutlinedInput label='State' />}
							renderValue={selected => selected.join(', ')}
							MenuProps={MenuProps}
							sx={{ borderRadius: '30px' }}
						>
							{names.map(name => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={stateReport.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Stack>
					{allReports
						? orderByDate(reports).map((report, i) => {
								return (
									<div key={i}>
										<ReportItem report={report} />
									</div>
								);
						  })
						: orderByDate(reports)
								.slice(0, 4)
								.map((report, i) => {
									return (
										<div key={i}>
											<ReportItem report={report} />
										</div>
									);
								})}
				</Stack>

				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Button
						onClick={handleShowMore}
						sx={{
							color: '#3AB54A',
							marginLeft: '5px',
							textDecoration: 'none',
						}}
					>
						{allReports ? `Mostrar menos` : `Mostrar mas...`}
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default ReportHome;
