// Dom Manipulation Module

import {format, parseISO, isToday} from 'date-fns';
import conditionsList from './weather_conditions.json';

export const dom = (() => {
	const updateCurrentLocation = (data) => {
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
		currentTemp.textContent = data.current.temp_f + '\u00B0' + 'F';

		// Condition
		const condition = document.querySelector('#condition.weather-current');
		condition.textContent = data.current.condition.text;
	};

	const updateWeekForecast = (data, unit = 'f') => {// unit = Celsius/Farenheit
		const dayContainers = document.querySelectorAll('.day-container');

		for (let i = 0; i < dayContainers.length; i++) {
			const container = dayContainers[i]; // Loop through containers
			const currentDay = data.forecast.days[i]; // Save current iterated day

			// Day of the week
			const day = container.querySelector('.day'); // Get `day` div in container
			day.textContent = formatForecastDate(currentDay.date);

			// Condition img
			const condition = new Image();
			condition.src = getConditionImg(currentDay.day.condition, 1);
			container.querySelector('.condition-container').appendChild(condition);

			// Temperature
			const high = container.querySelector('.temp .high');
			high.textContent = currentDay.day[unit].high + '\u00B0' +
				unit.toUpperCase();

			const low = container.querySelector('.temp .low');
			low.textContent = currentDay.day[unit].low + '\u00B0'+ unit.toUpperCase();

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

	// Param: condition Obj, Day?
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
				console.log('why are you broken');
				path = `../dist/assets/img/weather/${time}/${obj.icon}.png`;
			}
		});
		return path;
	};

	return {updateCurrentLocation, updateWeekForecast};
})();
