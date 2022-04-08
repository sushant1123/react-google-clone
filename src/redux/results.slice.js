import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: [],
	searchTerm: "",
	isLoading: false,
	error: null,
};

const resultsSlice = createSlice({
	name: "result",
	initialState: initialState,
	reducers: {
		getResultsRequest: (state, action) => {
			state.isLoading = true;
			state.error = null;
		},

		getResultsSuccess: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
			state.error = null;
		},

		getResultsFailure: (state, action) => {
			state.isLoading = false;
			state.data = [];
			state.error = action.payload;
		},

		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
	},
});

export const { getResultsFailure, getResultsRequest, getResultsSuccess, setSearchTerm } =
	resultsSlice.actions;

export default resultsSlice.reducer;
