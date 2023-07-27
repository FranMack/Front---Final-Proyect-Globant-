import React from 'react';
import ResponsiveAppBar from '../components/Navbar';
import GoogleMaps from '../components/GoogleMaps';
import ReportHome from './ReportHome';

const Home = () => {
	return (
		<>
			<ResponsiveAppBar />
			<GoogleMaps />
			<ReportHome />
		</>
	);
};

export default Home;
