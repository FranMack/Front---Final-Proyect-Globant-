import { configureStore } from "@reduxjs/toolkit";
import loginModalSlice from "./features/loginModalSlice";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    loginModal: loginModalSlice,
    user: userReducer
  },
});

export default store;
