import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const heroSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, payload) => {
      state.heroesLoadingStatus = "idle";
			state.heroes = payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
  },
});

export const { heroesFetching, heroesFetched, heroesFetchingError } =
  heroSlice.actions;
export default heroSlice.reducer;
