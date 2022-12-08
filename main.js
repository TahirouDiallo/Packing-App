import { WeatherApi } from "./js/components/weatherComp.js";
import { weatherApi } from "./js/api/weather.js";
import { DailyForecast } from "./js/components/dailyForecastComp.js";
// import { forecastApi } from './js/api/fetchData.js';

// Destination Inputed and connected to fetch
// const modalToggle = document.getElementById('exampleModal');
// const myModal = new bootstrap.Modal(modalToggle, {});

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
  // modal.style.display = 'block';
  // overlay.style.display = 'block';

  //myModal.toggle(modalToggle)
  //Replace page with weather api
  // location.replace("http://localhost:5173/index_test2.html")
  // window.location.href = "http://www.w3schools.com";
  // window.location.assign("index_test2.html")
  // window.open('file:///F:/dl/VSCodeProjects/Packing-App-testMerge11_9/Packing-App-testMerge/index_test.html', "_blank");

  // location.href ="/index_test2.html";
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
