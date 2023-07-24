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
import ButtonHome from '../commons/ButtonHome';

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
					<ButtonHome />
					<Button
						variant='contained'
						style={{
							marginRight: '16px',
							backgroundColor: '#3AB54A',
							color: '#FFFFFF',
							minWidth: '40px',
							width: '40px',
							height: '40px',
							borderRadius: '50%',
							position: 'fixed',
							right: 0,
							bottom: '100px',
							zIndex: 99,
						}}
						onClick={() => dispatch(setReportModalOpen(true))}
					>
						<PostAddIcon />
					</Button>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
					<Button
						component={Link}
						to='/reports'
						color='inherit'
						sx={{
							color: '#3AB54A',
							display: { xs: 'none', md: 'flex' },
							mr: 2,
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
					<Button
						color='inherit'
						sx={{
							color: '#C5DA2D',
							display: { xs: 'none', md: 'flex' },
							mr: 2,
						}}
						onClick={handleLogout}
					>
						Log Out
					</Button>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
							justifyContent: 'flex-end',
						}}
					>
						{user && <SwipeableTemporaryDrawer />}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
