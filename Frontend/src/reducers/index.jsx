import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
