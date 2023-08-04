import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Typography,
	Box,
	MenuItem,
	Select,
} from '@mui/material';
import Loading from './Loading';

const AdminReports = () => {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filterOption, setFilterOption] = useState('All');
	const [filteredReports, setFilteredReports] = useState([]);

	const showAllTheReports = () => {
		axios
			.get('http://localhost:5000/api/v1/report/all')
			.then(res => {
				setReports(res.data);
				setLoading(false); // Data fetched successfully, set loading to false
			})
			.catch(error => {
				console.log(error);
				setLoading(false);
			});
	};

	const handleFilterChange = event => {
		const selectedOption = event.target.value;
		setFilterOption(selectedOption);
		if (selectedOption === 'All') {
			// If 'All' is selected, show all the reports
			setFilteredReports(reports);
		} else {
			// Filter the reports based on the selected status
			const filteredReports = reports.filter(
				report => report.status_report === selectedOption,
			);
			setFilteredReports(filteredReports);
		}
	};
	const handleStatusChange = (reportId, newStatus) => {
		axios
			.put(`http://localhost:5000/api/v1/report/editStateReport/${reportId}`, {
				status: newStatus,
			})
			.then(() => {
				setReports(prevReports =>
					prevReports.map(report =>
						report._id === reportId
							? { ...report, status_report: newStatus }
							: report,
					),
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleStartProgress = reportId => {
		axios
			.put(`http://localhost:5000/api/v1/report/editStateReport/${reportId}`, {
				status: 'In progress',
			})
			.then(() => {
				setReports(prevReports =>
					prevReports.map(report =>
						report._id === reportId
							? { ...report, status_report: 'In progress' }
							: report,
					),
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleReopenReport = reportId => {
		axios
			.put(`http://localhost:5000/api/v1/report/editStateReport/${reportId}`, {
				status: 'Open',
			})
			.then(() => {
				setReports(prevReports =>
					prevReports.map(report =>
						report._id === reportId
							? { ...report, status_report: 'Open' }
							: report,
					),
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleDeleteReport = reportId => {
		axios
			.delete(
				`http://localhost:5000/api/v1/userAdmin/report/delete/${reportId}`,
			)
			.then(() => {
				setReports(prevReports =>
					prevReports.filter(report => report._id !== reportId),
				);
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		showAllTheReports();
		handleFilterChange({ target: { value: filterOption } });
	}, [reports]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box style={{ padding: '10px' }}>
				<h2>Users Reports:</h2>
				<Select
					value={filterOption}
					onChange={handleFilterChange}
					style={{ width: '200px' }}
				>
					<MenuItem value='All'>All</MenuItem>
					<MenuItem value='Open'>Open</MenuItem>
					<MenuItem value='In progress'>In Progress</MenuItem>
					<MenuItem value='Close'>Close</MenuItem>
				</Select>
			</Box>
			{loading ? (
				<Typography>
					<Loading />
				</Typography>
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
													Status Report: {report.status_report}
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
												{report.status_report === 'In progress' && (
													<Button
														onClick={() =>
															handleStatusChange(report._id, 'Close')
														}
													>
														Resolved
													</Button>
												)}
												{report.status_report === 'Open' && (
													<Button
														onClick={() => handleStartProgress(report._id)}
													>
														In Progress
													</Button>
												)}
												{report.status_report === 'Close' && (
													<Button
														onClick={() => handleReopenReport(report._id)}
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

export default AdminReports;
