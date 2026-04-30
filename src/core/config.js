export const WORLD = {
  width: 1600,
  height: 1000,
  floorY: 152,
  gravity: 0.42,
  timer: 60,
  stagePadding: 8,
};

export const ROUND_MESSAGE_DURATION = 120;
export const FIGHT_MESSAGE_DURATION = 45;

export const PLAYER_CONFIGS = [
  {
    name: "Player 1",
    color: "#ff6f91",
    accent: "#ffd166",
    width: 18,
    height: 40,
    x: 72,
    direction: 1,
    controls: {
      left: "a",
      right: "d",
      jump: "w",
      attack: "f",
    },
  },
  {
    name: "Player 2",
    color: "#62d0ff",
    accent: "#9cff57",
    width: 18,
    height: 40,
    x: 230,
    direction: -1,
    controls: {
      left: "ArrowLeft",
      right: "ArrowRight",
      jump: "ArrowUp",
      attack: "/",
    },
  },
];
