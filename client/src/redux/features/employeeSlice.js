import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../apiRoutes';

// Fetch all employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get(apiRoutes.employees.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch employees');
  }
});

// Add employee
export const addEmployeeAsync = createAsyncThunk('employees/addEmployee', async (employeeData, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.post(apiRoutes.employees.create, employeeData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(fetchEmployees());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add employee');
  }
});

// Update employee
export const updateEmployeeAsync = createAsyncThunk('employees/updateEmployee', async (employeeData, { getState, dispatch, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const id = employeeData.emp_id || employeeData.id;
    await axios.put(apiRoutes.employees.update(id), employeeData.body, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(fetchEmployees());
    return { emp_id: id };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update employee');
  }
});

// Delete employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.delete(apiRoutes.employees.delete(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete employee');
  }
});

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        // The employee list will be updated by the fetchEmployees thunk.
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(e => (e.emp_id || e.id) !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;