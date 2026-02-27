import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/axios";

// FETCH
export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async () => {
    const res = await api.get("/employee-todos");
    return res.data;
  }
);

// ADD
export const addTodoAsync = createAsyncThunk(
  "todos/add",
  async (text) => {
    await api.post("/employee-todos", {
      task_text: text,
      status: "pending",
    });
    const res = await api.get("/employee-todos");
    return res.data;
  }
);

// export const addTodoAsync = createAsyncThunk(
//   "todos/add",
//   async (text) => {
//     const res = await api.post("/employee-todos", {
//       task_text: text,
//       status: "pending",
//     });
//     return res.data;   // no second GET
//   }
// );
// UPDATE
export const updateTodoAsync = createAsyncThunk(
  "todos/update",
  async ({ id, status }) => {
    await api.put(`/employee-todos/${id}`, { status });
    const res = await api.get("/employee-todos");
    return res.data;
  }
);

// DELETE
export const deleteTodoAsync = createAsyncThunk(
  "todos/delete",
  async (id) => {
    await api.delete(`/employee-todos/${id}`);
    const res = await api.get("/employee-todos");
    return res.data;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
//     builder.addCase(addTodoAsync.fulfilled, (state, action) => {
//   state.list.unshift(action.payload);
// });
    builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default todoSlice.reducer;