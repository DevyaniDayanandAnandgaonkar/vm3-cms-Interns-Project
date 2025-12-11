import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ------------------------- FETCH ALL -------------------------
export const fetchDesignations = createAsyncThunk(
  "designation/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/designations`);

      return res.data.map((d) => ({
        id: d.designation_id,
        title: d.designation_name,
        department: d.department_name,
        totalEmployees: d.totalEmployees || 0,
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------------- CREATE -------------------------
export const createDesignation = createAsyncThunk(
  "designation/create",
  async ({ designation_name, department_id, department_name }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/designations/add`, {
        designation_name,
        department_id,
      });

      return {
        id: res.data.id, // backend returns "id"
        title: designation_name,
        department: department_name,
        totalEmployees: 0,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------------- DELETE -------------------------
export const removeDesignation = createAsyncThunk(
  "designation/remove",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/api/designations/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------------- SLICE -------------------------
const slice = createSlice({
  name: "designation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDesignations.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchDesignations.fulfilled, (s, a) => {
        s.loading = false;
        s.data = [...a.payload].sort((a, b) => a.id - b.id);
      })
      .addCase(fetchDesignations.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Create
      .addCase(createDesignation.pending, (s) => {
        s.loading = true;
      })
      .addCase(createDesignation.fulfilled, (s, a) => {
        s.loading = false;

        s.data.push(a.payload);

        // Keep sorted
        s.data.sort((a, b) => a.id - b.id);
      })
      .addCase(createDesignation.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Delete
      .addCase(removeDesignation.pending, (s) => {
        s.loading = true;
      })
      .addCase(removeDesignation.fulfilled, (s, a) => {
        s.loading = false;

        s.data = s.data.filter((x) => x.id !== a.payload);

        s.data.sort((a, b) => a.id - b.id);
      })
      .addCase(removeDesignation.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default slice.reducer;
