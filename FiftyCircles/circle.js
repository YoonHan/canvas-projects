export class Circle {
  constructor(ctx, x, y, dx, dy, radius, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
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
    if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
      this.dx *= -1;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
      this.dy *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  animate() {
    this.draw();
    this.update();
  }
}