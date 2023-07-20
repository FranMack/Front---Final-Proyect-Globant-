import { configureStore } from '@reduxjs/toolkit';
import loginModalSlice from './features/loginModalSlice';
import reportModalSlice from './features/reportModalSlice';
import userSlice from './features/userSlice';

const store = configureStore({
	reducer: {
		loginModal: loginModalSlice,
		reportModal: reportModalSlice,
		user: userSlice,
	},
});

export default store;
