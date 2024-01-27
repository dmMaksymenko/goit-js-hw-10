'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

function showNotification(state, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            color: 'green',
          })
        );
      } else {
        reject(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            color: 'red',
          })
        );
      }
    }, delay);
  });
  promise
    .then(success => {
      return success;
    })
    .catch(error => {
      return error;
    });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = parseInt(form.delay.value);
  const state = form.state.value;

  if (isNaN(delay) || delay <= 0) {
    iziToast.show({
      message: 'Please enter a valid delay in milliseconds!',
      icon: 'ico-error',
      position: 'topRight',
      color: 'red',
    });
    return;
  }
  showNotification(state, delay);
  form.reset();
});
