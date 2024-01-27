'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const day = document.querySelector('.value[ data-days]');
const hour = document.querySelector('.value[ data-hours]');
const minute = document.querySelector('.value[ data-minutes]');
const second = document.querySelector('.value[ data-seconds]');
const myInput = document.querySelector('#datetime-picker');
startBtn.disabled = true;
let date = Date.now();
let userSelectedDate;
let difference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < date) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#FF0000',
        position: 'topRight',
        icon: 'ico-error',
      });
    } else {
      startBtn.disabled = false;
      startBtn.style.background = '#4E75FF';
      startBtn.style.color = '#FFF';
    }
  },
};

const fp = flatpickr(myInput, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  difference = userSelectedDate - Date.now();
  const countdownInterval = setInterval(() => {
    difference = userSelectedDate - Date.now();

    if (difference <= 0) {
      clearInterval(countdownInterval);
      startBtn.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(difference);
      day.textContent = `${formatTimeUnit(days)}`;
      hour.textContent = `${formatTimeUnit(hours)}`;
      minute.textContent = `${formatTimeUnit(minutes)}`;
      second.textContent = `${formatTimeUnit(seconds)}`;
    }
  }, 1000);
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

function formatTimeUnit(unit) {
  // Add leading zero if the unit is less than 10
  return unit < 10 ? `0${unit}` : unit;
}
