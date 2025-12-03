import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Dummy fetch employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    return [
      {
        id: 1,
        name: "Robert Fox",
        email: "robert.fox@company.com",
        phone: "+1 234 567 890",
        department: "Sales",
        position: "Sales Manager",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Cooper",
        email: "jane.cooper@company.com",
        phone: "+1 234 567 891",
        department: "Marketing",
        position: "Marketing Lead",
        status: "Active",
      },
      {
        id: 3,
        name: "Wade Warren",
        email: "wade.warren@company.com",
        phone: "+1 234 567 892",
        department: "Development",
        position: "Senior Developer",
        status: "Active",
      },
    ];
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
  },
  reducers: {
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
