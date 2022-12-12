export const template = document.createElement("template");
template.innerHTML = `
<style>
*{
  margin: 5px;
  padding: 0; 
  box-sizing:  border-box;
}


.card-title{
  color: black;
  font-size: 2em;
  line-height: 2;
}

.card-body{
  background: #fff;
  border: .5px solid black; 
  border-radius: 10px;
  margin: 20px;
  opacity: .80;
  padding: 20px; 
  box-shadow: 5px 10px #888888;
  width: 100%;
  max-width: 420px;
  gutter: 30px;
}

 .weather--info{
  font-size: 1.2em;
  line-height: 1.5;
  color: black;
}

.text-muted{
  color: black;
  text-align: center;
}


.card-text{
  font-size: 1.2em;
  line-height: 1.5;
  color: black;
}

#img{
margin-left: auto;
margin-right: auto;
width:20%;

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

export class DailyForecast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["date", "temp", "img"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (oldVal === newVal) return;

    if (prop === "date") {
      if (this.date) {
        this.date.textContent = newVal;
      }
    }

    if (prop === "temp") {
      if (this.temp) {
        this.temp.textContent = newVal;
      }
    }

    if (prop === "img") {
      if (this.img) {
        this.img.src = newVal;
      }
    }
  }

  //This is where you connect the shadowRoot (template dets) to the custom element. UX input to custom element is not done here!!
  connectedCallback() {
    //IMP: The ShadowRoot is being used here which means your connecting to the elements in your TEMPLATE
    // this.location = this.shadowRoot.querySelector('#location');
    this.date = this.shadowRoot.querySelector("#date");
    this.temp = this.shadowRoot.querySelector("#temp");
    this.img = this.shadowRoot.querySelector("#img");
  }
}
