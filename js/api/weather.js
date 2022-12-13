import { weatherDate } from "../suppComponents/calendarCal";
import { showWeatherImg } from "../suppComponents/dailyForecastImg";
import {state} from "../components/stateManagement.js";

class WeatherAPI extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({mode: 'open'});   

    const template = document.getElementById('template-weather-api');
    const node = document.importNode(template.content, true);
    shadow.append(node);

    this.container = this.shadowRoot.querySelector('.container');    
    this.slideshow = this.shadowRoot.querySelector('.slideshow-container');       
    this.dots = this.shadowRoot.querySelector('.dots');   

    this.slideIndex = 1;
  }

  // Observe selected attribute for changes
  static get observedAttributes() {
    return ['data'];
  }

  connectedCallback() {
    state.manager.subscribe((state) => {
      this.setAttribute('data', state.data);                                   
    });    
  }

  // Do something when attribute changes
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (property === 'data') {              
      
      state.manager.database.then(function(db) {
        const tx = db.transaction(['weather'], 'readwrite');
        const store = tx.objectStore('weather');
        
        return store.getAll();      
      }).then((allRecords) => {        
        console.log('Forecasts Retrieved Successfully.');        
        this.slideshow.textContent = '';

        allRecords.forEach((info) => {
          this.setForecast(info);
        });     

        this.setNextPrev();
        this.setDots(allRecords);       
        this.updateSlides(this.slideIndex); 
      });            
    }
  } 

  setForecast(info){    
    const slide = document.createElement("div");   
    slide.classList.add("mySlides");
    slide.classList.add("fade");   

    const forecast = document.createElement('daily-forecast');      
    forecast.setAttribute('location', info.location);
    forecast.setAttribute('date', weatherDate(info.date));
    forecast.setAttribute('temp', info.temp);       
    showWeatherImg(info.icon, forecast);

    slide.appendChild(forecast);

    this.slideshow.append(slide);    
  }   

  setNextPrev(){
    const prev = document.createElement('a');
    prev.innerHTML = `&#10094;`;
    prev.classList.add('prev');    
    prev.addEventListener('click', () => this.plusSlides(-1));

    const next = document.createElement('a');
    next.innerHTML = `&#10095;`;
    next.classList.add('next');    
    next.addEventListener('click', () => this.plusSlides(1));

    this.slideshow.append(prev);  
    this.slideshow.append(next);  
  }

  setDots(days){       
    this.dots.innerHTML = '';

    for (let i = 0; i < days.length; i++) {     
      this.dots.innerHTML += `<span class="dot"></span>`;
    }
    
    const allDots = this.dots.querySelectorAll('.dot');
    allDots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.currentSlide(index+1));    
    });    
  }     

  // Next/previous controls
  plusSlides(n) {
    this.updateSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.updateSlides(this.slideIndex = n);
  }

  updateSlides(n) {   
    let i;
    let slides = this.slideshow.getElementsByClassName("mySlides");
    let dots = this.dots.getElementsByClassName("dot");  

    if (slides.length == 0 || dots.length == 0) return;
    
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }
}

class DailyForecast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  //This is where you connect the shadowRoot (template dets) to the custom element. UX input to custom element is not done here!!
  connectedCallback() {
    //IMP: The ShadowRoot is being used here which means your connecting to the elements in your TEMPLATE
    // this.location = this.shadowRoot.querySelector('#location');
    const date = this.shadowRoot.querySelector("#date");
    const temp = this.shadowRoot.querySelector("#temp");
    const img = this.shadowRoot.querySelector("#img");

    date.textContent = this.getAttribute('date');
    temp.textContent = this.getAttribute('temp');
    img.src = this.getAttribute('img');
  }
}

export const template = document.createElement("template");

template.innerHTML = `
<style>
#container{  
  font-family: "Ubuntu", sans-serif;
}
*{
  
  padding: 0; 
  box-sizing:  border-box;
}
.card-title{
  color: black;
  font-size: 2em;  
}
.card-body{
  background: #fff;
  // border: .5px solid black; 
  border-radius: 10px;  
  opacity: .80;
  padding: 20px; 
  // box-shadow: 5px 10px #888888;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
  width: 330px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
 .weather--info{  
  font-size: 1.2em;  
  color: black;
}
.text-muted{
  color: black;
  text-align: center;
}
.card-text{
  font-size: 1.2em;  
  color: black;
}

#temp{
  font-weight: bold;
  font-size: 50px;
  font-style: italic;
}

#img{
  width: 50px;
}
</style> 
<div class="row g-0" id="container">
   <div class="col-md-8">
    <div class="card-body">
      <p class="card-text"><span class="weather--info" id="date"> </span></p>
      <p class="card-text"><span class="weather--info" id="img-holder"><img id="img"> </span></p>
      <p class="card-text"><span class="weather--info" id="temp"></span></p>
    </div>
  </div>
</div>
`;

if (customElements.get('weather-api') === undefined) {
    customElements.define('weather-api', WeatherAPI);
}

if (customElements.get('daily-forecast') === undefined) {
    customElements.define('daily-forecast', DailyForecast);
}
