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

const styles = {
	label: {
		fontWeight: 'bold',
		marginBottom: '8px',
	},
	select: {
		minWidth: '180px',
	},
};

const AdminReportView = () => {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState('');
	const [userFilter, setUserFilter] = useState('');
	const [locationFilter, setLocationFilter] = useState('');
	const [deviceFilter, setDeviceFilter] = useState('');
	const [deletingReportId, setDeletingReportId] = useState(null);
	const allDevices = [...new Set(reports.map(report => report.device))];
	const [statusChanging, setStatusChanging] = useState(null);
	const MAX_LOCATION_LENGTH = 20;

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

	const filteredReports = reports.filter(report => {
		const filterByStatus =
			!statusFilter || report.status_report === statusFilter;
		const filterByUser = !userFilter || report.user === userFilter;
		const filterByLocation =
			!locationFilter || report.location === locationFilter;
		const filterDevice = !deviceFilter || report.device === deviceFilter;

		return filterByStatus && filterByUser && filterByLocation && filterDevice;
	});

	const allUsers = [...new Set(reports.map(report => report.user))];

	const formatDate = date => {
		const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	const handleStatusChange = async (reportId, newStatus) => {
		try {
			setStatusChanging(reportId);
			await axios.put(
				`http://localhost:5000/api/v1/userAdmin/status-edit/${reportId}`,
				{
					status_report: newStatus,
				},
			);
			console.log('Status updated successfully');
		} catch (error) {
			console.error('Error updating status:', error);
		} finally {
			setStatusChanging(null);
		}
	};

	const handleDeleteReport = async reportId => {
		try {
			setDeletingReportId(reportId);
			await axios.delete(
				`http://localhost:5000/api/v1/userAdmin/report/delete/${reportId}`,
			);
			console.log('Report deleted successfully');
		} catch (error) {
			console.error('Error deleting report:', error);
		} finally {
			setDeletingReportId(null);
		}
	};

	const handleLocationFilterChange = event => {
		setLocationFilter(event.target.value);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			{loading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '20px',
					}}
				>
					<Loading />
				</Box>
			) : (
				<Grid container spacing={3} sx={{ marginBottom: '10px' }}>
					<Grid item xs={12} sm={4} md={3}>
						<Typography
							component='label'
							htmlFor='status-filter'
							style={styles.label}
						>
							Filter by Report Status:
						</Typography>
						<Select
							id='status-filter'
							value={statusFilter}
							onChange={event => setStatusFilter(event.target.value)}
							style={styles.select}
						>
							<MenuItem value=''>
								<em>All</em>
							</MenuItem>
							<MenuItem value='Open'>Open</MenuItem>
							<MenuItem value='In progress'>In progress</MenuItem>
							<MenuItem value='Close'>Close</MenuItem>
						</Select>
					</Grid>

					<Grid item xs={12} sm={4} md={3}>
						<Typography
							component='label'
							htmlFor='status-filter'
							style={styles.label}
						>
							Filter by Users Report:
						</Typography>
						<Select
							id='user-filter'
							value={userFilter}
							onChange={event => setUserFilter(event.target.value)}
							style={styles.select}
						>
							<MenuItem value=''>All</MenuItem>
							{allUsers.map(user => (
								<MenuItem key={user} value={user}>
									{user}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12} sm={4} md={3}>
						<Typography
							component='label'
							htmlFor='location-filter'
							style={styles.label}
						>
							Filter by Users Location:
						</Typography>
						<Select
							id='location-filter'
							value={locationFilter}
							onChange={handleLocationFilterChange}
							style={styles.select}
						>
							<MenuItem value=''>All Locations</MenuItem>
							{reports.map(report => {
								const truncatedLocation =
									report.location.length > MAX_LOCATION_LENGTH
										? `${report.location.substring(0, MAX_LOCATION_LENGTH)}...`
										: report.location;

								return (
									<MenuItem
										key={report.location}
										value={report.location}
										title={report.location}
									>
										{truncatedLocation}
									</MenuItem>
								);
							})}
						</Select>
					</Grid>

					<Grid item xs={12} sm={4} md={3}>
						<Typography
							component='label'
							htmlFor='status-filter'
							style={styles.label}
						>
							Filter by Device:
						</Typography>
						<Select
							id='device-filter'
							value={deviceFilter}
							onChange={event => setDeviceFilter(event.target.value)}
							style={styles.select}
						>
							<MenuItem value=''>All</MenuItem>
							{allDevices.map(device => (
								<MenuItem key={device} value={device}>
									{device}
								</MenuItem>
							))}
						</Select>
					</Grid>
				</Grid>
			)}

			{!loading && filteredReports.length === 0 && (
				<Typography
					variant='h6'
					sx={{ margin: '20px auto', textAlign: 'center' }}
				>
					No reports found matching the applied filters.
				</Typography>
			)}
			{!loading && filteredReports.length > 0 && (
				<Grid container spacing={2}>
					{filteredReports.map(report => (
						<Grid item key={report._id} xs={12} sm={6} md={4} lg={3} xl={2}>
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

										<Typography className='info-text' noWrap>
											Description: {report.description}
										</Typography>
										<Typography className='info-text' noWrap>
											Box Number: {report.box_number}
										</Typography>
										<Typography className='info-text' noWrap>
											Home Office: {report.homeoffice ? 'Yes' : 'No'}
										</Typography>
										<Typography
											className='info-text'
											noWrap
											title={report.location}
										>
											Location:{' '}
											{report.location.length > 20
												? `${report.location.substring(0, 20)}...`
												: report.location}
										</Typography>
										<Typography className='info-text' noWrap>
											Status Report: {JSON.stringify(report.status_report)}
										</Typography>

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
											{statusChanging === report._id ? (
												<CircularProgress size={24} />
											) : (
												<>
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
															Reopen
														</Button>
													)}

													<Button
														variant='contained'
														onClick={() => handleDeleteReport(report._id)}
														color='error'
														size='small'
													>
														{deletingReportId === report._id ? (
															<CircularProgress size={20} color='inherit' />
														) : (
															'DELETE'
														)}
													</Button>
												</>
											)}
										</Box>
									</CardContent>
								</Card>
							</CardActionArea>
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default AdminReportView;
