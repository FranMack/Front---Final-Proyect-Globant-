import { createAction, createReducer } from "@reduxjs/toolkit";

export const setReport = createAction("SET_REPORT");

export const initialState = {
  url_image: null,
  device: null,
  descrption: null,
};

const reducerReport = createReducer(initialState, {
  [setReport]: (state, action) => action.payload,
});

export default reducerReport;