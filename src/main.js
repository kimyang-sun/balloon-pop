"use strict";
import { Game } from "./game.js";
import * as sound from "./sound.js";

const BALLOON_SIZE_X = 112;
const BALLOON_SIZE_Y = 140;
const GAME_DURATION = 20;
let gameDuration = GAME_DURATION;
let timerValue = undefined;
let countValue = 0;
let started = false;

// Game Class
const game = new Game(GAME_DURATION, BALLOON_SIZE_X, BALLOON_SIZE_Y);
