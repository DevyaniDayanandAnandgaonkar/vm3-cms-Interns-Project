// store/slices/mediaPlatformSlice.js
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
 * Fetch all media platform profiles for the logged-in client
 */
export const fetchMediaPlatforms = createAsyncThunk(
    "mediaPlatform/fetchMediaPlatforms",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/media-platforms`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch platforms");
            }
            return data; // { success, platforms }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Add a new media platform profile
 */
export const addMediaPlatform = createAsyncThunk(
    "mediaPlatform/addMediaPlatform",
    async ({ platform, account_type, username, password }, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/media-platforms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ platform, account_type, username, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to add platform");
            }

            dispatch(fetchMediaPlatforms());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Update an existing media platform profile
 */
export const updateMediaPlatform = createAsyncThunk(
    "mediaPlatform/updateMediaPlatform",
    async ({ id, platform, account_type, username, password }, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/media-platforms/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ platform, account_type, username, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to update platform");
            }

            dispatch(fetchMediaPlatforms());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Delete a media platform profile
 */
export const deleteMediaPlatform = createAsyncThunk(
    "mediaPlatform/deleteMediaPlatform",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/media-platforms/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to delete platform");
            }

            dispatch(fetchMediaPlatforms());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const initialState = {
    platforms: [],
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
};

const mediaPlatformSlice = createSlice({
    name: "mediaPlatform",
    initialState,
    reducers: {
        clearPlatformError(state) {
            state.error = null;
            state.actionError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchMediaPlatforms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMediaPlatforms.fulfilled, (state, action) => {
                state.loading = false;
                state.platforms = action.payload.platforms;
            })
            .addCase(fetchMediaPlatforms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add
            .addCase(addMediaPlatform.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(addMediaPlatform.fulfilled, (state) => {
                state.actionLoading = false;
            })
            .addCase(addMediaPlatform.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            })
            // Update
            .addCase(updateMediaPlatform.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(updateMediaPlatform.fulfilled, (state) => {
                state.actionLoading = false;
            })
            .addCase(updateMediaPlatform.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            })
            // Delete
            .addCase(deleteMediaPlatform.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(deleteMediaPlatform.fulfilled, (state) => {
                state.actionLoading = false;
            })
            .addCase(deleteMediaPlatform.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            });
    },
});

export const { clearPlatformError } = mediaPlatformSlice.actions;
export default mediaPlatformSlice.reducer;
