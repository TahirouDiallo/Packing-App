const KEY = import.meta.env.VITE_OPENWEATHER_KEY;


export let forecast = {

    weatherApi: async function(destInputVal){
    const URL= `http://api.openweathermap.org/geo/1.0/direct?q=${destInputVal}&limit=5&exclude=minutely,hourly&appid=${KEY}`;


    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    },

    showWeatherDets: function(){
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
    // const custEl = document.querySelector('weather-api');
    const form = document.getElementById('form');
    form.after(weatherBox);

    custEl.setAttribute('location', address);
    custEl.setAttribute('date', `${datetime} ${weatherDate(datetime)}` );
    custEl.setAttribute('temp', `${temp}°`);
    custEl.setAttribute(
      'img',
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    custEl.setAttribute('description', description);
    custEl.setAttribute('humidity', humidity);
    }
}
}; 

forecast.weatherApi();

console.log(forecast.weatherApi()); 
console.log(forecast.showWeatherDets()); 