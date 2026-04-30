import { FIGHT_MESSAGE_DURATION, PLAYER_CONFIGS, ROUND_MESSAGE_DURATION, WORLD } from "./config.js";
import { separateFighters } from "./utils.js";
import { Fighter } from "../entities/Fighter.js";

export class Game {
  constructor(input, renderer) {
    this.input = input;
    this.renderer = renderer;
    this.world = WORLD;
    this.player1 = new Fighter(PLAYER_CONFIGS[0], this.world);
    this.player2 = new Fighter(PLAYER_CONFIGS[1], this.world);
    this.timer = this.world.timer;
    this.timerTick = 60;
    this.winnerText = "Fight!";
    this.winnerFrames = FIGHT_MESSAGE_DURATION;
    this.roundOver = false;
  }

  update() {
    if (!this.roundOver) {
      this.player1.update(this.input, this.player2);
      this.player2.update(this.input, this.player1);
      separateFighters(this.player1, this.player2, this.world);
      this.updateTimer();

      if (this.player1.health <= 0 || this.player2.health <= 0 || this.timer <= 0) {
        this.finishRound();
      }
    } else if (this.winnerFrames > 0) {
      this.winnerFrames -= 1;
    } else {
      this.resetRound();
    }
  }

  draw() {
    this.renderer.draw({
      player1: this.player1,
      player2: this.player2,
      timer: this.timer,
      winnerText: this.winnerText,
      winnerFrames: this.winnerFrames,
    });
  }

  updateTimer() {
    this.timerTick -= 1;
    if (this.timerTick <= 0) {
      this.timer = Math.max(0, this.timer - 1);
      this.timerTick = 60;
    }
  }

  finishRound() {
    this.roundOver = true;

    if (this.player1.health === this.player2.health) {
      this.winnerText = "Draw!";
    } else if (this.player1.health > this.player2.health) {
      this.player1.rounds += 1;
      this.winnerText = "Player 1 Wins";
    } else {
      this.player2.rounds += 1;
      this.winnerText = "Player 2 Wins";
    }

    this.winnerFrames = ROUND_MESSAGE_DURATION;
  }

  resetRound() {
    this.player1.reset();
    this.player2.reset();
    this.timer = this.world.timer;
    this.timerTick = 60;
    this.roundOver = false;
    this.winnerText = "Fight!";
    this.winnerFrames = FIGHT_MESSAGE_DURATION;
  }
}
