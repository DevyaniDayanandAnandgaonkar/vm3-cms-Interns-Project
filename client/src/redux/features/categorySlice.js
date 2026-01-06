import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiRoutes } from '../apiRoutes';

const API_URL = apiRoutes.categories.getAll;

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

// Add more async thunks for add, update, delete if needed in the future

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
