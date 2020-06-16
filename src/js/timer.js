const timerContainer = document.querySelector('.js-timer');
const timer = timerContainer.querySelector('h3');

function setTime() {
  const now = new Date();
  timer.innerText = `${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
  }`;
}

function init() {
  setTime();
  setInterval(setTime, 1000);
}

init();
