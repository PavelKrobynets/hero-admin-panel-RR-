import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: filterInitialState,
  reducers: {
    filterFetch(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { filterFetch } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;