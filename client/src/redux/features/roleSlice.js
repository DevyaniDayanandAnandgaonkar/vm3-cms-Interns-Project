import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(apiRoutes.roles.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const addRole = createAsyncThunk('roles/addRole', async (roleData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(apiRoutes.roles.create, roleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  });

export const updateRole = createAsyncThunk('roles/updateRole', async ({ id, roleData }, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.put(apiRoutes.roles.update(id), roleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(apiRoutes.roles.delete(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});


const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(role => role.role_id === action.payload.role_id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(role => role.role_id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roleSlice.reducer;
