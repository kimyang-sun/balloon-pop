"use strict";
import { GameBuilder } from "./game.js";

// Game Class
const game = new GameBuilder()
  .gameDuration(20)
  .balloonSizeX(112)
  .balloonSizeY(140)
  .build();
