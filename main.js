import { weatherApi } from "./js/api/weather.js";
import { DailyForecast } from "./js/components/dailyForecastComp.js";

// Destination Inputed and connected to fetch
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const btn = document.querySelector(".submit");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const startDate = document.getElementById("whenFrom").value;
  const endDate = document.getElementById("whenTo").value;
  const destInputVal = document.getElementById("autocomplete").value;

  // console.log(startDate);
  // console.log(endDate);
  // console.log(destInputVal);

  weatherApi(destInputVal, startDate, endDate);

  //Enable Weather Custom Component:
  window.customElements.define("daily-forecast", DailyForecast);

  //Display Modal after btn click:
  removeHidden();

  // if(document.)

  // if (document.querySelector(".survey")) {
  //   document.querySelector("#modalTwo").style.display = "block";
  // }
  // if (!document.querySelector(".survey")) {
  //   document.querySelector("#modalTwo").style.display = "block";
  // }

  /* if modal contains survey && if modal contains modal two 
  then display = none for modaltwo 
  else if modal only contains modaltwo
  then display = block for modaltwo

  other option: 

  if option 3 is selected then display = block for modaltwo 
  and 
*/
  // const optionThree = document.querySelectorAll(".option3");
  // const li = document.querySelectorAll("li");

  let list = document.querySelector(".option3").getElementsByTagName("li");

  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    console.log(element);

    if (element.checked) {
      console.log("guess who");
      // document.querySelector(".survey").classList.toggle("hidden");
      // document.querySelector("#modalTwo").style.display = "block";
      // console.log("guess where");
    }
  }

  // console.log(element.selected);
  // const w = (document.querySelector("#modalTwo").style.display = "none");
});

//Closes the Modal and toggle hidden attribute:
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
