"use strict";
import { Level } from "./main.js";
export default class Field {
  constructor(gameDuration, balloonSizeX, balloonSizeY) {
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.currentLevel = "normal";
    this.balloonCount = 20;
    this.gameDuration = gameDuration;
    this.balloonSizeX = balloonSizeX;
    this.balloonSizeY = balloonSizeY;
  }

  initImages() {
    this.field.innerHTML = "";
    if (this.currentLevel === Level.easy) {
      this.balloonCount = 10;
    } else if (this.currentLevel === Level.hard) {
      this.balloonCount = 30;
    } else {
      this.balloonCount = 20;
    }
    this.addItems("balloon", "./img/balloon_", this.balloonCount);
  }

  addItems(imgName, imgSrc, count) {
    const fieldWidth = this.fieldRect.width;
    const filedHeight = this.fieldRect.height;
    const rangeX = fieldWidth - this.balloonSizeX;
    const rangeY = filedHeight - this.balloonSizeY;

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
      this.field.appendChild(item);
    }
  }
}
