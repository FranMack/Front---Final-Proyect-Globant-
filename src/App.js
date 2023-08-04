import './styles/App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes/routes';
import { Route, Routes } from 'react-router';

import ReportModal from './view/ReportModal.view';
import OfficeHomeModal from './view/OfficeHomeModal';
import MainLayout from './components/layout/MainLayout';
import PageWrapper from './commons/PageWrapper';
import NotFound from './view/NotFound.view';

import { useSelector } from 'react-redux';

function App() {
	const user = useSelector(state => state.user);

	const isAdmin = user && user.is_admin;
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
						) : isAdmin && route.admin ? (
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
						) : (
							route.admin === false && (
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
							)
						),
					)}
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
