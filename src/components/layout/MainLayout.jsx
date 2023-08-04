import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoginModal from '../../view/LoginModal.view';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../view/Loading';
import userApi from '../../api/modules/user.api';
import { setUser } from '../../state/features/userSlice';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Box } from '@mui/material';

const MainLayout = () => {
	const [loading, setLoading] = useState(true);
	const user = useSelector(state => state.user);

	const location = useLocation();
	const currentPath = location.pathname.slice(1);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const authUser = async () => {
			const { response, err } = await userApi.getInfo();

			if (response) {
				dispatch(setUser(response));
			}
			if (err) dispatch(setUser(null));

			setLoading(false);
		};

		authUser();
	}, [dispatch]);

	useEffect(() => {
		if (!loading) {
			if (!user && currentPath !== 'register') {
				navigate('/');
			}
		}
	}, [loading, navigate, user]);

	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<LoginModal />
			<Box display='flex' flexDirection='column' minHeight='100vh'>
				{currentPath !== '' && currentPath !== 'register' && <Navbar />}
				<Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
					<Outlet />
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default MainLayout;
