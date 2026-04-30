import { clamp, createBox, boxesIntersect } from "../core/utils.js";

export class Fighter {
  constructor(config, world) {
    this.name = config.name;
    this.color = config.color;
    this.accent = config.accent;
    this.controls = config.controls;
    this.startX = config.x;
    this.startDirection = config.direction;
    this.width = config.width;
    this.height = config.height;
    this.speed = 1.4;
    this.jumpStrength = 6.7;
    this.attackRange = 18;
    this.attackDamage = 8;
    this.world = world;
    this.rounds = 0;

    this.reset(this.startX, this.startDirection);
  }

  reset(x = this.startX, direction = this.startDirection) {
    this.x = x;
    this.y = this.world.floorY - this.height;
    this.direction = direction;
    this.velocityX = 0;
    this.velocityY = 0;
    this.attackTime = 0;
    this.attackCooldown = 0;
    this.hitstun = 0;
    this.health = 100;
  }

  getBodyBox() {
    return createBox(this.x, this.y, this.width, this.height);
  }

  getAttackBox() {
    const offset = this.direction === 1 ? this.width : -this.attackRange;
    return createBox(this.x + offset, this.y + 10, this.attackRange, this.height - 18);
  }

  update(input, enemy) {
    const leftPressed = input.isPressed(this.controls.left);
    const rightPressed = input.isPressed(this.controls.right);
    const jumpPressed = input.isPressed(this.controls.jump);
    const attackPressed = input.isPressed(this.controls.attack);

    if (this.hitstun > 0) {
      this.hitstun -= 1;
      this.velocityX *= 0.9;
    } else {
      this.applyMovementInput(leftPressed, rightPressed);
      this.applyJumpInput(jumpPressed);
      this.applyAttackInput(attackPressed);
    }

    this.resolveAttack(enemy);
    this.applyPhysics();
  }

  applyMovementInput(leftPressed, rightPressed) {
    this.velocityX = 0;

    if (leftPressed) {
      this.velocityX = -this.speed;
      this.direction = -1;
    }

    if (rightPressed) {
      this.velocityX = this.speed;
      this.direction = 1;
    }

    if (leftPressed && rightPressed) {
      this.velocityX = 0;
    }
  }

  applyJumpInput(jumpPressed) {
    const grounded = this.y + this.height >= this.world.floorY;
    if (jumpPressed && grounded) {
      this.velocityY = -this.jumpStrength;
    }
  }

  applyAttackInput(attackPressed) {
    if (attackPressed && this.attackCooldown <= 0) {
      this.attackTime = 10;
      this.attackCooldown = 22;
    }
  }

  resolveAttack(enemy) {
    if (this.attackTime > 0) {
      this.attackTime -= 1;

      if (this.attackTime === 5 && boxesIntersect(this.getAttackBox(), enemy.getBodyBox())) {
        enemy.takeHit(this.direction, this.attackDamage);
      }
    }

    if (this.attackCooldown > 0) {
      this.attackCooldown -= 1;
    }
  }

  applyPhysics() {
    this.velocityY += this.world.gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.y + this.height >= this.world.floorY) {
      this.y = this.world.floorY - this.height;
      this.velocityY = 0;
    }

    this.x = clamp(
      this.x,
      this.world.stagePadding,
      this.world.width - this.width - this.world.stagePadding,
    );
  }

  takeHit(direction, damage) {
    if (this.hitstun > 0) {
      return;
    }

    this.health = Math.max(0, this.health - damage);
    this.hitstun = 12;
    this.velocityX = direction * 2.2;
    this.velocityY = -1.8;
  }
}
