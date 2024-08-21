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
    heroesUpdating(state) {
      state.heroesLoadingStatus = "loading";
    },
    heroesUpdated(state, action) {
      state.heroes = [...state.heroes, ...action.payload];
      state.heroesLoadingStatus = "idle";
    },
    heroesUpdatingError(state) {
      state.heroesLoadingStatus = "error";
    },
    heroDeleted(state, action) {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
    filterFetch(state, action) {
      state.filters = action.payload;
    },
    heroesFiltered(state, action) {
      state.heroes = action.payload;
    },
  },
});

export const {
  heroesUpdating,
  heroesUpdated,
	heroesFiltered,
  heroesUpdatingError,
  heroDeleted,
  filterFetch,
} = heroSlice.actions;
export default heroSlice.reducer; // export the reducer
