"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

export const Level = Object.freeze({
  easy: "easy",
  normal: "normal",
  hard: "hard",
});

export const Reason = Object.freeze({
  level: "level",
  win: "win",
  lose: "lose",
});

// Builder Pattern
export class GameBuilder {
  gameDuration(num) {
    this.gameDuration = num;
    return this;
  }

  balloonSizeX(num) {
    this.balloonSizeX = num;
    return this;
  }

  balloonSizeY(num) {
    this.balloonSizeY = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.balloonSizeX, this.balloonSizeY);
  }
}

// Game Class
class Game {
  constructor(gameDuration, balloonSizeX, balloonSizeY) {
    this.GAME_DURATION = gameDuration;
    this.gameDuration = gameDuration;
    this.timerValue = undefined;
    this.countValue = 0;
    this.started = false;
    this.ready = document.querySelector(".game__ready");
    this.footer = document.querySelector(".game__footer");
    this.count = document.querySelector(".count");
    this.timer = document.querySelector(".timer");
    this.retryBtn = document.querySelector(".game__retry__btn");
    this.startBtn = document.querySelector(".game__start__btn");
    this.levelBtns = document.querySelector(".level__container");

    // Level Select
    this.levelBtns.addEventListener("click", event => {
      const target = event.target;
      if (target.tagName !== "BUTTON") return;
      if (target.matches(".easy")) {
        this.onChangeLevel(Level.easy);
      } else if (target.matches(".hard")) {
        this.onChangeLevel(Level.hard);
      } else {
        this.onChangeLevel(Level.normal);
      }
      sound.playBtn();
    });

    // Game Start
    this.startBtn.addEventListener("click", () => this.start());
    this.retryBtn.addEventListener("click", () => this.reStart());

    // PopUp Class
    this.popUp = new PopUp();

    // Field Class
    this.field = new Field(balloonSizeX, balloonSizeY);
    this.field.setClickListener(this.onItemClick);
  }

  onItemClick = item => {
    if (!this.started) return;
    const target = item.target.closest(".balloon");
    if (!target) return;
    if (target.matches(".balloon")) {
      if (this.countValue + 1 == target.lastChild.innerText) {
        target.remove();
        ++this.countValue;
        this.clickCount();
        sound.playPop();
      } else {
        sound.playNo();
      }
    }
  };

  onChangeLevel(level) {
    const levelText = document.querySelectorAll(".level");
    levelText.forEach(text => (text.innerText = level));
    this.field.currentLevel = level;
    this.popUp.hide(this.popUp.levelPopUp);
  }

  // Game Start
  start() {
    this.started = true;
    sound.playBg();
    this.field.initImages();
    this.ready.style.visibility = "hidden";
    this.footer.classList.add("on");
    this.startTimer();
    this.clickCount();
  }

  startTimer() {
    this.timer.innerText = this.gameDuration;
    this.timerValue = setInterval(() => {
      this.timer.innerText = --this.gameDuration;
      if (this.gameDuration <= 0) {
        this.stop(Reason.lose);
      }
    }, 1000);
  }

  clickCount() {
    this.count.innerText = this.countValue;
    if (this.field.balloonCount === this.countValue) {
      this.stop(Reason.win);
    }
  }

  // Game Stop
  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.popUp.show(reason);
    sound.stopBg();
  }

  stopTimer() {
    clearInterval(this.timerValue);
  }

  // Game Retry
  reStart() {
    this.countValue = 0;
    this.gameDuration = this.GAME_DURATION;
    this.popUp.hide(this.popUp.endPopUp);
    this.start();
  }
}
