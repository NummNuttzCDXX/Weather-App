/* Weather App
Powered by Weather API */

import {weather} from './api.js';
import {dom} from './dom.js';

// Show data on Search btn click
const searchBtn = document.querySelector('button.search');
searchBtn.addEventListener('click', async function search() {
	const input = document.querySelector('input#search').value;

	const data = await weather.getCurrentLocationData(input);
	dom.updateCurrentLocation(data);
});
