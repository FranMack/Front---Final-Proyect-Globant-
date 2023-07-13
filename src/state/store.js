import { configureStore } from "@reduxjs/toolkit";
import loginModalSlice from "./features/loginModalSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice,
    user: userSlice,
  },
});

export default store;
