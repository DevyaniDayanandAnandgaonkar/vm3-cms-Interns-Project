import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(apiRoutes.partners.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const addPartner = createAsyncThunk('partners/addPartner', async (partnerData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(apiRoutes.partners.create, partnerData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // The API should return the newly created partner object
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  });

export const updatePartner = createAsyncThunk('partners/updatePartner', async ({ id, partnerData }, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.put(apiRoutes.partners.update(id), partnerData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // The API should return the updated partner object
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

export const deletePartner = createAsyncThunk('partners/deletePartner', async (id, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    await axios.delete(apiRoutes.partners.delete(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});


const initialState = {
  partners: [],
  loading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners.push(action.payload);
      })
      .addCase(addPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.partners.findIndex(partner => partner.partner_id === action.payload.partner_id);
        if (index !== -1) {
          state.partners[index] = action.payload;
        }
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = state.partners.filter(partner => partner.partner_id !== action.payload);
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partnerSlice.reducer;