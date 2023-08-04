// Dom Manipulation Module

export const dom = (() => {
	const updateCurrentLocation = (data) => {
		// Heading
		const header = document.querySelector('.current-header.weather-current');
		header.textContent = data.location.name;

		// Current Temp
		const currentTemp = document.querySelector('#current-temp');
		currentTemp.textContent = data.temp_f;

		// Condition
		const condition = document.querySelector('#condition.weather-current');
		condition.textContent = data.condition.text;
	};

	return {updateCurrentLocation};
})();
