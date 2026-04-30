import { Game } from "./core/Game.js";
import { WORLD, PLAYER_CONFIGS } from "./core/config.js";
import { InputManager } from "./input/InputManager.js";
import { GameRenderer } from "./render/GameRenderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = WORLD.width;
canvas.height = WORLD.height;

const input = new InputManager(PLAYER_CONFIGS.map((player) => player.controls));
const renderer = new GameRenderer(ctx, WORLD);
const game = new Game(input, renderer);

input.attach();

function loop() {
  game.update();
  game.draw();
  requestAnimationFrame(loop);
}

loop();
