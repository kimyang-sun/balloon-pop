"use strict";
const BALLOON_SIZE_X = 112;
const BALLOON_SIZE_Y = 140;
let balloonCount = 20;

// Game Field
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

function initImages() {
  field.innerHTML = "";
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
const footer = document.querySelector(".game__footer");
const count = document.querySelector(".count");
const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".game__start__btn");
startBtn.addEventListener("click", () => {
  start();
});

function start() {
  initImages();
  footer.classList.add("on");
}

function startCount() {}

function startTimer() {}

// Popup on/off
const levelPopUpBtn = document.querySelectorAll(".game__level__btn");
const levelPopUp = document.querySelector(".game__popup--level");
const endPopUp = document.querySelector(".game__popup--end");

levelPopUpBtn.forEach(btn => {
  btn.addEventListener("click", event => showPopUp(levelPopUp));
});

function showPopUp(popup) {
  popup.classList.add("visible");
}

function hidePopUp(popup) {
  popup.classList.remove("visible");
}

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
  } else if (target.matches(".normal")) {
    onChangeLevel(levels.normal);
  } else {
    onChangeLevel(levels.hard);
  }
});

function onChangeLevel(level) {
  const levelText = document.querySelectorAll(".level");
  levelText.forEach(text => (text.innerHTML = level));
  currentLevel = level;
  hidePopUp(levelPopUp);
}
