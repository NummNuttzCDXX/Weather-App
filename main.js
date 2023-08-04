/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   weather: () => (/* binding */ weather)\n/* harmony export */ });\n// API Module\r\n\r\n/* This is the basic API URL\r\nConcat Location to end (Plus any optional parameters in docs) */\r\n\r\nconst weather = (() => {\r\n\t// Get Current Weather at Location data\r\n\tconst getCurrentLocationData = async (location = '') => {\r\n\t\tconst api = 'https://api.weatherapi.com/v1/current.json?key=fc056cba0c074a5888d30500230308&q=';\r\n\t\t// Fetch Data\r\n\t\tconst request = await fetch(api + location, {mode: 'cors'});\r\n\r\n\t\t// Parse Data\r\n\t\tconst data = await request.json();\r\n\r\n\t\tconsole.log(data);\r\n\r\n\t\t/* `data` will be JS Obj\r\n\t\tHolds all Current Weather Data for the given location */\r\n\t\treturn process.currentData(data);\r\n\t};\r\n\r\n\t/* Nested Module for processing different Data Objects\r\n\tFor organization */\r\n\tconst process = (() => {\r\n\t\tconst currentData = (data = {}) => {\r\n\t\t\treturn {\r\n\t\t\t\tlocation: {\r\n\t\t\t\t\tname: data.location.name,\r\n\t\t\t\t\tregion: data.location.region,\r\n\t\t\t\t\tcountry: data.location.country,\r\n\t\t\t\t\ttimezone: data.location.tz_id,\r\n\t\t\t\t\tlocalTime: data.location.localtime, // Needs to be formatted - datefns\r\n\t\t\t\t},\r\n\t\t\t\ttemp_f: data.current.temp_f,\r\n\t\t\t\ttemp_c: data.current.temp_c,\r\n\t\t\t\tfeelsLike_f: data.current.feelslike_f,\r\n\t\t\t\tfeelsLike_c: data.current.feelslike_c,\r\n\t\t\t\thumidity: data.current.humidity,\r\n\t\t\t\tlast_updated: data.current.last_updated,\r\n\t\t\t\twind: {\r\n\t\t\t\t\tdirection: data.current.wind_dir,\r\n\t\t\t\t\tspeed_mph: data.current.wind_mph,\r\n\t\t\t\t\tspeed_kph: data.current.wind_kph,\r\n\t\t\t\t},\r\n\t\t\t\tcondition: data.current.condition,\r\n\t\t\t};\r\n\t\t};\r\n\r\n\t\treturn {currentData};\r\n\t})();\r\n\r\n\treturn {getCurrentLocationData};\r\n})();\r\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dom: () => (/* binding */ dom)\n/* harmony export */ });\n// Dom Manipulation Module\r\n\r\nconst dom = (() => {\r\n\tconst updateCurrentLocation = (data) => {\r\n\t\t// Heading\r\n\t\tconst header = document.querySelector('.current-header.weather-current');\r\n\t\theader.textContent = data.location.name;\r\n\r\n\t\t// Current Temp\r\n\t\tconst currentTemp = document.querySelector('#current-temp');\r\n\t\tcurrentTemp.textContent = data.temp_f;\r\n\r\n\t\t// Condition\r\n\t\tconst condition = document.querySelector('#condition.weather-current');\r\n\t\tcondition.textContent = data.condition.text;\r\n\t};\r\n\r\n\treturn {updateCurrentLocation};\r\n})();\r\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* Weather App\r\nPowered by Weather API */\r\n\r\n\r\n\r\n\r\n// Show data on Search btn click\r\nconst searchBtn = document.querySelector('button.search');\r\nsearchBtn.addEventListener('click', async function search() {\r\n\tconst input = document.querySelector('input#search').value;\r\n\r\n\tconst data = await _api_js__WEBPACK_IMPORTED_MODULE_0__.weather.getCurrentLocationData(input);\r\n\t_dom_js__WEBPACK_IMPORTED_MODULE_1__.dom.updateCurrentLocation(data);\r\n});\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;