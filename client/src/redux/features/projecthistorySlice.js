import { createSlice } from '@reduxjs/toolkit';

const projectHistorySlice = createSlice({
    name: 'projectHistory',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setProjectHistory(state, action) {
            state.data = action.payload;
        },
    },
});

export const { setProjectHistory } = projectHistorySlice.actions;
export default projectHistorySlice.reducer;