import { createSlice } from '@reduxjs/toolkit';

export const officeHomeModalSlice = createSlice({
	name: 'OfficeHomeModal',
	initialState: {
		officeHomeModalOpen: false,
	},
	reducers: {
		setOfficeHomeModalOpen: (state, action) => {
			state.officeHomeModalOpen = action.payload;
		},
	},
});

export const { setOfficeHomeModalOpen } = officeHomeModalSlice.actions;

export default officeHomeModalSlice.reducer;
