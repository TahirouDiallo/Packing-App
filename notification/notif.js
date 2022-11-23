const notifyMe = () => {
    if (!window.Notification) {
      console.log('Browser does not support notifications.')
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        // show notification here
        const notify = new Notification('Checklist Reminder', {
            body: `Don't forget check your Checklist!`,
            icon: 'checklist.PNG',
        })
      } else {
        // request permission from the user
        Notification.requestPermission()
          .then(function (p) {
            if (p === 'granted') {
              // show notification here
              const notify = new Notification('Checklist Reminder', {
                body: `Don't forget check your Checklist!`,
                icon: 'checklist.PNG',
              })
            } else {
              console.log('User has blocked notifications.')
            }
          })
          .catch(function (err) {
            console.error(err)
          })
      }
    }
    setInterval(notifyMe, 300000);
    //Not currently working
    notify.onclick = () => {
        //Opens in new tab ✔
        // window.open('https://www.youtube.com/')
    
        //Opens in same tab ✔
        // window.location.href= "./checklist.html";
    
    }
  }








// // Task:
// // - Change button to connect to the notification button on the menu from the homepage

// let button = document.querySelector('button');
// // const dts = Math.floor(Date('November 2, 2022 12:16:00'));

// button.addEventListener('click', () => {

//     if(!window.Notification) return;

//     //Defualt
//     // console.log(Notification.permission);


//     //Requet Permission ✔
//     Notification
//     .requestPermission()
//     .then(showNotification)
// })

// // button.addEventListener('click', () => {
// // console.log(notification.body);
// // setInterval(showNotification,5000);
// // })



// function showNotification(permission){


// if(permission !== 'granted') return;

// //Notification Details ✔
// //notification on checklist items

// let notification = new Notification('Checklist Reminder', {
   
//     body: `Don't forget check your Checklist!`,
//     icon: 'checklist.PNG',
//     // timestamp: dts
//     // renotify: true,

// })

// //Onclick to a website when notification is clicked ✔

// notification.onclick = () => {
//     //Opens in new tab ✔
//     // window.open('./checklist.html')

//     //Opens in same tab ✔
//     window.location.href= "checklist.html";

// }
// }