/**
 * Dom Manipulation Module
 * @module
 */

import {weather} from './api.js';
import {format, parseISO, isToday, isPast} from 'date-fns';
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
	 * Update the `#today` container with the days forecasted weather,
	 * not necessarily the 'Current' weather
	 * @param {object} dayData - Data for the day whos data you want to show
	 * EX: data.forecast.days[x]
	 * @param {string} unit - `F`/`C` for Farenheit/Celsius
	 */
	const updateTodaysWeather = (dayData, unit = 'F') => {
		const lowerUnit = unit.toLowerCase();
		const container = document.querySelector('#today');

		// Head
		const head = container.querySelector('h3');
		head.textContent = 'Weather for ' +
			formatForecastDate(dayData.date, false, true);

		// Average Temp
		const avgTemp = container.querySelector('.avg .info');
		avgTemp.textContent = dayData.day[lowerUnit].avg + '\u00B0' + unit;

		// High
		const high = container.querySelector('.temp .high .info');
		high.textContent = dayData.day[lowerUnit].high + '\u00B0' + unit;

		// Low
		const low = container.querySelector('.temp .low .info');
		low.textContent = dayData.day[lowerUnit].low + '\u00B0' + unit;

		// Humidity
		const humid = container.querySelector('.humidity .info');
		humid.textContent = dayData.day.avgHumidity + '%';

		// Sunrise
		const sunrise = container.querySelector('.sunrise .info');
		sunrise.textContent = dayData.astro.sunrise;

		// Sunset
		const sunset = container.querySelector('.sunset .info');
		sunset.textContent = dayData.astro.sunset;

		// Moon Phase
		const phase = container.querySelector('.moonphase .info');
		phase.textContent = dayData.astro.moonPhase;

		// Moonrise
		const moonrise = container.querySelector('.moonrise .info');
		moonrise.textContent = dayData.astro.moonrise;

		// Moonset
		const moonset = container.querySelector('.moonset .info');
		moonset.textContent = dayData.astro.moonset;
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
			const roundedHigh = Math.round(currentDay.day[unit.toLowerCase()].high);
			high.textContent = roundedHigh + '\u00B0' + unit.toUpperCase();

			const low = container.querySelector('.temp .low');
			const roundedLow = Math.round(currentDay.day[unit.toLowerCase()].low);
			low.textContent = roundedLow + '\u00B0'+ unit.toUpperCase();

			// Chance of Rain
			const precip = container.querySelector('.precip-chance');
			precip.textContent = currentDay.day.chanceRain + '%';

			console.log(data);
		}
	};

	/**
	 * Display hourly forecast data to DOM
	 * @param {object} data - Processed weather data -- Pass in individual day,
	 * EX: data.forecast.days[x] -- X = number for day in array. 0 = today
	 * @param {string} unit - `F`arenheit/`C`elsius
	 */
	const updateHourlyForecast = (data, unit = 'f') => {
		const container = document.querySelector('#hourly');

		// Heading
		const head = container.querySelector('h3');
		head.textContent = `${formatForecastDate(data.date)}'s Hourly Forecast`;

		// Hours
		const hours = Array.from(container.querySelectorAll('.hour'));
		// Use `for` loop to iterate through `hours` array & hours in `data`
		for (let i = 0; i < hours.length; i++) {
			const hourContainer = hours[i];
			const hourData = data.hourly[i];

			// If time is in the past, dont show
			if (checkTimeIsPast(hourData.time)) {
				hourContainer.style.display = 'none';
				continue;
			}

			// Time
			const time = hourContainer.querySelector('.time');
			time.textContent = formatForecastDate(hourData.time, true);

			// Temp
			const temp = hourContainer.querySelector('.temp');
			temp.textContent = hourData.temp[unit.toLowerCase()].temp +
				'\u00B0' + unit.toUpperCase();

			// Condition
			const conditionContainer = hourContainer.querySelector('.condition');
			const img = conditionContainer.querySelector('img');
			img.src = getConditionImg(hourData.condition, hourData.isDay);
			img.alt = 'Weather Image';

			const txt = conditionContainer.querySelector('span');
			txt.textContent = hourData.condition.text;

			// Chance Rain
			const precip = hourContainer.querySelector('.precip');
			precip.textContent = hourData.chanceRain + '%';

			// Wind
			const windContainer = hourContainer.querySelector('.wind');
			const direction = windContainer.querySelector('.direction');
			const speed = windContainer.querySelector('.speed');
			if (unit.toLowerCase() === 'f') {
				direction.textContent = hourData.wind.direction;
				speed.textContent = hourData.wind.speed.mph + 'mph';
			} else if (unit.toLowerCase() === 'c') {
				direction.textContent = hourData.wind.direction;
				speed.textContent = hourData.wind.speed.kph + 'kph';
			} else {
				throw new Error('Sonmething went wrong with "wind" section');
			}
		}
	};

	/**
	 * Check if time is in past, rounded down to closest hour
	 * @param {string} checkDate - ISO date to check against current date and time
	 * given by Weather API Hourly data
	 * @return {boolean} True if date is in past
	 * (except for closest hour rounded down)
	 */
	const checkTimeIsPast = (checkDate) => {
		// Get time from date string
		const time = checkDate.split(' ')[1];
		const hour = time.slice(0, 2);
		const currentHour = Date().split(' ')[4].slice(0, 2);

		if (isPast(parseISO(checkDate))) {
			if (hour == currentHour || hour == currentHour - 1) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};

	/**
	 * Format the given date for `#forecast` & `#hourly` sections
	 * @param {string} date - Date as a string
	 * @param {boolean} time - Do you want to return the date or the time?
	 * @param {boolean} longDate - Do you want to return the long date with day of
	 * week and month?
	 * @return {string} Formatted date/time
	 */
	const formatForecastDate = (date, time = false, longDate = false) => {
		if (time) {
			return format(parseISO(date), 'p');
		} else if (longDate) {
			if (isToday(parseISO(date))) return 'Today';

			const newDate = format(parseISO(date), 'PPPP')
				.slice(0, -5);

			return newDate;
		} else {
			if (isToday(parseISO(date))) return 'Today';

			const dayOfWeek = format(parseISO(date), 'iii'); // Mon, Tue, Wed, .etc
			const dayOfMonth = format(parseISO(date), 'dd'); // 01, 02, 03, .etc
			return `${dayOfWeek} ${dayOfMonth}`;
		}
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
		const location = document.querySelector('.current-header').innerText
			.split('\n')[0];
		weather.getForecastData(location)
			.then(function fulfill(data) {
				updateCurrentLocation(data, unit);
				updateWeekForecast(data, unit);
				updateHourlyForecast(data.forecast.days[0], unit);
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
	 * @return {object} Weather data
	 */
	const search = async (location) => {
		const data = await weather.getForecastData(location); // Get data
		const unitBtn = document.querySelector('button#unit');
		let unit;
		(unitBtn.textContent.includes('F')) ? unit = 'F' : unit = 'C'; // Get unit

		updateCurrentLocation(data, unit); // Display Data
		updateTodaysWeather(data.forecast.days[0], unit); // Display Today's data
		updateWeekForecast(data, unit); // Display weeks Data
		updateHourlyForecast(data.forecast.days[0], unit); // Todays Hourly Forecast

		return data;
	};

	return {search, updateUnits};
})();
