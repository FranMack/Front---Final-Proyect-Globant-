import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload.user.token);
      if (action.payload === null) {
        localStorage.removeItem("token");
      } else if (action.payload.user.token) {
        localStorage.setItem("token", action.payload.user.token);
      }
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
