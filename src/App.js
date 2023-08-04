import './styles/App.css';
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
import routes from './routes/routes';
import { Route, Routes } from 'react-router';

import ReportModal from './view/ReportModal.view';
import OfficeHomeModal from './view/OfficeHomeModal';
import MainLayout from './components/layout/MainLayout';
import PageWrapper from './commons/PageWrapper';
import NotFound from './view/NotFound.view';

import AdminDeskState from './view/AdminDeskState';

import AdminDashboard from './components/AdminDashboard';

function App() {
	return (
		<>
			<ToastContainer />
			<ReportModal />
			<OfficeHomeModal />
			<Routes>
				<Route path='/' element={<MainLayout />}>
					{routes.map((route, index) =>
						route.index ? (
							<Route
								index
								key={index}
								element={
									route.state ? (
										<PageWrapper state={route.state}>
											{route.element}
										</PageWrapper>
									) : (
										route.element
									)
								}
							/>
						) : (
							<Route
								path={route.path}
								key={index}
								element={
									route.state ? (
										<PageWrapper state={route.state}>
											{route.element}
										</PageWrapper>
									) : (
										route.element
									)
								}
							/>
						),
					)}
				</Route>
				<Route path='*' element={<NotFound />} />
				<Route path='/office-list' element={<OfficeSelection />} />
				<Route path='/home-list' element={<HomeList />} />
				<Route path='/users-list/:username' element={<ReportHistory />} />

				{isAdmin && (
					<>
						<Route path='/users-list' element={<AdminUsersList />} />
						<Route path='/admin-reports' element={<AdminReports />} />
						<Route path='/admin-dashboard' element={<AdminDashboard />} />
						<Route path='/desk-status' element={<AdminDeskState />} />
					</>
				)}
			</Routes>
		</>
	);
}

export default App;
