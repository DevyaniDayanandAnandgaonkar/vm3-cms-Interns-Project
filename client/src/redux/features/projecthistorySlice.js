import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated API fetch function
const fetchProjectHistoryAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Website Redesign",
          client: "Tech Corp Inc.",
          startDate: "2024-01-15",
          endDate: "2024-04-15",
          completedOn: "2024-04-15",
          teamCount: 5,
          status: "Completed",
          budget: 100000,
          totalCost: 90000,
          received: 85000,
          remaining: 5000,
          description: "Full website overhaul...",
        },
        {
          id: 2,
          name: "Brand Identity",
          client: "Creative Agency",
          startDate: "2023-11-10",
          endDate: "2024-01-10",
          completedOn: "2024-01-10",
          teamCount: 3,
          status: "Completed",
          budget: 40000,
          totalCost: 38000,
          received: 38000,
          remaining: 0,
          description: "Logo, branding, collateral...",
        },
        {
          id: 3,
          name: "Marketing Campaign",
          client: "Global Enterprises",
          startDate: "2024-01-20",
          endDate: "2024-03-20",
          completedOn: "2024-03-20",
          teamCount: 4,
          status: "Canceled",
          budget: 60000,
          totalCost: 30000,
          received: 25000,
          remaining: 5000,
          description: "Q1 product marketing...",
        },
        // add more as needed
      ]);
    }, 500);
  });
};

export const fetchProjectHistory = createAsyncThunk(
  "projectHistory/fetchProjectHistory",
  async () => {
    const data = await fetchProjectHistoryAPI();
    return data;
  }
);

const projectHistorySlice = createSlice({
  name: "projectHistory",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectHistory.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectHistorySlice.reducer;
