class ChecklistState {
  constructor(init={}) {   
    const self = this;
    this.subscribers = [];

    this.state = new Proxy(init, {
      set(state, key, value) {
        state[key] = value;

        self.subscribers.forEach((subscriber) => subscriber(state));

        // Return true to indicate that the set was successful.
        return true;
      },
    });
  }

  subscribe(cb) {
    if (typeof cb !== 'function') {
      throw new Error('You must subscribe with a function');
    }

    // Add the callback to the list of subscribers
    this.subscribers.push(cb);

    cb(this.state);
  }

  // Provide a way to set a specific value from the state
  set(key, value) {
    this.state[key] = value;
  }

  // Provide a way to get a specific value from the state
  get(key) {
    return this.state[key];
  }

  append(changedValue){   
    this.get('selected').push(changedValue);
    this.set(this.get('selected'));        
  }

  remove(changedValue){   
    let selected = this.get('selected');  
    var indexToBeRemoved = selected.indexOf(changedValue);
    if (indexToBeRemoved !== -1) {
        selected.splice(indexToBeRemoved, 1);
    }      
    
    this.set(selected);
  }
}

const checklistState = new ChecklistState({selected: []});

const form = document.querySelectorAll('form');  

form.forEach(formItem => {        
    var listItems = document.getElementsByName('vehicle');      
    arr = [];

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('change', function() {
            if (this.checked) {                              
                checklistState.append(this.value);
            } else {                
                checklistState.remove(this.value);                     
            }
        });        
    }              
});

class Checklist extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({mode: 'open'});   

    const template = document.getElementById('template-check-list');
    const node = document.importNode(template.content, true);
    shadow.append(node);

    this.checklist = this.shadowRoot.querySelector('#checklist');
  }

  // Observe selected attribute for changes
  static get observedAttributes() {
    return ['selected'];
  }

  connectedCallback() {
    checklistState.subscribe((state) => {
      this.setAttribute('selected', state.selected);                            
    });
  }

  // Change selected  when attribute changes
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (property === 'selected') {                          
        console.log(newValue); 
    }
  }  
}

if (customElements.get('check-list') === undefined) {
    customElements.define('check-list', Checklist);
}

