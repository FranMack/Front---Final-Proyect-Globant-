import './App.css';
import React, { useEffect, useState } from 'react';
import Start from './view/Start.view';
import Profile from './components/Profile.jsx';
import Register from './view/Register.view';
import Loading from './view/Loading';
import NotFound from './view/NotFound.view';
import ReportHistory from './view/ReportHistory';
import ReportCamOff from './components/ReportCamOff';
import ObjectDetection from './components/ObjectDetection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate } from 'react-router';
import Home from './view/Home';
import { useDispatch, useSelector } from 'react-redux';
import userApi from './api/modules/user.api';
import { setUser } from './state/features/userSlice';

import OfficeMap from './components/OfficeMap';

import LoginModal from './view/LoginModal.view';
import ReportModal from './view/ReportModal.view';
import OfficeHomeModal from './view/OfficeHomeModal';
import Footer from './components/Footer';
import ReportDetail from './view/ReportDetail';
import OfficeSelection from './view/OfficeSelection';
import HomeList from './view/HomeList';
import AdminUsersList from './view/Admin.users.list';

function App() {
	const user = useSelector(state => state.user);

	const [loading, setLoading] = useState(true);

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
			if (!user && window.location.pathname !== '/register') {
				navigate('/');
			}
		}
	}, [loading, navigate, user]);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<ToastContainer />
			<LoginModal />
			<ReportModal />
			<OfficeHomeModal />
			<Routes>
				<Route path='/' element={<Start />}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/home' element={<Home />} />
				<Route path='profile' element={<Profile />} />
				<Route path='reports' element={<ReportHistory />} />
				<Route path='/reports/:id' element={<ReportDetail />} />
				<Route path='/map' element={<OfficeMap />} />
				<Route path='/report-cam-on' element={<ObjectDetection />} />
				<Route path='/report-cam-off' element={<ReportCamOff />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/office-list' element={<OfficeSelection />} />
				<Route path='/home-list' element={<HomeList />} />
				<Route path='/users-list' element={<AdminUsersList />} />
				<Route path='/users-list/:id' element={<NotFound />} />

			</Routes>
			
			<Footer />
		</>
	);
}

export default App;
