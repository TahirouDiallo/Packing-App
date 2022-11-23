export const template = document.createElement('template');
template.innerHTML = `
<style>
*{
  margin: 0;
  padding: 0; 
  box-sizing:  border-box;
}

.card-title{
  color: White;
  font-size: 2em;
  line-height: 2;
}

.card-body{
  background: #000000d0;
  border: 1px solid black; 
  border-radius: 10px;
  margin: 5px;
  opacity: .75;
  padding: 20px; 
  box-shadow: 5px 10px #888888;
  width: 100%;
  max-width: 420px;
}

 .weather--info{
  font-size: 1.1em;
  line-height: 1.5;
  color: White;
}

.text-muted{
  color: White;
  text-align: center;
}


.card-text{
  font-size: 1.3em;
  line-height: 1.5;
  color: White;
}

#img{
margin-left: auto;
margin-right: auto;
height: 100px;
width:100px;
}

#img-holder{
  display:flex;
  
}


</style> 

<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
    <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">Weather in <span id="location"></span> </h5>
      <p class="card-text">Date: <span class="weather--info" id="date"></span></p>
      <p class="card-text">Current Temperature: <span class="weather--info" id="temp"></span></p>
      <p class="card-text"><span class="weather--info" id="img-holder"><img id="img"> </span></p>
      <p class="card-text">Feels Like: <span class="weather--info" id="desc"> </span></p>
      <p class="card-text">Humidity: <span class="weather--info" id="hum"> </span></p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>`;

export class WeatherApi extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['location', 'date', 'temp', 'description', 'humidity', 'img'];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (prop === 'location') {
      if (this.location) {
        this.location.textContent = newVal;
      }
    }

        if (prop === 'date') {
      if (this.date) {
        this.date.textContent = newVal;
      }
    }

    if (prop === 'temp') {
      if (this.temp) {
        this.temp.textContent = newVal;
      }
    }
    if (prop === 'description') {
      if (this.description) {
        this.description.textContent = newVal;
      }
    }

    if (prop === 'humidity') {
      if (this.humidity) {
        this.humidity.textContent = newVal;
      }
    }

    if (prop === 'img') {
      if (this.img) {
        this.img.src = newVal;
      }
    }
  }

  //This is where you connect the shadowRoot (template dets) to the custom element. UX input to custom element is not done here!!
  connectedCallback() {
    //IMP: The ShadowRoot is being used here which means your connecting to the elements in your TEMPLATE
    this.location = this.shadowRoot.querySelector('#location');
    this.date = this.shadowRoot.querySelector('#date');
    this.temp = this.shadowRoot.querySelector('#temp');
    this.description = this.shadowRoot.querySelector('#desc');
    this.humidity = this.shadowRoot.querySelector('#hum');
    this.img = this.shadowRoot.querySelector('#img');

    console.log(this.img);
  }
}
