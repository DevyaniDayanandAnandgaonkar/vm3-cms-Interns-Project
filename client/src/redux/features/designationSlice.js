import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

export const fetchDesignations = createAsyncThunk('designations/fetchDesignations', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(apiRoutes.designations.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const addDesignation = createAsyncThunk('designations/addDesignation', async (designationData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(apiRoutes.designations.create, designationData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  });

export const updateDesignation = createAsyncThunk('designations/updateDesignation', async ({ id, designationData }, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.put(apiRoutes.designations.update(id), designationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const deleteDesignation = createAsyncThunk('designations/deleteDesignation', async (id, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(apiRoutes.designations.delete(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});


const initialState = {
  designations: [],
  loading: false,
  error: null,
};

const designationSlice = createSlice({
  name: 'designations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations.push(action.payload);
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.designations.findIndex(desig => desig.designation_id === action.payload.designation_id);
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDesignation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = state.designations.filter(desig => desig.designation_id !== action.payload);
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default designationSlice.reducer;