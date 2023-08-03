import { configureStore } from '@reduxjs/toolkit';
import loginModalSlice from './features/loginModalSlice';
import reportModalSlice from './features/reportModalSlice';
import officeHomeModalSlice from './features/officeHomeModalSlice';
import userSlice from './features/userSlice';
import reducerReport from './report';
import reducerAdminReportStatus from './reducerAdminReportStatus';

const store = configureStore({
	reducer: {
		loginModal: loginModalSlice,
		reportModal: reportModalSlice,
		officeHomeModal: officeHomeModalSlice,
		user: userSlice,
		report: reducerReport,
		adminReportStatus: reducerAdminReportStatus,
	},
});

export default store;
