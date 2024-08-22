import { configureStore } from "@reduxjs/toolkit";
import { heroReducer, filterReducer } from "../reducers/heroSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    filter: filterReducer,
  },
});
