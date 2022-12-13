import {state} from "../js/components/stateManagement.js"

const survey = document.querySelector(".survey");
const checklistWeather = document.querySelector(".checklistWeather");

const questions = [
  {
  question: 'What is the occassion of your travel?',
  options: ['Leisure', 'Business', 'Vacation', 'Family']
  },
  {
  question: 'Out of the following options, which one best describes your destination?',
  options: ['Beach', 'Mountain', 'City', 'Forest', 'Restaurant', 'Biking', 'Water Sports', 'Gym']
  },
];

class Questions extends HTMLElement {
   constructor() {
    // Always call super first in constructor
    super();      
    const shadow = this.attachShadow({mode: 'open'});   

    shadow.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
    `;

    const template = document.getElementById('template-question-cards');
    const node = document.importNode(template.content, true);
    shadow.append(node);       

    this.container = this.shadowRoot.querySelector('.container');
  }

  connectedCallback() {    
    questions.forEach(q => {      
        const card = document.createElement('div');
        card.innerHTML = `        
            <h3 id="text">${q.question}</h3>
            <div class="option"></div>  
            <h2 class="nextCard">Next<i class="bi bi-caret-right-fill" style="color: white;"></i></h2>      
        `;

        card.classList.add('question');

        const options = card.querySelector('.option');
        q.options.forEach(option => {
          const input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          input.setAttribute('name', 'purpose');
          input.setAttribute('value', option);
          
          const label = document.createElement('label');
          label.textContent = option;

          const row = document.createElement('div');
          row.classList.add('row');

          row.append(input);   
          row.append(label);  
          options.append(row) ;
        });                   

        this.container.append(card);
    }); 

    this.container.addEventListener('click', (e)=>{
      if(e.target.nodeName === "H2"){
        let parent = e.target.parentNode; //get card                                   

        if(!parent.nextSibling) {               
          parent.style.display = "none"; //hide          
          parent.parentNode.innerHTML += `<thankyou-card></thankyou-card>`;
          const thankyou = this.container.querySelector('thankyou-card');                    
          survey.style.height = thankyou.offsetHeight + 'px';                                                                   
          return;
        };         

        parent.style.display = "none"; //hide        
        parent.nextSibling.style.display = "flex"; //show              
        parent.nextSibling.style.flexDirection = "column"; //show      
        parent.nextSibling.style.alignItems = "center"; //show      
        survey.style.height = parent.nextSibling.offsetHeight + 'px'; 
      }
    });

    const questionForms = this.container.querySelectorAll('.question');
    // const questionForms = survey.querySelector('question-cards').shadowRoot.querySelector('.container').childNodes;

    questionForms.forEach(form => {        
      var listItems = form.getElementsByTagName('input');          

      for (let i = 0; i < listItems.length; i++) {
          listItems[i].addEventListener('change', function() {
              if (this.checked) {                              
                  state.manager.append(this.value);
              } else {                
                  state.manager.remove(this.value);                     
              }
          });        
      }              
    });
  }
}

class ThankYou extends HTMLElement {
   constructor() {
    // Always call super first in constructor
    super();      
    const shadow = this.attachShadow({mode: 'open'});            
  }
  
  connectedCallback() {
    const template = document.getElementById('template-thankyou-card');
    const node = document.importNode(template.content, true);
    this.shadowRoot.append(node);     
    
    const button = this.shadowRoot.querySelector('.checklist');
    button.addEventListener("click", ()=> {
      survey.style.display = "none";
      checklistWeather.style.display = "block";      
    });
    
  }
}

if (customElements.get('question-cards') === undefined) {
    customElements.define('question-cards', Questions);
}

if (customElements.get('thankyou-card') === undefined) {
    customElements.define('thankyou-card', ThankYou);
}