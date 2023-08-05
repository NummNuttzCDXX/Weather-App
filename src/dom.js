// Dom Manipulation Module

import {format, parseISO} from 'date-fns';

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

	return {updateCurrentLocation};
})();
