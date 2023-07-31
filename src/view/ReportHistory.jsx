import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import { Box, Button, Pagination, Stack } from '@mui/material';
import SearchInput from '../commons/SearchInput';
import ReportItem from '../commons/ReportItem';
import { TransformISOdate } from '../utils/functions';
import { orderByDate } from '../utils/functions';
import { useSelector } from 'react-redux';

const ReportHistory = () => {
	const [reports, setReports] = useState([]);
	const [search, setSearch] = useState('');
	const [date, setDate] = useState(null);
	const [isoDate, setIsoDate] = useState(null);

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
			.get(`http://localhost:5000/api/v1/report/status/${user.username}/Close`)
			.then(res => setReports(res.data))
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/v1/report/status/${user.username}/Close`)
			.then(res => setReports(res.data))
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/api/v1/report/search?username=${user.username}&device=${search}&status=Close`,
			)
			.then(res => setReports(res.data))
			.catch(err => console.log(err));
	}, [search]);

	useEffect(() => {
		if (date) {
			axios
				.get(
					`http://localhost:5000/api/v1/report/search-by-date?username=${user.username}&date=${isoDate}&status=Close`,
				)
				.then(res => setReports(res.data))
				.catch(err => console.log(err));
		}
	}, [date]);

	return (
		<>
			<Navbar />
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
					<h3 style={{ color: 'grey' }}>Inactive report history</h3>
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

				<Stack sx={{ marginTop: '10%' }}>
					{paginatedReports.map((report, i) => {
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
			</Box>
		</>
	);
};

export default ReportHistory;
