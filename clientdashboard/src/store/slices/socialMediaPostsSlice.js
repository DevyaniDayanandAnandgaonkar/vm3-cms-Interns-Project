// store/slices/socialMediaPostsSlice.js
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
 * Fetch all social media posts for the logged-in client
 * GET /client/social-media-posts
 */
export const fetchClientPosts = createAsyncThunk(
    "socialMediaPosts/fetchClientPosts",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/social-media-posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to fetch posts");
            }
            return data; // { success, posts }
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Approve a social media post
 * PUT /client/social-media-posts/:postId/approve
 */
export const approvePost = createAsyncThunk(
    "socialMediaPosts/approvePost",
    async ({ postId, rejected_reason }, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/social-media-posts/${postId}/approve`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ rejected_reason }),
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to approve post");
            }

            dispatch(fetchClientPosts()); // Refresh
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

/**
 * Reject a social media post with a reason
 * PUT /client/social-media-posts/:postId/reject
 */
export const rejectPost = createAsyncThunk(
    "socialMediaPosts/rejectPost",
    async ({ postId, rejected_reason }, { rejectWithValue, dispatch }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue("Not authenticated");

            const res = await fetch(`${API_BASE}/social-media-posts/${postId}/reject`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ rejected_reason }),
            });

            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to reject post");
            }

            dispatch(fetchClientPosts()); // Refresh
            return data;
        } catch (error) {
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const initialState = {
    posts: [],
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
};

const socialMediaPostsSlice = createSlice({
    name: "socialMediaPosts",
    initialState,
    reducers: {
        clearPostsError(state) {
            state.error = null;
            state.actionError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchClientPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts;
            })
            .addCase(fetchClientPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Approve
            .addCase(approvePost.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(approvePost.fulfilled, (state) => {
                state.actionLoading = false;
            })
            .addCase(approvePost.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            })
            // Reject
            .addCase(rejectPost.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(rejectPost.fulfilled, (state) => {
                state.actionLoading = false;
            })
            .addCase(rejectPost.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            });
    },
});

export const { clearPostsError } = socialMediaPostsSlice.actions;
export default socialMediaPostsSlice.reducer;
