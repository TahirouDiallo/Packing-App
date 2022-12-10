import {openDB} from 'idb'; 

const defaultItems = {
Identification: [
  'passport', 
  'license', 
  'boarding pass', 
  'RFID wallet'
],

Hygiene: [
  'toothbrush',
  'travel size toothpaste',
  'floss',
  'hand sanitizer',
  'tissue',
  'travel size mouthwash',
  'lip balm',
  'lotion',
  'gum',
  'N95 mask',
  'sanitizing wipes',
],

Electronics: [   
  'laptop',  
  'smartphone', 
  'headset/earbuds',
  'AirFly (wireless headphone adapter)',
  'phone charger',
  'laptop charger',
  'universal outlet',
  'ipad',
  'ipad charger',
  'portable charger',
  'portable steamer',
  'portable hard drive',
  'privacy screen reader',
  'portable hotspot',
],

Clothing: [
  'shoe bags',      
  'wrinkle release spray',
  'lint roller',
  'stain remover',
  'plastic collar stays',
  'sewing kit',
],
};

const questionnaireResponses = {  
    Business: [ 
      defaultItems.Identification,           
      defaultItems.Hygiene,
      [
        'business suit/s',
        'laptop',  
        'smartphone', 
        'headset/earbuds',
      ],     
    ],

    Vacation: [
      defaultItems.Identification,           
      defaultItems.Hygiene,
      [
        'towel',
        'bathing suit',
        'sunscreen'
      ],
    ],

    Family: [
      defaultItems.Identification,           
      defaultItems.Hygiene,
      [
        'family gifts',
      ],
    ],  
};

class ChecklistState {
  constructor(init={}) {  
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    this.database = this.connectDB(); 

    const self = this;
    this.subscribers = [];

    this.database.then(async (db) => {
      // Make the database reusable from within the store
      this.db = db;

      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');

      return store.count();
    }).then((count) => {
      if (count > 0) {
        this.set('recordcount', count);
      }
    });

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

  connectDB() {
    return openDB('ChecklistDB', 1, {upgrade(db) {
      if (!db.objectStoreNames.contains('checklist')) {
        console.log('Making Checklist Table...');

        const checklistTable = db.createObjectStore('checklist', {keyPath: 'id', autoIncrement: true});
        checklistTable.createIndex('text', 'text', {unique: true});
        checklistTable.createIndex('checked', 'checked', {unique: false});   
        checklistTable.createIndex('custom', 'custom', {unique: false});                
      }
    }});
  }

  append(newItem, showNotification){   
    this.get('selected').push(newItem);     

    let items = [];           
      
    this.get('selected').forEach(value => {
      if (questionnaireResponses.hasOwnProperty(value)){          
        questionnaireResponses[value].forEach(itemGroup => {
          itemGroup.forEach(item => {
            if(!items.includes(item)){
              items.push(item);
            }
          });
        });            
      }
    });             
    
    this.removeAllNonCustomItems();
    this.addItemsToDatabase(false, items, showNotification);
  }

  appendItem(newItem, showNotification){    
    this.addItemsToDatabase(true, [newItem], showNotification);
  }

  remove(removedItem){   
    let selected = this.get('selected');  
    var indexToBeRemoved = selected.indexOf(removedItem);
    if (indexToBeRemoved !== -1) {
        selected.splice(indexToBeRemoved, 1);
    }              

    let items = [];           
      
    this.get('selected').forEach(value => {
      if (questionnaireResponses.hasOwnProperty(value)){          
        questionnaireResponses[value].forEach(itemGroup => {
          itemGroup.forEach(item => {
            if(!items.includes(item)){
              items.push(item);
            }
          });
        });            
      }
    });                     

    this.removeAllNonCustomItems();
    this.addItemsToDatabase(false, items);    
  }

  removeItemByID(id){                                   
    this.database.then((db) => {
      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');
              
      store.delete(id);     
  
      return store.count();
    }).then((count)=> {      
      console.log('Item deleted.');  
      this.set('selected', this.get('selected'));           
      this.set('recordcount', Math.max(0, count));
    });
  }

  editItemByID(id, text, showNotification){                                   
    this.database.then((db) => {
      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');
              
      store.get(id).then((record)=>{
        record.text = text;
        
        store.put(record);   
      });           
  
      return store.count();
    }).then((count)=> {      
      console.log('Item Edited.');  
      
      this.set('selected', this.get('selected'));    
      this.set('recordcount', 0);       
      this.set('recordcount', Math.max(0, count));
    }).catch(e =>{
      showNotification('Todo exists already!');
    });
  }

  checkItemByID(id, value){                                   
    this.database.then((db) => {
      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');
              
      store.get(id).then((record)=>{
        record.checked = value;
        
        store.put(record);   
      });     
        
      return store.count();
    }).then((count)=> {      
      console.log('Item Checked.');  
      
      this.set('selected', this.get('selected'));    
      this.set('recordcount', 0);       
      this.set('recordcount', Math.max(0, count));
    });
  }

  addItemsToDatabase(isCustom, items, showNotification){
    this.database.then(function(db) {
      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');

      items.forEach(item => {
        const i = {
          text: item,          
          checked: false, 
          custom: isCustom,         
        };

        store.add(i);
      });
      
      return store.count();      
    }).then((count) => {
      console.log('Item Added Successfully.');         
      this.set('recordcount', Math.max(0, count));         
    }).catch(e => {
      showNotification('Todo exists already!');
    });
  }

  removeAllNonCustomItems(){
    this.database.then(function(db) {
      const tx = db.transaction(['checklist'], 'readwrite');
      const store = tx.objectStore('checklist');

      store.getAll().then((allRecords)=>{
        allRecords.forEach((item) => {
          if(!item.custom) store.delete(item.id); 
        });
      });
     
      return store.count();
    }).then((count)=> {      
      console.log('Old Non-Custom Items deleted.');
      this.set('recordcount', Math.max(0, count));
    });
  } 
}

const checklistState = new ChecklistState({recordcount: 0, selected: []});

let state = { checklist: checklistState};
export {state};