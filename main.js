import { WeatherApi } from './js/components/weatherComp.js';
import { weatherApi } from './js/api/weather.js';
import { DailyForecast } from './js/components/dailyForecastComp.js';

// Destination Inputed and connected to fetch
const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const startDate = document.getElementById('whenFrom').value;
  const endDate = document.getElementById('whenTo').value;
  const destInputVal = document.getElementById('autocomplete').value;
   
  console.log(startDate);
  console.log(endDate);
  console.log(destInputVal);
 
  // weatherApi(destInputVal, startDate, endDate);
  weatherApi(destInputVal, startDate, endDate);
 
//Enable Weather Custom Component:
window.customElements.define('weather-api', WeatherApi);
window.customElements.define('daily-forecast', DailyForecast);

});



