/* Weather App
Powered by Weather API */

import {weather} from './api.js';
import {dom} from './dom.js';

// Show data on Search btn click
const searchBtn = document.querySelector('button.search');
searchBtn.addEventListener('click', async function search() {
	const input = document.querySelector('input#search');

	const data = await weather.getForecastData(input.value); // Get data
	dom.updateCurrentLocation(data); // Display Data
	dom.updateWeekForecast(data, 'f'); // Display weeks Data

	console.log(data); // TEMP

	input.value = ''; // Clear Input
});
