"use strict";
import { Reason } from "./main.js";
import * as sound from "./sound.js";

export default class PopUp {
  constructor() {
    this.endPopUp = document.querySelector(".game__popup--end");
    this.endPopUpText = document.querySelector(".popup__text");
    this.levelPopUp = document.querySelector(".game__popup--level");
    this.levelPopUpBtn = document.querySelectorAll(".game__level__btn");
    this.levelPopUpBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        sound.playBtn();
        this.showPopUp(Reason.level);
      });
    });
  }

  showPopUp(reason) {
    let popup;
    switch (reason) {
      case Reason.level:
        popup = this.levelPopUp;
        break;
      case Reason.win:
        popup = this.endPopUp;
        this.setPopUpText(reason);
        break;
      case Reason.lose:
        popup = this.endPopUp;
        this.setPopUpText(reason);
        break;
    }
    popup.classList.add("visible");
  }

  setPopUpText(reason) {
    let message;
    if (reason === Reason.win) {
      sound.playWin();
      message = "YOU WON";
    } else {
      sound.playLose();
      message = "GAME OVER";
    }
    this.endPopUpText.innerText = message;
  }

  hidePopUp(popup) {
    popup.classList.remove("visible");
  }
}
