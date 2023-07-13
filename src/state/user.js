import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER")

export const initialState = {
    user: null
}

const userReducer = createReducer(initialState, {
    [setUser]: (state,action) => action.payload
});

export default userReducer;