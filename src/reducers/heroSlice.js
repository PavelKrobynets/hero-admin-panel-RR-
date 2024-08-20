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
      return {
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload),
      };
    },
  },
});

export const {
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
  heroDeleted,
} = heroSlice.actions;
export default heroSlice.reducer; // export the reducer
