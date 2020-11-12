"use strict";
import { Level } from "./game.js";
export default class Field {
  constructor(balloonSizeX, balloonSizeY) {
    this.balloonSizeX = balloonSizeX;
    this.balloonSizeY = balloonSizeY;
    this.balloonCount = 20;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.currentLevel = "normal";
    this.field.addEventListener("click", event => {
      this.onItemClick(event) && this.onItemClick(event);
    });
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  initImages() {
    this.field.innerHTML = "";
    if (this.currentLevel === Level.easy) {
      this.balloonCount = 20;
    } else if (this.currentLevel === Level.hard) {
      this.balloonCount = 40;
    } else {
      this.balloonCount = 30;
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
