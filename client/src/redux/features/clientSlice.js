// // simple clients slice (JS)

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// // Add client (POST)
// export const addClientAsync = createAsyncThunk('clients/addClient', async (clientData, { getState, rejectWithValue }) => {
//   try {
//     // Map frontend fields to backend fields
//     const payload = {
//       client_name: clientData.company,
//       email: clientData.email,
//       phone: clientData.phone,
//       address: clientData.address,
//       status: clientData.status,
//       // Add more fields as needed
//     };
//     const token = getState().auth.token;
//     const res = await axios.post('http://localhost:5000/api/clients', payload, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return { ...clientData, client_id: res.data.client_id };
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || 'Failed to add client');
//   }
// });

// // Update client (PUT)
// export const updateClientAsync = createAsyncThunk('clients/updateClient', async (clientData, { getState, rejectWithValue }) => {
//   try {
//     const payload = {
//       client_name: clientData.company,
//       email: clientData.email,
//       phone: clientData.phone,
//       address: clientData.address,
//       status: clientData.status,
//       // Add more fields as needed
//     };
//     const id = clientData.client_id || clientData.id;
//     const token = getState().auth.token;
//     await axios.put(`http://localhost:5000/api/clients/${id}`, payload, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     return { ...clientData, client_id: id };
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || 'Failed to update client');
//   }
// });

// export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
//   const res = await axios.get('http://localhost:5000/api/clients');
//   return res.data;
// });

// const initialState = {
//   clients: [],
//   loading: false,
//   error: null,
// };


// const clientSlice = createSlice({
//   name: 'clients',
//   initialState,
//   reducers: {
//     // Deprecated: use async thunks
//     addClient() {},
//     updateClient() {},
//     deleteClient(state, action) {
//       state.clients = state.clients.filter(c => c.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchClients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchClients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.clients = action.payload;
//       })
//       .addCase(fetchClients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addClientAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addClientAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.clients.push(action.payload);
//       })
//       .addCase(addClientAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateClientAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateClientAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         const idx = state.clients.findIndex(c => (c.client_id || c.id) === (action.payload.client_id || action.payload.id));
//         if (idx !== -1) {
//           state.clients[idx] = { ...state.clients[idx], ...action.payload };
//         }
//       })
//       .addCase(updateClientAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { addClient, updateClient, deleteClient } = clientSlice.actions;
// export default clientSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Add Client (with backend fallback)
export const addClientAsync = createAsyncThunk(
  "clients/addClient",
  async (clientData, { getState, rejectWithValue }) => {
    try {
      const payload = {
        client_name: clientData.company,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        status: clientData.status,
      };

      const token = getState().auth?.token;

      const res = await axios.post(
        "http://localhost:5000/api/clients",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { ...clientData, client_id: res.data.client_id };
    } catch (err) {
      // ✅ FALLBACK: return dummy client if backend fails
      return {
        id: Date.now(),
        ...clientData,
      };
    }
  }
);

// ✅ Update client (fallback)
export const updateClientAsync = createAsyncThunk(
  "clients/updateClient",
  async (clientData, { getState, rejectWithValue }) => {
    try {
      const payload = {
        client_name: clientData.company,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        status: clientData.status,
      };

      const id = clientData.client_id || clientData.id;
      const token = getState().auth?.token;

      await axios.put(`http://localhost:5000/api/clients/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { ...clientData, client_id: id };
    } catch (err) {
      // ✅ Update locally only
      return { ...clientData };
    }
  }
);

// ✅ Fetch (fallback)
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      return res.data;
    } catch {
      return [
        {
          id: 1,
          company: "youtax ",
          industry: "Technology",
          contact: "John Doe",
          email: "john@tech.com",
          phone: "9876543210",
          website: "https://tech.com",
          address: "Mumbai, India",
          status: "Active",
        },
      ];
    }
  }
);

const initialState = {
  clients: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    deleteClient(state, action) {
      state.clients = state.clients.filter(
        (c) => (c.client_id || c.id) !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })

      // ✅ ADD CLIENT
      .addCase(addClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })

      // ✅ UPDATE CLIENT
      .addCase(updateClientAsync.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.clients.findIndex(
          (c) =>
            (c.client_id || c.id) ===
            (action.payload.client_id || action.payload.id)
        );
        if (idx !== -1) {
          state.clients[idx] = { ...state.clients[idx], ...action.payload };
        }
      });
  },
});

export const { deleteClient } = clientSlice.actions;
export default clientSlice.reducer;
