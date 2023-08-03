import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminReportsView from '../view/Admin.reports.state';
import AdminUsersList from '../view/Admin.users.list';

import { Box, Button } from '@mui/material';

const AdminDashboard = () => {
	const [showReportsView, setShowReportsView] = useState(false);
	const [showUsersList, setShowUsersList] = useState(false);

	const handleShowReportsView = () => {
		setShowReportsView(true);
		setShowUsersList(false);
	};

	const handleShowUsersList = () => {
		setShowReportsView(false);
		setShowUsersList(true);
	};

	return (
		<>
			<Navbar />
			<Box style={{ padding: '10px' }}>
				<h2>Admin Dashboard:</h2>
			</Box>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '20px',
					marginBottom: '20px',
				}}
			>
				<Button variant='contained' onClick={handleShowReportsView}>
					Go to Reports
				</Button>
				<Button
					variant='contained'
					onClick={handleShowUsersList}
					style={{ marginLeft: '10px' }}
				>
					Show Users List
				</Button>
			</Box>
			{showReportsView && <AdminReportsView />}
			{showUsersList && <AdminUsersList />}
		</>
	);
};

export default AdminDashboard;
