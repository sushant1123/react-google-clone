import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./results.slice";

// 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk'

export const store = configureStore({
	reducer: {
		result: resultsReducer,
	},
});
