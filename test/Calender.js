const now = new Date();
const clock = document.querySelector('.clock');

const today = {
   year: now.getFullYear(),
   date: now.getDate(),
   month: now.toLocaleString('en-US',{month: "short"}),
   day: now.toLocaleString('en-US',{weekday: 'short'}),
};


for(let key in today){
   document.getElementById(key).textContent = today[key];
}


function getTime() {
   const chtime = new Date();
   const hour = chtime.getHours();
   const minutes = chtime.getMinutes();
   const seconds = chtime.getSeconds();
   clock.innerHTML = `${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds}`
   
}

setInterval(getTime, 1000);