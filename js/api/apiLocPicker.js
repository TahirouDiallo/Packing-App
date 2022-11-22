const weather = require('./weather.js');

// Api Location:

let autocomplete; 

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types:[], 
      componentRestrictions: {'country': ['US']},
      fields: ['geometry', 'name'],
      
    });

    autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged(){
  var place = autocomplete.getPlace(); 
 
var lat = place.geometry.location.lat(),
    lng = place.geometry.location.lng();

console.log(lat);
console.log(lng);
 
weather.weatherApi(lat, lng);

  if(!place.geometry){
    document.getElementById('autocomplete').placeholder = 'Enter a place'; 
  } else {
    document.getElementById('details').innerHTML = place.name;
  }

}
