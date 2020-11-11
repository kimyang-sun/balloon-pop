"use strict";
import * as sound from "./sound.js";

const BALLOON_SIZE_X = 112;
const BALLOON_SIZE_Y = 140;
const GAME_DURATION = 20;
let balloonCount = 20;
let gameDuration = GAME_DURATION;
let timerValue = undefined;
let countValue = 0;
let started = false;

// Level Select
const levels = Object.freeze({
  easy: "easy",
  normal: "normal",
  hard: "hard",
});
const levelBtns = document.querySelector(".level__container");
let currentLevel = "normal";

levelBtns.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;
  if (target.matches(".easy")) {
    onChangeLevel(levels.easy);
  } else if (target.matches(".hard")) {
    onChangeLevel(levels.hard);
  } else {
    onChangeLevel(levels.normal);
  }
  sound.playBtn();
});

function onChangeLevel(level) {
  const levelText = document.querySelectorAll(".level");
  levelText.forEach(text => (text.innerText = level));
  currentLevel = level;
  hidePopUp(levelPopUp);
}

// Game Field
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initImages() {
  field.innerHTML = "";
  if (currentLevel === levels.easy) {
    balloonCount = 10;
  } else if (currentLevel === levels.hard) {
    balloonCount = 30;
  } else {
    balloonCount = 20;
  }
  addItems("balloon", "./img/balloon_", balloonCount);
}

function addItems(imgName, imgSrc, count) {
  const fieldWidth = fieldRect.width;
  const filedHeight = fieldRect.height;
  const rangeX = fieldWidth - BALLOON_SIZE_X;
  const rangeY = filedHeight - BALLOON_SIZE_Y;

  for (let i = count; i > 0; i--) {
    const item = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemNum = document.createElement("span");
    const random = Math.floor(Math.random() * (6 - 1) + 1);
    item.setAttribute("class", imgName);
    itemImg.setAttribute("src", `${imgSrc + random}.png`);
    itemImg.setAttribute("alt", imgName);
    itemNum.innerText = `${i}`;

    const x = Math.random() * rangeX;
    const y = Math.random() * rangeY;
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;

    item.appendChild(itemImg);
    item.appendChild(itemNum);
    field.appendChild(item);
  }
}

// Game Start
const Reason = Object.freeze({
  level: "level",
  win: "win",
  lose: "lose",
});
const ready = document.querySelector(".game__ready");
const footer = document.querySelector(".game__footer");
const count = document.querySelector(".count");
const timer = document.querySelector(".timer");
const retryBtn = document.querySelector(".game__retry__btn");
const startBtn = document.querySelector(".game__start__btn");
startBtn.addEventListener("click", () => {
  start();
});

function start() {
  started = true;
  sound.playBg();
  initImages();
  ready.style.visibility = "hidden";
  footer.classList.add("on");
  startTimer();
  clickCount();
}

function startTimer() {
  timer.innerText = gameDuration;
  timerValue = setInterval(() => {
    timer.innerText = --gameDuration;
    if (gameDuration <= 0) {
      stop(Reason.lose);
    }
  }, 1000);
}

function clickCount() {
  count.innerText = countValue;
  if (balloonCount === countValue) {
    stop(Reason.win);
  }
}

// Game Stop
function stop(reason) {
  started = false;
  stopTimer();
  showPopUp(reason);
  sound.stopBg();
}

function stopTimer() {
  clearInterval(timerValue);
}

// Game Retry
function reStart() {
  countValue = 0;
  gameDuration = GAME_DURATION;
  hidePopUp(endPopUp);
  start();
}
retryBtn.addEventListener("click", () => {
  reStart();
});

// Balloon Click
field.addEventListener("click", event => {
  if (!started) return;
  const target = event.target.closest(".balloon");
  if (!target) return;
  if (target.matches(".balloon")) {
    if (countValue + 1 == target.lastChild.innerText) {
      target.remove();
      ++countValue;
      clickCount();
      sound.playPop();
    } else {
      sound.playNo();
    }
  }
});

// Popup on/off
const levelPopUpBtn = document.querySelectorAll(".game__level__btn");
const levelPopUp = document.querySelector(".game__popup--level");
const endPopUp = document.querySelector(".game__popup--end");
const endPopUpText = document.querySelector(".popup__text");

levelPopUpBtn.forEach(btn => {
  btn.addEventListener("click", event => {
    sound.playBtn();
    showPopUp(Reason.level);
  });
});

function showPopUp(reason) {
  let popup;
  switch (reason) {
    case Reason.level:
      popup = levelPopUp;
      break;
    case Reason.win:
      popup = endPopUp;
      setPopUpText(reason);
      break;
    case Reason.lose:
      popup = endPopUp;
      setPopUpText(reason);
      break;
  }
  popup.classList.add("visible");
}

function setPopUpText(reason) {
  let message;
  if (reason === Reason.win) {
    sound.playWin();
    message = "YOU WON";
  } else {
    sound.playLose();
    message = "GAME OVER";
  }
  endPopUpText.innerText = message;
}

function hidePopUp(popup) {
  popup.classList.remove("visible");
}
