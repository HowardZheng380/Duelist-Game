export class GameRenderer {
  constructor(ctx, world) {
    this.ctx = ctx;
    this.world = world;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.world.width, this.world.height);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.world.width, this.world.height);
  }
}
