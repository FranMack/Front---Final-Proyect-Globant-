import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
	Box,
	Select,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import Loading from './Loading';

const AdminReportView = () => {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState('');
	const [userFilter, setUserFilter] = useState('');

	const fetchReports = useCallback(async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/v1/report/all');
			setReports(res.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchReports();
	}, [reports]);

	const filteredReports = reports.filter(
		report =>
			(!statusFilter || report.status_report === statusFilter) &&
			(!userFilter || report.user === userFilter),
	);

	const allUsers = [...new Set(reports.map(report => report.user))];

	const formatDate = date => {
		const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	const handleStatusChange = (reportId, newStatus) => {
		axios
			.put(`http://localhost:5000/api/v1/userAdmin/status-edit/${reportId}`, {
				status_report: newStatus,
			})
			.then(() => {
				setReports(prevReports =>
					prevReports.map(report =>
						report._id === reportId ? { ...report, status: newStatus } : report,
					),
				);
				console.log('Status updated successfully');
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleDeleteReport = async reportId => {
		try {
			await axios.delete(
				`http://localhost:5000/api/v1/userAdmin/report/delete/${reportId}`,
			);

			setReports(prevReports =>
				prevReports.filter(report => report._id !== reportId),
			);
		} catch (error) {
			console.error('Error deleting report:', error);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography component='label' htmlFor='status-filter'>
					Filter by Report Status:
				</Typography>
				<Select
					id='status-filter'
					value={statusFilter}
					onChange={event => setStatusFilter(event.target.value)}
					style={{ margin: '10px' }}
				>
					<MenuItem value=''>All</MenuItem>
					<MenuItem value='Open'>Open</MenuItem>
					<MenuItem value='In progress'>In progress</MenuItem>
					<MenuItem value='Close'>Close</MenuItem>
				</Select>

				<Typography component='label' htmlFor='user-filter'>
					Filter by Users Report:
				</Typography>
				<Select
					id='user-filter'
					value={userFilter}
					onChange={event => setUserFilter(event.target.value)}
					style={{ marginLeft: '10px' }}
				>
					<MenuItem value=''>All</MenuItem>
					{allUsers.map(user => (
						<MenuItem key={user} value={user}>
							{user}
						</MenuItem>
					))}
				</Select>
			</Box>
			{loading ? (
				<Box
					sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
				>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={2}>
					{filteredReports.map(report => (
						<Grid item key={report._id} xs={12} sm={6} md={4} lg={3} xl={2}>
							<Box display='flex' justifyContent='center'>
								<CardActionArea>
									<Card>
										<CardContent>
											<Typography variant='h5' component='h2'>
												{report.user} Report
											</Typography>
											<Typography variant='h5' component='h2'>
												{report.title}
											</Typography>
											<Typography variant='subtitle1' component='h2'>
												Date: {formatDate(report.date_report)}
											</Typography>
											<Typography className='info-text' noWrap>
												<strong>Device: {report.device}</strong>
											</Typography>
											<div className='info-container'>
												<Typography className='info-text' noWrap>
													Description: {report.description}
												</Typography>

												<Typography className='info-text' noWrap>
													Box Number: {report.box_number}
												</Typography>
												<Typography className='info-text' noWrap>
													Home Office: {report.homeoffice ? 'Yes' : 'No'}
												</Typography>
												<Typography className='info-text' noWrap>
													Location: {report.location}
												</Typography>
												<Typography className='info-text' noWrap>
													Status Report: {JSON.stringify(report.status_report)}
												</Typography>
											</div>
											<Box
												className='image-container'
												style={{ height: '100px', overflow: 'hidden' }}
											>
												<img
													src={report.url_img}
													alt='Report'
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover',
													}}
												/>
											</Box>
											<Box display='flex' justifyContent='space-between' mt={2}>
												{report.status_report === 'Open' && (
													<Button
														variant='contained'
														size='small'
														onClick={() =>
															handleStatusChange(report._id, 'In progress')
														}
													>
														In progress
													</Button>
												)}

												{report.status_report === 'In progress' && (
													<Button
														variant='contained'
														size='small'
														onClick={() =>
															handleStatusChange(report._id, 'Close')
														}
													>
														Close
													</Button>
												)}
												{report.status_report === 'Close' && (
													<Button
														variant='contained'
														size='small'
														onClick={() =>
															handleStatusChange(report._id, 'Open')
														}
													>
														Re open
													</Button>
												)}

												<Button
													variant='contained'
													onClick={() => handleDeleteReport(report._id)}
													color='error'
													size='small'
												>
													DELETE
												</Button>
											</Box>
										</CardContent>
									</Card>
								</CardActionArea>
							</Box>
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default AdminReportView;
