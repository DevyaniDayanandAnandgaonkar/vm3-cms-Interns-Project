// store/slices/dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/client";

const getToken = () => {
    try {
        return localStorage.getItem("client_token");
    } catch {
        return null;
    }
};

/**
 * Fetch dashboard summary data
 * GET /client/dashboard-summary
 */
export const fetchDashboardSummary = createAsyncThunk(
    "dashboard/fetchDashboardSummary",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/dashboard-summary`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch dashboard data");
            }
            return data; // { success, summary }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const initialState = {
    summary: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload.summary;
            })
            .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
