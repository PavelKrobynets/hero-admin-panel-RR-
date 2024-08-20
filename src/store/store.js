import { configureStore } from '@reduxjs/toolkit';
import heroSlice from '../reducers/heroSlice';

export const store = configureStore({
	reducer: {
		hero: heroSlice
	},
});

const RootState = store.getState