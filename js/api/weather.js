import { weatherDate } from "../suppComponents/calendarCal";
import { showWeatherImg } from "../suppComponents/dailyForecastImg";


const KEY_VC = import.meta.env.VITE_VISUALCROSSING_KEY;


//WeatherAPI Function connects input to fetch
      export async function weatherApi(destInputVal,startDate, endDate) {
  
  // Visual Crossing API - 15 Day Forecast:
      const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destInputVal}/${startDate}/${endDate}?iconSet=icons2&unitGroup=us&key=${KEY_VC}&contentType=json`;  

  console.log(URL)

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);

  const showWeatherDets = function () {
    const { address, description } = data;

    for (let i = 0; i < data.days.length; i++) {
      console.log(data.days.length);
      const {datetime, temp, icon, description, humidity} = data.days[i];
      console.log(icon)
      
    console.log(address, description);

    //Connecting Custom element with Weather API data
    const dailyForecastCont = document.createElement('div');
    const custEl = document.createElement('weather-api');
    const weatherBox = dailyForecastCont.appendChild(custEl);
    
    const form = document.getElementById('form');
    form.after(weatherBox);
    const wd = weatherDate(datetime); 
    console.log(wd)
    custEl.setAttribute('location', address);
    // custEl.setAttribute('date', `${datetime} ${weatherDate(datetime)}` );
    custEl.setAttribute('date', wd );
    custEl.setAttribute('temp', `${temp}°`);

   showWeatherImg(icon, custEl);
    
    custEl.setAttribute('description', description);
    custEl.setAttribute('humidity', humidity);
    
    };
    
  };

  showWeatherDets();
  
}
