import { WeatherApi } from "./js/components/weatherComp.js";
import { weatherApi } from "./js/api/weather.js";
import { DailyForecast } from "./js/components/dailyForecastComp.js";
// import { forecastApi } from './js/api/fetchData.js';

// Destination Inputed and connected to fetch
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const btn = document.querySelector(".submit");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const startDate = document.getElementById("whenFrom").value;
  const endDate = document.getElementById("whenTo").value;
  const destInputVal = document.getElementById("autocomplete").value;

  console.log(startDate);
  console.log(endDate);
  console.log(destInputVal);

  weatherApi(destInputVal, startDate, endDate);
  // forecastApi.fetchWeather(destInputVal, startDate, endDate);

  //Enable Weather Custom Component:
  // window.customElements.define('weather-api', WeatherApi);
  window.customElements.define("daily-forecast", DailyForecast);

  removeHidden();
});

closeModal.addEventListener("click", () => {
  addHidden();
});

const removeHidden = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const addHidden = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
