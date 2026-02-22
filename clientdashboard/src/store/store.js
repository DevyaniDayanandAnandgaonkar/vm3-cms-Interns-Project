// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import clientProfileReducer from "./slices/clientProfileSlice";
import socialMediaPostsReducer from "./slices/socialMediaPostsSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        clientProfile: clientProfileReducer,
        socialMediaPosts: socialMediaPostsReducer,
        dashboard: dashboardReducer,
    },
});

export default store;

