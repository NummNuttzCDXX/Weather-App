/* Weather App
Powered by Weather API */

import {dom} from './dom.js';

let currentLocation = 'Anaheim, California';

// Show data on Search bar enter
const searchBar = document.querySelector('input#search');
searchBar.addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		currentLocation = searchBar.value;
		dom.search(searchBar.value);
		searchBar.value = '';
	}
});

// Update units on button click
const unitBtn = document.querySelector('button#unit');
unitBtn.addEventListener('click', dom.updateUnits);

// Listen for `#forecast .day` click to load that days data
const days = Array.from(document.querySelectorAll('#forecast .day'));
/* Iterate through `.day`s & through `days` array in `data` */
for (let i = 0; i < days.length; i++) {
	const day = days[i]; // Get the day
	day.addEventListener('click', () => {
		const unit = unitBtn.textContent.slice(0, 1);
		dom.loadDayData(currentLocation, i, unit);
	});
}

// Page Loads with default data
dom.search('anaheim california');
