import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./features/uiSlice";
import todoReducer from "./features/todoSlice";   // ✅ add
import leaveReducer from "./features/leaveSlice";
import profileReducer from "./features/profileSlice";
import socialMediaReducer from "./features/socialMediaSlice";
import taskReducer from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    todos: todoReducer,  // ✅ add
    leaves: leaveReducer,  // ✅ add
    profile: profileReducer,  // ✅ add
    socialMedia: socialMediaReducer,
    employeeTasks: taskReducer,
  },
});
