export class InputManager {
  constructor(controlSets) {
    this.keys = {};
    this.controlKeys = new Set(
      controlSets.flatMap((controls) => [controls.left, controls.right, controls.jump, controls.attack]),
    );

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  attach() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  isPressed(key) {
    return Boolean(this.keys[key]);
  }

  handleKeyDown(event) {
    if (this.controlKeys.has(event.key)) {
      event.preventDefault();
    }

    this.keys[event.key] = true;
  }

  handleKeyUp(event) {
    if (this.controlKeys.has(event.key)) {
      event.preventDefault();
    }

    this.keys[event.key] = false;
  }
}
