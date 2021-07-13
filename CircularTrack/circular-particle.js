import { getRandomInteger } from "../util/index.js";


export class CircularParticle {
  constructor(ctx, x, y, size, color, radian) {
    this.ctx = ctx;
    this.currentPos = {
      x: x,
      y: y,
    }
    this.lastPos = {
      x: x,
      y: y,
    };
    this.currentMousePos = {
      x: x,
      y: y,
    };
    this.lastMousePos = {
      x: x,
      y: y,
    };
    this.size = size;
    this.color = color;
    this.radian = radian;
    this.orbitRadius = getRandomInteger(50, 120);
    this.velocity = 0.05;
    this.attachEventHandler();
  }

  /**
   * event listener 추가
   */
  attachEventHandler() {
    window.addEventListener('mousemove', (e) => {
      this.currentMousePos = {
        x: e.x,
        y: e.y,
      };
    })
  }

  /**
   * 잔상 효과가 있는 particle을 그린다.
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size;
    this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
    this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  /**
   * particle 의 X, Y 좌표 업데이트
   */
  update() {
    // save last X, Y position
    this.lastPos = {
      x: this.currentPos.x,
      y: this.currentPos.y,
    };
    // update mouse X, Y position
    this.lastMousePos.x += (this.currentMousePos.x - this.lastMousePos.x) * 0.05;
    this.lastMousePos.y += (this.currentMousePos.y - this.lastMousePos.y) * 0.05;
    // update current X, Y position
    this.currentPos = {
      x: this.lastMousePos.x + this.orbitRadius * Math.cos(this.radian),
      y: this.lastMousePos.y + this.orbitRadius * Math.sin(this.radian),
    }
    // update radian
    this.radian += this.velocity;
  }

  /**
   * animation 시작
   */
  animate() {
    this.update();
    this.draw(this.lastPos);
  }
}