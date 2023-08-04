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
import AdminDashboard from '../components/AdminDashboard';
import AdminDeskState from '../view/AdminDeskState';

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
		admin: false,
	},
	{
		path: '/home',
		element: <Home />,
		state: 'home',
		admin: false,
	},
	{
		path: 'profile',
		element: <Profile />,
		state: 'profile',
		admin: false,
	},
	{
		path: 'reports',
		element: <ReportHistory />,
		state: 'reports',
		admin: false,
	},
	{
		path: '/reports/:id',
		element: <ReportDetail />,
		state: 'reports.detail',
		admin: false,
	},
	{
		path: '/map',
		element: <OfficeMap />,
		admin: false,
	},
	{
		path: '/report-cam-on',
		element: <ObjectDetection />,
		admin: false,
	},
	{
		path: '/report-cam-off',
		element: <ReportCamOff />,
		admin: false,
	},
	{
		path: '/office-list',
		element: <OfficeSelection />,
		admin: false,
	},
	{
		path: '/home-list',
		element: <HomeList />,
		admin: false,
	},
	{
		path: '/users-list/:username',
		element: <ReportHistory />,
		admin: false,
	},
	{
		path: '/admin-dashboard',
		element: <AdminDashboard />,
		admin: true,
	},
	{
		path: '/desk-status',
		element: <AdminDeskState />,
		admin: true,
	},
];

export default routes;
