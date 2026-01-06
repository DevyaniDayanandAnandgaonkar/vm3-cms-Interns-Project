// simple clients slice (JS)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';
// Add client (POST)
export const addClientAsync = createAsyncThunk('clients/addClient', async (clientData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.post(apiRoutes.clients.create, clientData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { ...clientData, client_id: res.data.client_id };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add client');
  }
});

// Update client (PUT)
export const updateClientAsync = createAsyncThunk('clients/updateClient', async (clientData, { getState, rejectWithValue }) => {
  try {
    const id = clientData.client_id || clientData.id;
    const token = getState().auth.token;
    await axios.put(apiRoutes.clients.update(id), clientData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { ...clientData, client_id: id };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update client');
  }
});

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const res = await axios.get(apiRoutes.clients.getAll);
  return res.data;
});

const initialState = {
  clients: [],
  loading: false,
  error: null,
};


const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    // Deprecated: use async thunks
    addClient() {},
    updateClient() {},
    deleteClient(state, action) {
      state.clients = state.clients.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addClientAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(addClientAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateClientAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.clients.findIndex(c => (c.client_id || c.id) === (action.payload.client_id || action.payload.id));
        if (idx !== -1) {
          state.clients[idx] = { ...state.clients[idx], ...action.payload };
        }
      })
      .addCase(updateClientAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addClient, updateClient, deleteClient } = clientSlice.actions;
export default clientSlice.reducer;
