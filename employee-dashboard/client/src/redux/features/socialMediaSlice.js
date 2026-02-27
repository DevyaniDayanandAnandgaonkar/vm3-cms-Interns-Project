import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/axios";

// FETCH all posts
export const fetchPosts = createAsyncThunk(
    "socialMedia/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/employee-social-media");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch posts");
        }
    }
);

// FETCH all clients (for dropdown)
export const fetchClients = createAsyncThunk(
    "socialMedia/fetchClients",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/employee-social-media/clients");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch clients");
        }
    }
);

// FETCH single post
export const fetchPostById = createAsyncThunk(
    "socialMedia/fetchPostById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/employee-social-media/${id}`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch post");
        }
    }
);

// CREATE post
export const createPost = createAsyncThunk(
    "socialMedia/createPost",
    async (postData, { rejectWithValue }) => {
        try {
            await api.post("/employee-social-media", postData);
            const res = await api.get("/employee-social-media");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to create post");
        }
    }
);

// UPDATE post
export const updatePost = createAsyncThunk(
    "socialMedia/updatePost",
    async ({ id, postData }, { rejectWithValue }) => {
        try {
            await api.put(`/employee-social-media/${id}`, postData);
            const res = await api.get("/employee-social-media");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update post");
        }
    }
);

// DELETE post
export const deletePost = createAsyncThunk(
    "socialMedia/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/employee-social-media/${id}`);
            const res = await api.get("/employee-social-media");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete post");
        }
    }
);

// UPDATE STATUS (approve / reject)
export const updatePostStatus = createAsyncThunk(
    "socialMedia/updatePostStatus",
    async ({ id, status, rejected_reason }, { rejectWithValue }) => {
        try {
            await api.patch(`/employee-social-media/${id}/status`, { status, rejected_reason });
            const res = await api.get("/employee-social-media");
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to update status");
        }
    }
);

const socialMediaSlice = createSlice({
    name: "socialMedia",
    initialState: {
        list: [],
        clients: [],
        currentPost: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCurrentPost: (state) => {
            state.currentPost = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // FETCH ALL
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // FETCH CLIENTS
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.clients = action.payload;
        });

        // FETCH BY ID
        builder.addCase(fetchPostById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPost = action.payload;
        });
        builder.addCase(fetchPostById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // CREATE
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.error = action.payload;
        });

        // UPDATE
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(updatePost.rejected, (state, action) => {
            state.error = action.payload;
        });

        // DELETE
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.error = action.payload;
        });

        // UPDATE STATUS
        builder.addCase(updatePostStatus.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(updatePostStatus.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { clearCurrentPost, clearError } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
