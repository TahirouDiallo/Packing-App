let button = document.querySelector('button');
const dts = Math.floor(Date('November 2, 2022 12:16:00'));

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


if(permission !== 'granted') return;

//Notification Details ✔
//notification on checklist items

let notification = new Notification('Checklist Reminder', {
    //Add checklist item ID v
    // body: "Don't forget your passsport",
    //v Doesn't work
    body: `Don't forget check your Checklist!`,
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