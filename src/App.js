import './App.css';
import React, { useEffect, useState } from 'react';
import Start from './view/Start.view';
import Profile from './components/Profile.jsx';
import Register from './view/Register.view';
import Loading from './view/Loading';
import NotFound from './view/NotFound.view';
import ReportHistory from './view/ReportHistory';
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
			<Routes>
				<Route path='/' element={<Start />}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/home' element={<Home />} />
				<Route path='profile' element={<Profile />} />
				<Route path='reports' element={<ReportHistory />} />

				<Route path='/map' element={<OfficeMap />} />


				<Route path='/report-cam-on' element={<p>Repor camera on</p>} />
				<Route path='/report-cam-off' element={<p>Report camera off</p>} />


				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
