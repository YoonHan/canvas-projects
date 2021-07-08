export class Ball {
  constructor(ctx, x, y, gravity, friction, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.yVelocity = 0;
    this.gravity = gravity;
    this.friction = friction;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    if (this.y + this.radius + this.yVelocity < window.innerHeight) {
      this.yVelocity += this.gravity;
    } else {  // 바닥과 충돌하는 경우
      // y축 속도의 방향을 위로 바꾸고
      this.yVelocity = -this.yVelocity;
      // 에너지 손실 적용
      this.yVelocity *= this.friction;
    }

    this.y += this.yVelocity;
  }

  animate() {
    this.update();
    this.draw();
  }
}