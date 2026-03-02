import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

// Fetch all leave requests
export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const res = await axios.get(apiRoutes.leaves.getAll, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.leaves;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch leaves');
    }
});

// Approve a leave request
export const approveLeave = createAsyncThunk('leaves/approveLeave', async (leaveId, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        await axios.put(apiRoutes.leaves.update(leaveId), { status: 'approved' }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return leaveId;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to approve leave');
    }
});

// Reject a leave request
export const rejectLeave = createAsyncThunk('leaves/rejectLeave', async (leaveId, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        await axios.put(apiRoutes.leaves.update(leaveId), { status: 'rejected' }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return leaveId;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to reject leave');
    }
});

const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        leaves: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaves.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(approveLeave.fulfilled, (state, action) => {
                const idx = state.leaves.findIndex(l => l.id === action.payload);
                if (idx !== -1) state.leaves[idx].status = 'approved';
            })
            .addCase(approveLeave.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(rejectLeave.fulfilled, (state, action) => {
                const idx = state.leaves.findIndex(l => l.id === action.payload);
                if (idx !== -1) state.leaves[idx].status = 'rejected';
            })
            .addCase(rejectLeave.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default leaveSlice.reducer;
