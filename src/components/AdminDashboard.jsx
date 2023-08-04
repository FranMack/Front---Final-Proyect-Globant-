import React from 'react';
import AdminReportsView from '../view/Admin.reports.state';
import { Box, Grid } from '@mui/material';

const AdminDashboard = () => {

	return (
		<>

			<Grid
					container
					spacing={2}
					style={{
						borderBottom: '1px solid grey',
						width: '100%',
						marginTop: 0,
						marginLeft: 0,
					}}
				>
					<Grid style={{ display: 'flex', alignItems: 'center' }}>

						<h5 style={{ marginLeft: '8px', color: 'grey' }}>ADMIN DASHBOARD</h5>
					</Grid>
				</Grid>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					margin: '20px'
				}}
			>
				 <AdminReportsView />
			</Box>
		</>
	);
};

export default AdminDashboard;
