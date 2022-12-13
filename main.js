import {state} from "./js/components/stateManagement.js";

const body = document.querySelector("body");
const modal = document.querySelector(".modalContainer");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const survey = document.querySelector(".survey");
const checklistWeather = document.querySelector(".checklistWeather");
const menu = document.querySelector("#hamburger");

menu.addEventListener("click", (e) => {
  removeHidden();
  survey.style.display = "none";
  checklistWeather.style.display = "block";  
});

const btn = document.querySelector(".submit");
btn.addEventListener("click", async (e) => {
  // e.preventDefault();    
  removeHidden();
  checklistWeather.style.display = "none";
  survey.style.display = "block";
  const cards = survey.querySelector('question-cards').shadowRoot.querySelector('.container').childNodes;

  if(cards.length >= 1){
    cards.item(0).style.display = "flex"; 
    survey.style.height = "max-content";

    for (let i = 1; i < cards.length; i++) {
      const card = cards.item(i);
      card.style.display = "none";    
    }
  }
  
  const KEY_VC = import.meta.env.VITE_VISUALCROSSING_KEY;

  const startDate = document.getElementById("whenFrom").value;
  const endDate = document.getElementById("whenTo").value;
  const destInputVal = document.getElementById("autocomplete").value;

  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destInputVal}/${startDate}/${endDate}?iconSet=icons2&unitGroup=us&key=${KEY_VC}&contentType=json`;  

  const response = await fetch(URL);
  const data = await response.json();  

  state.manager.newWeatherForecasts(data);
});

closeModal.addEventListener("click", () => {
  addHidden();
});

const removeHidden = function () {  
  body.classList.add("noscroll")

  modal.classList.remove("hidden");
  modal.classList.add("showModal");
  
  overlay.classList.remove("hidden");
  overlay.classList.add("showOverlay");
};

const addHidden = function () {
  body.classList.remove("noscroll")

  modal.classList.remove("showModal");
  modal.classList.add("hidden");

  overlay.classList.remove("showOverlay");
  overlay.classList.add("hidden");
};
