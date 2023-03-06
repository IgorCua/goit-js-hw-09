import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let globalSelectedDate = 0;
let timerId = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedTime = selectedDates[0].getTime();
        const defaultTime = options.defaultDate.getTime();
        const addedLeadingZero = addLeadingZero(convertMs(selectedTime - defaultTime));
        globalSelectedDate = selectedTime;
        console.log(defaultTime)
        if(selectedTime < options.defaultDate){
            startBtn.disabled = true;
            clearInterval(timerId);
            alert("Please choose a date in the future");
            return;
        } else {
            startBtn.disabled = false;
            
            daysElement.innerText = addedLeadingZero.days;
            hoursElement.innerText = addedLeadingZero.hours;
            minutesElement.innerText = addedLeadingZero.minutes;
            secondsElement.innerText = addedLeadingZero.seconds;
            
            // clearInterval(timerId);
        }
    },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', ()=>{
   timerId = setInterval(timeCounter, 1000);
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }
  
function addLeadingZero(value){
    let obj = {};
    for(const key in value){
        obj[key] = value[key].toString().length === 1 ? value[key].toString().padStart(2, '0') : value[key].toString();
    }
    return obj;
}

function timeCounter(){
    const date = new Date();
    let selectedDate = globalSelectedDate;
    let obj = addLeadingZero(convertMs(selectedDate - date));

    if(selectedDate - date < 0){
        clearInterval(timerId);
        return;
    }

    daysElement.innerText = obj.days;
    hoursElement.innerText = obj.hours;
    minutesElement.innerText = obj.minutes;
    secondsElement.innerText = obj.seconds;
}