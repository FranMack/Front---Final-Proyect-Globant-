import '../App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SwipeableTemporaryDrawer from '../commons/ButtonHamburgerMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../state/features/userSlice';
import { setLoginModalOpen } from '../state/features/loginModalSlice';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { setReportModalOpen } from '../state/features/reportModalSlice';
import ButtonHome from '../commons/ButtonHome';
import { Tooltip } from '@mui/material';
import ButtonAdmin from '../commons/ButtonAdmin';

function ResponsiveAppBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname.slice(1);

	const handleLogout = () => {
		dispatch(setUser(null));
		navigate('/');
		dispatch(setLoginModalOpen(true));
	};
	const user = useSelector(state => state.user);
	return (
		<AppBar position='static' sx={{ background: 'white' }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<ButtonHome />
					{currentPath != 'report-cam-off' &&
						currentPath != 'reports/64c033117a8c2257ae1d716a' && (
							<Tooltip title='¡New report!' placement='left'>
								<Button
									variant='contained'
									color='success'
									className='button-rotate'
									sx={{
										marginRight: '10px',
										backgroundColor: '#3AB54A',
										minWidth: '60px',
										width: '60px',
										height: '60px',
										borderRadius: '50%',
										position: 'fixed',
										right: 0,
										bottom: '100px',
										zIndex: 99,
									}}
									onClick={() => dispatch(setReportModalOpen(true))}
								>
									<PostAddIcon className='icon-rotate' fontSize='large' />
								</Button>
							</Tooltip>
						)}

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
					{user?.is_admin === true && <ButtonAdmin />}
					<Button
						component={Link}
						to='/reports'
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
