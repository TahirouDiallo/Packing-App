const survey = document.querySelector(".survey");
const end = document.querySelector(".end");
const questions = [
  {
  question: 'What is the occassion for your travel?',
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
            <ul class="option"></ul>        
        `;

        card.classList.add('question');

        const options = card.querySelector('.option');
        q.options.forEach(option => {
          const o = document.createElement('li');
          o.innerHTML = option;
          options.append(o);   
        });             

        options.addEventListener("click", function(e) {                        
          let parent = e.target.parentNode.parentNode; //getBoundingClientRect          
          parent.style.display = "none"; //hide
          if(!parent.nextSibling) {
            survey.style.height = '0px';    
            return;
          };                        
          parent.nextSibling.style.display = "block"; //show              
          survey.style.height = parent.nextSibling.offsetHeight + 'px';    
        }); 
        
        this.container.append(card);
      });
  }
}


if (customElements.get('question-cards') === undefined) {
    customElements.define('question-cards', Questions);
}