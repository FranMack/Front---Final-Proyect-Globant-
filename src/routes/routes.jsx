import React from 'react';
import Start from '../view/Start.view';
import Home from '../view/Home';
import Register from '../view/Register.view';
import Profile from '../components/Profile';
import ReportHistory from '../view/ReportHistory';
import ReportDetail from '../view/ReportDetail';
import OfficeMap from '../components/OfficeMap';
import ObjectDetection from '../components/ObjectDetection';
import ReportCamOff from '../components/ReportCamOff';
import OfficeSelection from '../view/OfficeSelection';
import HomeList from '../view/HomeList';
import AdminUsersList from '../view/Admin.users.list';
import AdminReports from '../view/Admin.reports.state';

const routes = [
	{
		index: true,
		element: <Start />,
		state: 'start',
	},
	{
		path: '/register',
		element: <Register />,
		state: 'register',
	},
	{
		path: '/home',
		element: <Home />,
		state: 'home',
	},
	{
		path: 'profile',
		element: <Profile />,
		state: 'profile',
	},
	{
		path: 'reports',
		element: <ReportHistory />,
		state: 'reports',
	},
	{
		path: '/reports/:id',
		element: <ReportDetail />,
		state: 'reports.detail',
	},
	{
		path: '/map',
		element: <OfficeMap />,
	},
	{
		path: '/report-cam-on',
		element: <ObjectDetection />,
	},
	{
		path: '/report-cam-off',
		element: <ReportCamOff />,
	},
	{
		path: '/office-list',
		element: <OfficeSelection />,
	},
	{
		path: '/home-list',
		element: <HomeList />,
	},
	{
		path: '/users-list',
		element: <AdminUsersList />,
	},
	{
		path: '/users-list/:username',
		element: <ReportHistory />,
	},
	{
		path: '/admin-reports',
		element: <AdminReports />,
	},
];

export default routes;
