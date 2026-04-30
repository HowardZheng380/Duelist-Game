# Duelist Game

A small browser-based prototype for a pixelated 2D fighting game.

## Play

Open https://howardzheng380.github.io/Duelist-Game/ in a browser.

## Controls

Player 1
- `A` / `D`: move
- `W`: jump
- `F`: quick attack

Player 2
- `Left` / `Right`: move
- `Up`: jump
- `Slash` (`/`): quick attack

## Current Features

- Pixel-scaled canvas presentation
- Local two-player fighting
- Movement, jumping, gravity, and stage boundaries
- Health bars and a round timer
- Hit stun, attack cooldowns, and round resets

## Structure

- `src/game.js`: app entry point
- `src/core/Game.js`: round flow and game loop state
- `src/entities/Fighter.js`: fighter behavior and combat state
- `src/render/GameRenderer.js`: drawing and HUD
- `src/input/InputManager.js`: keyboard handling
- `src/core/config.js` and `src/core/utils.js`: shared constants and helpers

## Next Good Steps

- Replace block fighters with sprite sheets
- Add crouching, blocking, and special moves
- Add character select, sound, and menus
