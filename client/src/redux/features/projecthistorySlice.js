import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

export const fetchProjectHistory = createAsyncThunk(
  "projectHistory/fetchProjectHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(apiRoutes.projectHistory.getAll, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const projectHistorySlice = createSlice({
  name: "projectHistory",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectHistory.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectHistorySlice.reducer;
