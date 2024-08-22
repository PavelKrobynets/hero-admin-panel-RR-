import { configureStore } from "@reduxjs/toolkit";
import { heroReducer} from "../reducers/heroSlice";
import { filterReducer } from "../reducers/filterSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    filter: filterReducer,
  },
});
