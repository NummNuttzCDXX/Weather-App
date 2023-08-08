/**
 * Dom Manipulation Module
 * @module
 */

import {weather} from './api.js';
import {format, parseISO, isToday} from 'date-fns';
import conditionsList from './weather_conditions.json';

export const dom = (() => {
	/**
	 * Updates `Current Weather` container with the given Data
	 * @param {object} data - Data object given by Weather API after processing
	 * @param {string} unit - F/C (Farenheit/Celsius)
	 * see {@link weather.process.forecastData}
	 */
	const updateCurrentLocation = (data, unit = 'F') => {
		// Heading
		const header = document.querySelector('.current-header.weather-current');
		header.textContent = `${data.location.name}, ${data.location.region}`;

		// Last Updated
		const time = format(parseISO(data.current.last_updated), 'p');
		const updated = document.createElement('span');
		updated.textContent = `Last updated: ${time}`;
		header.appendChild(updated);

		// Current Temp
		const currentTemp = document.querySelector('#current-temp');
		currentTemp.textContent = data.current[unit.toLowerCase()].temp +
			'\u00B0' + unit;

		// Condition
		const condition = document.querySelector('#condition.weather-current');
		condition.textContent = data.current.condition.text;

		const img = document.querySelector('#condition-img-container img');
		img.src = getConditionImg(data.current.condition, data.current.isDay);

		// Feels Like
		const feelsLike = document.querySelector('#feels-like.weather-current');
		feelsLike.textContent = 'Feels like: ' +
			data.current[unit.toLowerCase()].feelsLike + '\u00B0' + unit;
	};

	/**
	 * Updates `Weekly Forecast` container with the given data
	 * @param {object} data - Processed Data
	 * @param {string} unit - 'f'/'c', for Farenheit/Celsius
	 */
	const updateWeekForecast = (data, unit = 'f') => {
		const dayContainers = document.querySelectorAll('.day-container');

		for (let i = 0; i < dayContainers.length; i++) {
			const container = dayContainers[i]; // Loop through containers
			const currentDay = data.forecast.days[i]; // Save current iterated day

			// Day of the week
			const day = container.querySelector('.day'); // Get `day` div in container
			day.textContent = formatForecastDate(currentDay.date);

			// Condition img
			const img = container.querySelector('.condition-container img');
			img.src = getConditionImg(currentDay.day.condition);
			img.alt = currentDay.day.condition.text;

			// Temperature
			const high = container.querySelector('.temp .high');
			high.textContent = currentDay.day[unit.toLowerCase()].high + '\u00B0' +
				unit.toUpperCase();

			const low = container.querySelector('.temp .low');
			low.textContent = currentDay.day[unit.toLowerCase()].low + '\u00B0'+
				unit.toUpperCase();

			// Chance of Rain
			const precip = container.querySelector('.precip-chance');
			precip.textContent = currentDay.day.chanceRain + '%';
		}
	};

	/* This will format the date for the weekly forecast section */
	const formatForecastDate = (date) => {
		if (isToday(parseISO(date))) return 'Today';

		const dayOfWeek = format(parseISO(date), 'iii'); // Mon, Tue, Wed, .etc
		const dayOfMonth = format(parseISO(date), 'dd'); // 01, 02, 03, .etc
		return `${dayOfWeek} ${dayOfMonth}`;
	};

	/**
	 * Get file path to weather condition image
	 * @param {object} condition - Condition Object given by Weather API
	 * @param {number} day - `isDay` Property from Weather API will be 1 for true
	 * @return {string} - File path to current weather's corresponding image
	 */
	const getConditionImg = (condition, day = 1) => {
		let time;
		(day === 1) ? time = 'day' : time = 'night';

		// Set default path in case loop fails
		let path = '../dist/assets/img/weather/day/113.png';
		/* Loop through JSON Obj's and search for
		Obj that matches current conditions
		Return file path to corrosponding image */
		conditionsList.forEach((obj) => {
			if (obj.code == condition.code) {
				path = `../dist/assets/img/weather/${time}/${obj.icon}.png`;
			}
		});
		return path;
	};

	/**
	 * Toggles the text of the `#unit` btn to be F or C
	 * @return {string} - Returns unit F/C (Farenheit/Celsius)
	 */
	const toggleUnitBtn = () => {
		const unitBtn = document.querySelector('button#unit');
		let unit;

		if (unitBtn.textContent.includes('F')) {
			unitBtn.textContent = unitBtn.textContent.replace('F', 'C');
			unit = 'C';
		} else {
			unitBtn.textContent = unitBtn.textContent.replace('C', 'F');
			unit = 'F';
		}

		return unit;
	};

	const updateUnits = () => {
		const unit = toggleUnitBtn();

		/* Get updated forecast data,
		Toggle the units,
		Using Promise syntax this time ;) */
		const location = document.querySelector('.current-header').innerHTML
			.split('\n')[0];
		weather.getForecastData(location)
			.then(function fulfill(data) {
				updateCurrentLocation(data, unit);
				updateWeekForecast(data, unit);
			})
			.catch(function err(error) {
				alert('There was an error');
				console.error(error);
			});
	};

	/**
	 * Will be run on Search Btn Click.
	 * Updates current location, weekly forecast, and hourly info
	 * @param {string} location - Location to show weather info
	 */
	const search = async (location) => {
		const data = await weather.getForecastData(location); // Get data
		const unitBtn = document.querySelector('button#unit');
		let unit;
		(unitBtn.textContent.includes('F')) ? unit = 'F' : unit = 'C'; // Get unit

		updateCurrentLocation(data, unit); // Display Data
		updateWeekForecast(data, unit); // Display weeks Data
	};

	return {search, updateUnits};
})();
