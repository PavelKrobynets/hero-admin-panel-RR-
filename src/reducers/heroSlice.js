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
        state.heroes = state.heroes.filter((hero) => hero.id !== action.payload)
    },
    filterFetch(state, action) {
      state.filters = [...action.payload];
    },
    filteredHeroes(state, action) {
        state.heroes = state.heroes.filter((hero) => hero.element === action.payload)
    },
  },
});

export const {
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
  heroDeleted,
  filterFetch,
  filteredHeroes,
} = heroSlice.actions;
export default heroSlice.reducer; // export the reducer
