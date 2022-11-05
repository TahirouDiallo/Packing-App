class ValidateState {
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

  isValid(){
   //...
   return true;
  }
}

const validateState = new ValidateState({date: new Date().toLocaleString().split(",")[0], destination: ''});

//-------------------------------------------------------date calender input...stuff :

let destination = document.getElementById("whenFrom");
destination.setAttribute("min", currDate());
destination.setAttribute("max", maxDate());

function currDate(){
   //yyyy-mm-dd
   let date = new Date().toLocaleString().split(",")[0];     

   return formatDate(date);
}

function maxDate(){
  //yyyy-mm-dd
  let date = currDate();
  let dateSplit = date.split("-");
  date = new Date(Number(dateSplit[0]), Number(dateSplit[1]), Number(dateSplit[2]));
  date.setDate(date.getDate() + 1);// 15 days ahead is max for api  !!

  return formatDate(date.toLocaleDateString());
}

function formatDate(date){    
   let day = date.split("/")[1];
   day = day.length < 2 ? "0".concat(day) : day;
   let month = date.split("/")[0];
   month = month.length < 2 ? "0".concat(month) : month;
   let year = date.split("/")[2];   

   return year.concat("-", month, "-", day);
}

//------------------------------------------------------- api location picker:
$(function() {
   $('#map').locationpicker({
      location: {latitude: 46.15242437752303, longitude: 2.7470703125},   
      radius: 0,
      inputBinding: {
         locationNameInput: $('#autocomplete')
      },
      enableAutocomplete: true,
   }); 
});