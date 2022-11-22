//Test slider value:

// const totTravelSlider = document.getElementById('traveldays');
// const sliderOutput = document.getElementById('sliderOutput');
// export const totTravelVal = document.getElementById('traveldays').value;

// totTravelSlider.textContent = `Value: ${totTravelVal}`;

// totTravelSlider.oninput = function () {
//   sliderOutput.innerHTML = `Value: ${this.value}`;
// };


// let weatherImgArr = ['clear-day', 'clear-night', 'cloudy', 'fog', 'hail', 'partly-cloudy-day', 'partly-cloudy-night', 'rain-snow-showers-day']; 

// // for(let i = 0; i< weatherImgArr.length -1; i++){
// //   console.log(weatherImgArr.length)
// //   console.log(weatherImgArr[i]);

// // }

// weatherImgArr.forEach()

export const showWeatherImg = function(icon, custEl){

  if(icon === 'partly-cloudy-day'){
    let icon = 'public/img/SVG/1stSet_Color/partly-cloudy-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'clear-day' ){
    let icon = 'public/img/SVG/1stSet_Color/clear-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'clear-night' ){
    let icon = 'public/img/SVG/1stSet_Color/clear-night.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'cloudy' ){
    let icon = 'public/img/SVG/1stSet_Color/cloudy.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'fog' ){
    let icon = 'public/img/SVG/1stSet_Color/fog.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'hail' ){
    let icon = 'public/img/SVG/1stSet_Color/hail.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'partly-cloudy-night' ){
    let icon = 'public/img/SVG/1stSet_Color/partly-cloudy-night.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'rain-snow-showers-day' ){
    let icon = 'public/img/SVG/1stSet_Color/rain-snow-showers-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'rain-snow-showers-night' ){
    let icon = 'public/img/SVG/1stSet_Color/rain-snow-showers-night.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'rain-snow' ){
    let icon = 'public/img/SVG/1stSet_Color/rain-snow.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'rain' ){
    let icon = 'public/img/SVG/1stSet_Color/rain.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'showers-day' ){
    let icon = 'public/img/SVG/1stSet_Color/showers-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'showers-night' ){
    let icon = 'public/img/SVG/1stSet_Color/showers-night.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'sleet' ){
    let icon = 'public/img/SVG/1stSet_Color/sleet.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'snow-showers-day' ){
    let icon = 'public/img/SVG/1stSet_Color/snow-showers-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'snow' ){
    let icon = 'public/img/SVG/1stSet_Color/snow.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'thunder-rain' ){
    let icon = 'public/img/SVG/1stSet_Color/thunder-rain.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'thunder-showers-day' ){
    let icon = 'public/img/SVG/1stSet_Color/thunder-showers-day.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'thunder-showers-night' ){
    let icon = 'public/img/SVG/1stSet_Color/thunder-showers-night.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'thunder' ){
    let icon = 'public/img/SVG/1stSet_Color/thunder.svg';
    custEl.setAttribute('img', icon);
  }else if(icon === 'wind' ){
    let icon = 'public/img/SVG/1stSet_Color/wind.svg';
    custEl.setAttribute('img', icon);
  }
        }

// let weekDaysArr = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// let monthsArr = ['January', 'February','April','May','June','July','','','','','','']


