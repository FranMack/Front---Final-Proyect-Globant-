import { configureStore } from '@reduxjs/toolkit';
import loginModalSlice from './features/loginModalSlice';
import reportModalSlice from './features/reportModalSlice';
import officeHomeModalSlice from './features/officeHomeModalSlice';
import userSlice from './features/userSlice';
import appStateSlice from './features/appStateSlice';
import reducerReport from './report';

const store = configureStore({
	reducer: {
		loginModal: loginModalSlice,
		reportModal: reportModalSlice,
		officeHomeModal: officeHomeModalSlice,
		user: userSlice,
		report: reducerReport,
		appState: appStateSlice,
	},
});

export default store;
