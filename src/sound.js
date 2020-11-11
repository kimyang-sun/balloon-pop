"use strict";
const bgSound = new Audio("./sound/bg.mp3");
const btnSound = new Audio("./sound/button.wav");
const popSound = new Audio("./sound/pop.mp3");
const noSound = new Audio("./sound/no.wav");
const winSound = new Audio("./sound/win.wav");
const loseSound = new Audio("./sound/lose.wav");

export function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

export function stopSound(sound) {
  sound.pause();
}

export function playBg() {
  bgSound.volume = 0.4;
  playSound(bgSound);
}

export function stopBg() {
  stopSound(bgSound);
}

export function playBtn() {
  btnSound.volume = 0.7;
  playSound(btnSound);
}

export function playPop() {
  popSound.volume = 0.3;
  playSound(popSound);
}

export function playNo() {
  noSound.volume = 0.5;
  playSound(noSound);
}

export function playWin() {
  winSound.volume = 0.3;
  playSound(winSound);
}

export function playLose() {
  loseSound.volume = 0.4;
  playSound(loseSound);
}
