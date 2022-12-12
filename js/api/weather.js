import { weatherDate } from "../suppComponents/calendarCal";
import { showWeatherImg } from "../suppComponents/dailyForecastImg";

const KEY_VC = import.meta.env.VITE_VISUALCROSSING_KEY;

//WeatherAPI Function connects input to fetch
export async function weatherApi(destInputVal, startDate, endDate) {
  // Visual Crossing API - 15 Day Forecast:
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destInputVal}/${startDate}/${endDate}?iconSet=icons2&unitGroup=us&key=${KEY_VC}&contentType=json`;

  // console.log(URL);

  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);

  const showWeatherDets = function () {
    const { address, description } = data;

    for (let i = 0; i < data.days.length; i++) {
      // console.log(data.days.length);
      const { datetime, temp, icon, description } = data.days[i];
      // console.log(`HELLO NOTICE ME --->` + data.days[i].datetime);
      // console.log(`check date and time ---->` + datetime);

      // console.log(address, description);

      //Connecting Custom element with Weather API data

      const modalTwo = document.getElementById("modalTwo");
      const custEl = document.createElement("daily-forecast");
      const weatherBox = modalTwo.appendChild(custEl);

      custEl.setAttribute("location", address);
      custEl.setAttribute("date", weatherDate(datetime));
      custEl.setAttribute("temp", `${temp}°`);
      showWeatherImg(icon, custEl);
    }
  };

  showWeatherDets();
}
