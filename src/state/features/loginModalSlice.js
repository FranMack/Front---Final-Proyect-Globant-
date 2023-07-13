import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
  name: "LoginModal",
  initialState: {
    loginModalOpen: false,
  },
  reducers: {
    setLoginModalOpen: (state, action) => {
      state.loginModalOpen = action.payload;
    },
  },
});

export const { setLoginModalOpen } = loginModalSlice.actions;

export default loginModalSlice.reducer;
