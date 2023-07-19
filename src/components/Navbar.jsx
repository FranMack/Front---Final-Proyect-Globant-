import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SwipeableTemporaryDrawer from '../commons/ButtonHamburgerMenu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../state/features/userSlice';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { setReportModalOpen } from '../state/features/reportModalSlice';

function ResponsiveAppBar() {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(setUser(null));
		navigate('/');
		dispatch(setLoginModalOpen(true));
	};

	return (
		<AppBar position='static' sx={{ background: 'white' }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Button
						color='inherit'
						sx={{
							color: '#3AB54A',
							display: { xs: 'none', md: 'flex' },
							mr: 1,
						}}
					>
						Reports
					</Button>
					<Button
						color='inherit'
						component={Link}
						to='/profile'
						sx={{
							color: '#3AB54A',
							display: { xs: 'none', md: 'flex' },
							mr: 1,
						}}
					>
						Profile
					</Button>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						{user && <SwipeableTemporaryDrawer />}
					</Box>

					<Button
						variant='contained'
						style={{
							backgroundColor: '#3AB54A',
							color: '#FFFFFF',
							borderRadius: '20px',
							marginRight: '1px',
						}}
						onClick={() => dispatch(setReportModalOpen(true))}
					>
						New Report <PostAddIcon />
					</Button>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
					<Button
						color='inherit'
						style={{
							color: '#3AB54A',
						}}
						onClick={handleLogout}
					>
						Log Out
					</Button>
					<Box sx={{ flexGrow: 0 }}></Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
