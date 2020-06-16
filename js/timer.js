const timerContainer = document.querySelector('.js-timer');
const timer = timerContainer.querySelector('h3');

function setTime() {
  const now = new Date();
  timer.innerText = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function init() {
  setTime();
  setInterval(setTime, 1000);
}

init();
