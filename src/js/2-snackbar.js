'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

function showNotification(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
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

  showNotification(state, delay)
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: 'green',
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: 'red',
      });
    });
  form.reset();
});
