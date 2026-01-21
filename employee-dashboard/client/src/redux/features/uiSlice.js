import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
