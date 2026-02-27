import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeaves = createAsyncThunk(
  "leaves/fetchLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/employee-leaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.leaves;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const applyLeave = createAsyncThunk(
  "leaves/applyLeave",
  async (leaveData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/employee-leaves/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(leaveData),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return leaveData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchLeaveSummary = createAsyncThunk(
  "leaves/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/employee-leaves/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const leaveSlice = createSlice({
  name: "leaves",
  initialState: {
    leaves: [],
    loading: false,
    error: null,
    leaveSummary: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyLeave.fulfilled, (state, action) => {
  state.leaves.unshift({
    ...action.payload,
    id: Date.now(),
    status: "pending",
    days:
      (new Date(action.payload.end_date) -
        new Date(action.payload.start_date)) /
        (1000 * 60 * 60 * 24) +
      1,
  });
})
.addCase(fetchLeaveSummary.fulfilled, (state, action) => {
  state.leaveSummary = action.payload;
})
      
      
  },
});

export default leaveSlice.reducer;