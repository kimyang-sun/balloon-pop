"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const BALLOON_SIZE_X = 112;
const BALLOON_SIZE_Y = 140;
const GAME_DURATION = 20;
let gameDuration = GAME_DURATION;
let timerValue = undefined;
let countValue = 0;
let started = false;

// PopUp Class
const popUp = new PopUp();

// Field Class
const field = new Field(GAME_DURATION, BALLOON_SIZE_X, BALLOON_SIZE_Y);

// Level Select
export const Level = Object.freeze({
  easy: "easy",
  normal: "normal",
  hard: "hard",
});
const levelBtns = document.querySelector(".level__container");

levelBtns.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;
  if (target.matches(".easy")) {
    onChangeLevel(Level.easy);
  } else if (target.matches(".hard")) {
    onChangeLevel(Level.hard);
  } else {
    onChangeLevel(Level.normal);
  }
  sound.playBtn();
});

function onChangeLevel(level) {
  const levelText = document.querySelectorAll(".level");
  levelText.forEach(text => (text.innerText = level));
  field.currentLevel = level;
  popUp.hidePopUp(popUp.levelPopUp);
}

// Game Start
export const Reason = Object.freeze({
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
  field.initImages();
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
  if (field.balloonCount === countValue) {
    stop(Reason.win);
  }
}

// Game Stop
function stop(reason) {
  started = false;
  stopTimer();
  popUp.showPopUp(reason);
  sound.stopBg();
}

function stopTimer() {
  clearInterval(timerValue);
}

// Game Retry
function reStart() {
  countValue = 0;
  gameDuration = GAME_DURATION;
  popUp.hidePopUp(popUp.endPopUp);
  start();
}
retryBtn.addEventListener("click", () => {
  reStart();
});

// Balloon Click
field.field.addEventListener("click", event => {
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
