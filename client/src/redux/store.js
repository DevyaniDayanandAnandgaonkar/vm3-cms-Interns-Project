"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import clientReducer from "./features/clientSlice";
import employeesReducer from "./features/employeeSlice";
import designationReducer from "./features/designationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer, 
    employees: employeesReducer,
    designation: designationReducer,
  },
});

export default store;