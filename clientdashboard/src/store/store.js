// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import clientProfileReducer from "./slices/clientProfileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        clientProfile: clientProfileReducer,
    },
});

export default store;
