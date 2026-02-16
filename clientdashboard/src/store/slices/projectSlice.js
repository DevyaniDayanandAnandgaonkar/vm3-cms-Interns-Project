// store/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api/projects";

// ─── Helper: get token from localStorage ────────────────────
const getToken = () => {
    try {
        return localStorage.getItem("client_token");
    } catch {
        return null;
    }
};

// ─── Async Thunks ───────────────────────────────────────────

/**
 * Fetch all projects for the logged-in client
 * GET /api/projects
 */
export const fetchClientProjects = createAsyncThunk(
    "projects/fetchClientProjects",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(API_BASE, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch projects");
            }

            return data; // { success, count, projects }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Fetch a single project by ID
 * GET /api/projects/:id
 */
export const fetchProjectById = createAsyncThunk(
    "projects/fetchProjectById",
    async (projectId, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch project");
            }

            return data; // { success, project }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// ─── Initial State ──────────────────────────────────────────
const initialState = {
    projects: [],
    selectedProject: null,
    count: 0,
    loading: false,
    error: null,
};

// ─── Slice ──────────────────────────────────────────────────
const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        clearProjectError(state) {
            state.error = null;
        },
        clearSelectedProject(state) {
            state.selectedProject = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── Fetch All Projects ─────────────────────────────────
            .addCase(fetchClientProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload.projects;
                state.count = action.payload.count;
                state.error = null;
            })
            .addCase(fetchClientProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ── Fetch Single Project ───────────────────────────────
            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProject = action.payload.project;
                state.error = null;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProjectError, clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
