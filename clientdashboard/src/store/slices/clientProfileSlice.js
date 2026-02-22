// store/slices/clientProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/client";

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
 * Fetch merged client + client_profile data
 * GET /client/client-profile
 */
export const fetchClientProfileData = createAsyncThunk(
    "clientProfile/fetchClientProfileData",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/client-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch profile data");
            }

            return data; // { success, profileData }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Update basic info (company name, contact person, email, phone, address)
 * PUT /client/update-basic-info
 */
export const updateClientBasicInfo = createAsyncThunk(
    "clientProfile/updateClientBasicInfo",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/update-basic-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to update basic info");
            }

            // Re-fetch profile data to get fresh values
            dispatch(fetchClientProfileData());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Update website info
 * PUT /client/update-website-info
 */
export const updateClientWebsiteInfo = createAsyncThunk(
    "clientProfile/updateClientWebsiteInfo",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/update-website-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to update website info");
            }

            dispatch(fetchClientProfileData());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Update branding (logo_url, brand_colors)
 * PUT /client/update-branding
 */
export const updateClientBranding = createAsyncThunk(
    "clientProfile/updateClientBranding",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/update-branding`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to update branding");
            }

            dispatch(fetchClientProfileData());
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Change client password
 * PUT /client/change-password
 */
export const changeClientPassword = createAsyncThunk(
    "clientProfile/changeClientPassword",
    async ({ current_password, new_password }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ current_password, new_password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to change password");
            }

            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// ─── Initial State ──────────────────────────────────────────
const initialState = {
    profileData: null,
    loading: false,
    updating: false,
    error: null,
    updateError: null,
    updateSuccess: null,
};

// ─── Slice ──────────────────────────────────────────────────
const clientProfileSlice = createSlice({
    name: "clientProfile",
    initialState,
    reducers: {
        clearProfileError(state) {
            state.error = null;
        },
        clearProfileData(state) {
            state.profileData = null;
        },
        clearUpdateStatus(state) {
            state.updateError = null;
            state.updateSuccess = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ── Fetch Profile ─────────────────────────────────────
            .addCase(fetchClientProfileData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientProfileData.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload.profileData;
                state.error = null;
            })
            .addCase(fetchClientProfileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ── Update Basic Info ─────────────────────────────────
            .addCase(updateClientBasicInfo.pending, (state) => {
                state.updating = true;
                state.updateError = null;
                state.updateSuccess = null;
            })
            .addCase(updateClientBasicInfo.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = action.payload.message;
            })
            .addCase(updateClientBasicInfo.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload;
            })
            // ── Update Website Info ───────────────────────────────
            .addCase(updateClientWebsiteInfo.pending, (state) => {
                state.updating = true;
                state.updateError = null;
                state.updateSuccess = null;
            })
            .addCase(updateClientWebsiteInfo.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = action.payload.message;
            })
            .addCase(updateClientWebsiteInfo.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload;
            })
            // ── Update Branding ───────────────────────────────────
            .addCase(updateClientBranding.pending, (state) => {
                state.updating = true;
                state.updateError = null;
                state.updateSuccess = null;
            })
            .addCase(updateClientBranding.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = action.payload.message;
            })
            .addCase(updateClientBranding.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload;
            })
            // ── Change Password ──────────────────────────────────
            .addCase(changeClientPassword.pending, (state) => {
                state.updating = true;
                state.updateError = null;
                state.updateSuccess = null;
            })
            .addCase(changeClientPassword.fulfilled, (state, action) => {
                state.updating = false;
                state.updateSuccess = action.payload.message;
            })
            .addCase(changeClientPassword.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload;
            });
    },
});

export const { clearProfileError, clearProfileData, clearUpdateStatus } = clientProfileSlice.actions;
export default clientProfileSlice.reducer;
