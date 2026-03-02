import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const res = await axios.get(apiRoutes.tasks.getAll, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data.tasks;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks');
    }
});

// Create a new task
export const createTaskAsync = createAsyncThunk('tasks/createTask', async (taskData, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        const res = await axios.post(apiRoutes.tasks.create, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { ...taskData, id: res.data.task_id };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to create task');
    }
});

// Delete a task
export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (taskId, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        await axios.delete(apiRoutes.tasks.delete(taskId), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return taskId;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to delete task');
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTaskAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            })
            .addCase(deleteTaskAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;
