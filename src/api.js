// API Module

/* This is the basic API URL
Concat Location to end (Plus any optional parameters in docs) */

export const weather = (() => {
	// Get Current Weather at Location data
	const getForecastData = async (location = '') => {
		const api = 'https://api.weatherapi.com/v1/forecast.json?key=fc056cba0c074a5888d30500230308&days=7&q=';
		// Fetch Data
		const request = await fetch(api + location, {mode: 'cors'});

		// Parse Data
		const data = await request.json();

		console.log(data);

		/* `data` will be JS Obj
		Holds all Current Weather Data for the given location */
		return process.forecastData(data);
	};

	/* Nested Module for processing different Data Objects
	For organization */
	const process = (() => {
		const forecastData = (data = {}) => {
			const days = [];

			/* This is an array holding the forecast data for each day,
			Number of days is unknown so well loop through the array
			and set the needed data manually */
			data.forecast.forecastday.forEach((day) => {
				// For each day, get the hourly data
				const hours = [];
				for (const time of day.hour) {
					// Process hourly data
					const hour = {
						temp: {
							f: {
								feelsLike: time.feelslike_f,
								temp: time.temp_f,
							},
							c: {
								feelsLike: time.feelslike_c,
								temp: time.temp_c,
							},
						},
						chanceRain: time.chance_of_rain,
						time: time.time,
						condition: time.condition,
					};

					hours.push(hour); // Add processed data to `hours` array
				}

				const newDay = {
					date: day.date,
					day: {
						f: {
							high: day.day.maxtemp_f,
							low: day.day.mintemp_f,
						},
						c: {
							high: day.day.maxtemp_c,
							low: day.day.mintemp_c,
						},
						chanceRain: day.day.daily_chance_of_rain,
						condition: day.day.condition,
					},
					astro: {
						moonPhase: day.astro.moon_phase,
						moonset: day.astro.moonset,
						moonrise: day.astro.moonrise,
						sunset: day.astro.sunset,
						sunrise: day.astro.sunrise,
						isSunUp: day.astro.is_sun_up,
						isMoonUp: day.astro.is_moon_up,
					},
					hourly: hours,
				};

				days.push(newDay); // Add the day to array manually
			});

			return {
				location: {
					name: data.location.name,
					region: data.location.region,
					country: data.location.country,
					timezone: data.location.tz_id,
					localTime: data.location.localtime, // Needs to be formatted - datefns
				},
				current: {
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
					isDay: data.current.is_day,
				},
				forecast: {
					days: days,
				},
			};
		};

		return {forecastData};
	})();

	return {getForecastData};
})();