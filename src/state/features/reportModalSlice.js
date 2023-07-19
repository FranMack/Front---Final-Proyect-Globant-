import { createSlice } from '@reduxjs/toolkit';

export const reportModalSlice = createSlice({
	name: 'ReportModal',
	initialState: {
		reportModalOpen: false,
	},
	reducers: {
		setReportModalOpen: (state, action) => {
			state.reportModalOpen = action.payload;
		},
	},
});

export const { setReportModalOpen } = reportModalSlice.actions;

export default reportModalSlice.reducer;
