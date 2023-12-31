import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	Box,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Pagination,
	Select,
	Stack,
} from '@mui/material';
import SearchInput from '../commons/SearchInput';
import ReportItem from '../commons/ReportItem';
import { TransformISOdate } from '../utils/functions';
import { orderByDate } from '../utils/functions';
import { useSelector } from 'react-redux';

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

	const [stateReport, setStateReport] = useState(['Open']);
	const user = useSelector(state => state.user);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedReports = orderByDate(reports).slice(startIndex, endIndex);
	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

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
			.get(
				`http://localhost:5000/api/v1/report/status/${user.username}/` +
					(stateReport.length ? stateReport : ['Open', 'In progress']),
			)
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
			.get(
				`http://localhost:5000/api/v1/report/status/${user.username}/` +
					(stateReport.length ? stateReport : ['Open', 'In progress']),
			)
			.then(res => setReports(res.data))
			.catch(error => {
				console.log(error);
			});
	}, [stateReport]);

	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/api/v1/report/search?username=${
					user.username
				}&device=${search}&status=${
					stateReport.length ? stateReport : ['Open', 'In progress']
				}`,
			)
			.then(res => setReports(res.data))
			.catch(err => console.log(err));
	}, [search]);

	useEffect(() => {
		if (date) {
			axios
				.get(
					`http://localhost:5000/api/v1/report/search-by-date?username=${
						user.username
					}&date=${isoDate}&status=${
						stateReport.length ? stateReport : ['Open', 'In progress']
					}`,
				)
				.then(res => setReports(res.data))
				.catch(err => console.log(err));
		}
	}, [date]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<Box sx={{ marginLeft: { xs: '10%', md: '3%' } }}>
					<h3 style={{ color: 'grey' }}>Active/In progress reports</h3>
				</Box>
			</Box>
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
					{reports &&
						paginatedReports.slice(0, 6).map((report, i) => {
							return (
								<div key={i}>
									<ReportItem report={report} />
								</div>
							);
						})}
				</Stack>

				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						marginTop: '1rem',
					}}
				>
					{reports.length === 0 ? (
						<Button
							sx={{
								color: '#3AB54A',
								marginLeft: '5px',
								textDecoration: 'none',
							}}
						>
							Nothing to show
						</Button>
					) : (
						reports.length > 6 && (
							<Pagination
								count={Math.ceil(reports.length / itemsPerPage)}
								page={currentPage}
								onChange={handlePageChange}
								color='primary'
								showFirstButton
								showLastButton
								size='large'
							/>
						)
					)}
				</Box>
			</Box>
		</>
	);
};

export default ReportHome;
