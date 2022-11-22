let button = document.querySelector('button');
const dts = Math.floor(Date('November 2, 2022 12:16:00'));
let list_item = document.getElementById("checklist-item1");


// list_item.appendChild(body)


//Look up different Event Listeners
//Maybe a timed one, on open, 
button.addEventListener('click', () => {

    if(!window.Notification) return;

    //Defualt
    // console.log(Notification.permission);


    //Requet Permission ✔
    Notification
    .requestPermission()
    .then(showNotification)
})


function showNotification(permission){

    const ul = document.getElementById('testing_el').innerHTML;
    // const listItems = ul.getElementsByTagName('h2');

        console.log(ul);

    // Loop through the NodeList object.
    // for (let i = 0; i <= listItems.length - 1; i++) {
    //     console.log (listItems[i]);
    // }


// let list_item = document.getElementById('list').document.getElementsByTagName('li'); 

// console.log(list_item);
// for (let i = 0; i <= list_item.length -1; i++) {
//     console.log(list_item[i]);
// }

if(permission !== 'granted') return;

//Notification Details ✔
//notification on checklist items

let notification = new Notification('Checklist Reminder', {
    //Add checklist item ID v
    // body: "Don't forget your passsport",
    //v Doesn't work
    body: `Don't forget ${ul}`,
    //Icon shoul be website logo
    icon: 'checklist.PNG',
    timestamp: dts
})

console.log(list_item)
//Onclick to a website when notification is clicked ✔

notification.onclick = () => {
    //Opens in new tab ✔
    // window.open('https://youtube.com')

    //Opens in same tab ✔
    window.location.href= ""

}
}