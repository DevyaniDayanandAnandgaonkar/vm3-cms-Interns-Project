"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import clientReducer from "./features/clientSlice";
import employeesReducer from "./features/employeeSlice";
import partnerReducer from "./features/partnerSlice";
import departmentReducer from "./features/departmentSlice";
import roleReducer from "./features/roleSlice";
import projectReducer from "./features/projectSlice";
import categoryReducer from "./features/categorySlice";
import designationReducer from "./features/designationSlice";
import projectHistoryReducer from "./features/projecthistorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer, 
    employees: employeesReducer,
    partners: partnerReducer,
    departments: departmentReducer,
    roles: roleReducer,
    projects: projectReducer,
    categories: categoryReducer,
    designations: designationReducer,
    projectHistory: projectHistoryReducer,
  },
});

export default store;