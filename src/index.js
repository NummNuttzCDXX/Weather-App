/* Weather App
Powered by Weather API */

import {dom} from './dom.js';

// Show data on Search bar enter
const searchBar = document.querySelector('input#search');
searchBar.addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		dom.search(searchBar.value);
		searchBar.value = '';
	}
});

// Update units on button click
const unitBtn = document.querySelector('button#unit');
unitBtn.addEventListener('click', dom.updateUnits);

// Page Loads with default data
dom.search('anaheim california');
