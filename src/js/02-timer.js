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
        // const defaultTime = options.defaultDate.getTime();
        if(selectedTime < options.defaultDate){
            startBtn.disabled = true;
            alert("Please choose a date in the future");
            return;
        } else {
            startBtn.disabled = false;
            globalSelectedDate = selectedTime;
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
    return value.toString().padStart(2, '0');
}

function timeCounter(){
    const date = new Date();
    let selectedDate = globalSelectedDate;
    let obj = convertMs(selectedDate - date);

    if(selectedDate - date < 0){
        return;
    }

    daysElement.innerText = addLeadingZero(obj.days);
    hoursElement.innerText = addLeadingZero(obj.hours);
    minutesElement.innerText = addLeadingZero(obj.minutes);
    secondsElement.innerText = addLeadingZero(obj.seconds);
}