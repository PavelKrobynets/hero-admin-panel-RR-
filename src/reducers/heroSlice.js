import { createSlice} from "@reduxjs/toolkit";

const heroInitialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};


const heroSlice = createSlice({
  name: "heroes",
  initialState: heroInitialState,
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
    heroesFiltered(state, action) {
      state.heroes = action.payload;
    },
  },
});



export const {
  heroesUpdating,
  heroesUpdated,
  heroesUpdatingError,
  heroDeleted,
  heroesFiltered,
} = heroSlice.actions;

export const heroReducer = heroSlice.reducer;
