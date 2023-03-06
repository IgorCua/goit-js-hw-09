'use strict'
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', colorsWitcher);
stopBtn.addEventListener('click', stopInterval);

let timer = -1;

function colorsWitcher(event){
    startBtn.disabled = true;
    timer = setInterval(()=>{
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopInterval(event){
    clearInterval(timer);
    startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}