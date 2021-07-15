import { getRandomInteger } from "../util/index.js";


/**
 * Star 인스턴스가 땅에 닫으면 부서지면서 Meteor crack 으로 조각난다.
 */
export class MeteoriteDebris {
  constructor(canvas, ctx, x, y, radius, shadowColor) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.shadowColor = shadowColor;
    this.shadowBlur = 20;
    this.velocity = {
      x: getRandomInteger(-5, 5),
      y: getRandomInteger(-15, 15),
    };
    this.gravity = 0.1;
    this.friction = 0.8;
    this.ttl = 100;                     // Time to live
    this.opacity = 1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.shadowColor = this.shadowColor;
    this.ctx.shadowBlur = this.shadowBlur;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    if (this.y + this.radius + this.velocity.y >= this.canvas.height) {
      // 별이 바닥에 닿을 때
      this.velocity.y *= -1;
      this.velocity.y *= this.friction;
      this.radius -= 0.4;
    } else {
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
  }

  animate() {
    this.update();

    if (this.radius > 0) {
      this.draw();
    }
  }
}