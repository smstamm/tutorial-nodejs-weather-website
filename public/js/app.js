// console.log('Client side js file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  message1.textContent = '';
  message2.textContent = 'Loading weather forecast...';

  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
      res.json()
        .then(data => {
          if (data.error) {
            console.log('error 1', data.error);
            return message2.textContent = `Error: ${data.error}`;
          }
          message1.textContent = `Location: ${data.location}`;
          message2.textContent = `Forecast: ${data.forecast}`;
        })
        .catch(error => {
          return message2.textContent = `Error: ${error}`;
        });
    })
    .catch(error => {
      return message2.textContent = `Error: ${error}`;
    });
});