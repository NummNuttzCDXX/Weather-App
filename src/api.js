// API Module

/* This is the basic API URL
Concat Location to end (Plus any optional parameters in docs) */

export const weather = (() => {
	// Get Current Weather at Location data
	const getCurrentLocationData = async (location = '') => {
		const api = 'https://api.weatherapi.com/v1/current.json?key=fc056cba0c074a5888d30500230308&q=';
		// Fetch Data
		const request = await fetch(api + location, {mode: 'cors'});

		// Parse Data
		const data = await request.json();

		console.log(data);

		/* `data` will be JS Obj
		Holds all Current Weather Data for the given location */
		return process.currentData(data);
	};

	/* Nested Module for processing different Data Objects
	For organization */
	const process = (() => {
		const currentData = (data = {}) => {
			return {
				location: {
					name: data.location.name,
					region: data.location.region,
					country: data.location.country,
					timezone: data.location.tz_id,
					localTime: data.location.localtime, // Needs to be formatted - datefns
				},
				temp_f: data.current.temp_f,
				temp_c: data.current.temp_c,
				feelsLike_f: data.current.feelslike_f,
				feelsLike_c: data.current.feelslike_c,
				humidity: data.current.humidity,
				last_updated: data.current.last_updated,
				wind: {
					direction: data.current.wind_dir,
					speed_mph: data.current.wind_mph,
					speed_kph: data.current.wind_kph,
				},
				condition: data.current.condition,
			};
		};

		return {currentData};
	})();

	return {getCurrentLocationData};
})();
