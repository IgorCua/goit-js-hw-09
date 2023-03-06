const form = document.querySelector('.form');
form.addEventListener('submit', formData);

function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay})
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}

function formData(event){
  event.preventDefault();
  const elements = event.target.elements;
  let miliseconds = +elements.delay.value;

  for(let i = 1; i <= elements.amount.value; i++){
    createPromise(i, miliseconds)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    miliseconds += +elements.step.value;
  }
}