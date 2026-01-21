import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

// Fetch all projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get(apiRoutes.projects.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
  }
});

// Add a new project
export const addProjectAsync = createAsyncThunk('projects/addProject', async (projectData, { getState, rejectWithValue }) => {
  try {
    const payload = {
      project_name: projectData.project_name,
      description: projectData.description,
      category_id: projectData.category_id,
      client_id: projectData.client_id,
      department_id: projectData.department_id,
      assigned_to: projectData.assigned_to,
      status: projectData.status,
      created_by: projectData.created_by,
    };
    const token = getState().auth.token;
    const res = await axios.post(apiRoutes.projects.create, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { ...projectData, project_id: res.data.project_id };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add project');
  }
});

// Update an existing project
export const updateProjectAsync = createAsyncThunk('projects/updateProject', async (projectData, { getState, rejectWithValue }) => {
  try {
    const payload = {
      project_name: projectData.project_name,
      description: projectData.description,
      category_id: projectData.category_id,
      client_id: projectData.client_id,
      department_id: projectData.department_id,
      assigned_to: projectData.assigned_to,
      status: projectData.status,
      created_by: projectData.created_by,
      Progress: projectData.Progress,
    };
    const { project_id } = projectData;
    const token = getState().auth.token;
    await axios.put(apiRoutes.projects.update(project_id), payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return projectData;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update project');
  }
});

// Delete a project
export const deleteProjectAsync = createAsyncThunk('projects/deleteProject', async (projectId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.delete(apiRoutes.projects.delete(projectId), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return projectId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete project');
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(project => project.project_id === action.payload.project_id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(project => project.project_id !== action.payload);
      })
      .addCase(deleteProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
