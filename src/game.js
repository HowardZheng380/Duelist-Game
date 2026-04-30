import { Game } from "./core/Game.js";
import { WORLD, PLAYER_CONFIGS } from "./core/config.js";
import { InputManager } from "./input/InputManager.js";
import { GameRenderer } from "./render/GameRenderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const body = document.body;

canvas.width = WORLD.width;
canvas.height = WORLD.height;

const input = new InputManager(PLAYER_CONFIGS.map((player) => player.controls));
const renderer = new GameRenderer(ctx, WORLD);
const game = new Game(input, renderer);

input.attach();

let currentScreen = "title";

window.addEventListener("keydown", (event) => {
  if (currentScreen !== "title") {
    return;
  }

  if (event.key === "k" || event.key === "K") {
    event.preventDefault();
    currentScreen = "map-selection";
    body.classList.remove("title-screen");
    body.classList.add("map-selection");
  }
});

function loop() {
  if (currentScreen === "map-selection") {
    game.update();
    game.draw();
  }

  requestAnimationFrame(loop);
}

loop();
