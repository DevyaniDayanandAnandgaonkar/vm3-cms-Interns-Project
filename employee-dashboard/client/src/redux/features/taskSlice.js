import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployeeTasks = createAsyncThunk(
    "employeeTasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "http://localhost:5000/api/employee-tasks",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!data.success) {
                return rejectWithValue(data.message || "Failed to fetch tasks");
            }

            return data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTaskProgress = createAsyncThunk(
    "employeeTasks/updateProgress",
    async ({ taskId, progress }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:5000/api/employee-tasks/progress/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ progress }),
                }
            );

            const data = await res.json();

            if (!data.success) {
                return rejectWithValue(data.message);
            }

            return { taskId, progress };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const employeeTaskSlice = createSlice({
    name: "employeeTasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchEmployeeTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTaskProgress.fulfilled, (state, action) => {
                const idx = state.tasks.findIndex(t => t.task_id === action.payload.taskId);
                if (idx !== -1) {
                    state.tasks[idx].progress = action.payload.progress;
                    if (action.payload.progress === 100) {
                        state.tasks[idx].status = "completed";
                    }
                }
            });
    },
});

export default employeeTaskSlice.reducer;
