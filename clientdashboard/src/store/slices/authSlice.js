// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/client";

// ─── Async Thunks ───────────────────────────────────────────

/**
 * Login thunk — POST /api/client-auth/login
 */
export const loginClient = createAsyncThunk(
    "auth/loginClient",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Login failed");
            }

            // Persist token in localStorage
            localStorage.setItem("client_token", data.token);

            return data; // { success, message, token, client }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Fetch profile thunk — GET /api/client-auth/profile
 */
export const fetchClientProfile = createAsyncThunk(
    "auth/fetchClientProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("client_token");
            if (!token) return rejectWithValue("No token found");

            const res = await fetch(`${API_BASE}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                // If token is invalid/expired, clear it
                if (res.status === 401) {
                    localStorage.removeItem("client_token");
                }
                return rejectWithValue(data.message || "Failed to fetch profile");
            }

            return data; // { success, client }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// ─── Initial State ──────────────────────────────────────────
const initialState = {
    client: null,
    token: typeof window !== "undefined" ? localStorage.getItem("client_token") : null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// ─── Slice ──────────────────────────────────────────────────
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.client = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("client_token");
        },
        clearError(state) {
            state.error = null;
        },
        // Hydrate auth state from localStorage on app mount
        hydrateAuth(state) {
            const token = localStorage.getItem("client_token");
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // ── Login ──────────────────────────────────────────────
            .addCase(loginClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginClient.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.client = action.payload.client;
                state.error = null;
            })
            .addCase(loginClient.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // ── Fetch Profile ──────────────────────────────────────
            .addCase(fetchClientProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.client = action.payload.client;
            })
            .addCase(fetchClientProfile.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.client = null;
                state.token = null;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
