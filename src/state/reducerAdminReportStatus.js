import { createAction, createReducer } from '@reduxjs/toolkit';

// Define action types
export const setStatus = createAction('SET_REPORT_STATUS');

// Initial state
export const initialState = {
	reportStatus: {}, // Object with reportId as key and status as value
};

// Reducer function
const reducerAdminReportStatus = createReducer(initialState, {
	[setStatus]: (state, action) => {
		const { reportId, status } = action.payload;
		state.reportStatus = {
			...state.reportStatus,
			[reportId]: status,
		};
	},
});

export default reducerAdminReportStatus;
