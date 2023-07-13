import { configureStore } from "@reduxjs/toolkit";
import loginModalSlice from "./features/loginModalSlice";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice,
  },
});

export default store;
