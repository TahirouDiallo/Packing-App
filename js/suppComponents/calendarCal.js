export const weatherDate = function(date){
    
   let now = new Date(date).toLocaleDateString('en-us', 
    { weekday:"long", month:"long", day:"numeric"});
    console.log(now)

    return now;
    
}
