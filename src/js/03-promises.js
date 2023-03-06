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

function submit(event){
  event.preventDefault();
  console.log(event);
  console.log(event.target.elements.amount.value);
  console.log(event.target.elements.delay.value);
  console.log(event.target.elements.step.value);
}
// createPromise(2, 1000)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

function formData(event){
  event.preventDefault();
  const elements = event.target.elements;
  let miliseconds = +elements.delay.value;

  for(let i = 1; i <= elements.amount.value; i++){
    if(i !== 1) miliseconds += +elements.step.value, 10;
    console.log(miliseconds)
    createPromise(i, miliseconds)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}