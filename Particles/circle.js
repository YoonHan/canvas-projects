import { mousePos } from './canvas.js';


export class Circle {
  constructor(ctx, x, y, dx, dy, radius, minRadius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.maxRadius = 150;
    this.minRadius = minRadius;
    this.dRadius = 2;
  }

  /**
   * Circle instance 를 주어진 canvas에 그린다.
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  /**
   * Circle instance 가 주어진 canvas 영역을 벗어났는지 체크한다.
   * 벗어났다면 x, y 축에 대해 진행방향을 반대로 바꾼다.
   */
  update() {
    if (this.x - this.radius < 0) {
      this.dx *= -1;
      this.x = this.radius;
    }

    if (this.x + this.radius > window.innerWidth) {
      this.dx *= -1;
      this.x = window.innerWidth - this.radius;
    }

    if (this.y - this.radius < 0) {
      this.dy *= -1;
      this.y = this.radius;
    }

    if (this.y + this.radius > window.innerHeight) {
      this.dy *= -1;
      this.y = window.innerHeight - this.radius;
    }

    this.x += this.dx;
    this.y += this.dy;

    // mousemove interactivity
    if (
      (
        Math.abs(mousePos.x - this.x) < 50 &&
        Math.abs(mousePos.y - this.y) < 50
      ) && this.radius + this.dRadius <= this.maxRadius
    ) {
      this.radius += this.dRadius;
    } else if (this.radius - this.dRadius >= this.minRadius) {
      this.radius -= this.dRadius;
    }
  }

  animate() {
    this.draw();
    this.update();
  }
}