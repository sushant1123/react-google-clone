import axios from "axios";

const url = "https://google-search3.p.rapidapi.com/api/v1";

export const getResults = async ({ type, searchTerm, nums = 40 }) => {
	const response = await axios.get(`${url}${type}/q=${searchTerm}&num=${nums}`, {
		headers: {
			"X-User-Agent": "desktop",
			"X-Proxy-Location": "EU",
			"X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
			"X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
		},
	});

	let result;

	if (type === "/search" || type === "/video") {
		result = response.data.results;
	} else if (type === "/image") {
		result = response.data.image_results;
	} else if (type === "/news") {
		result = response.data.entries;
	}

	return result;
};
