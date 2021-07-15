import { getRandomFloatNum } from '../util/index.js';
import { MeteoriteDebris } from './MeteoriteDebris.js';


export class Meteorite {
  constructor(canvas, ctx, x, y, radius, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: getRandomFloatNum(-4, 4),
      y: 3,
    };
    this.gravity = 1;
    this.friction = 0.8;
    this.meteoriteDebris = [];
    this.DEBRIS_NUM = 8;
    this.sizeDecrement = 3;
    this.shatteredOnce = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.shadowColor = this.shadowColor;
    this.ctx.shadowBlur = this.shadowBlur;
    this.ctx.fill();
    this.ctx.closePath();
  }

  /**
   * 별이 땅에 닿으면 조각으로 부서지는 효과를 부여한다.
   */
  shatter() {
    this.shatteredOnce = true;

    for (let i = 0; i < this.DEBRIS_NUM; i++) {
      this.meteoriteDebris.push(new MeteoriteDebris(this.canvas, this.ctx, this.x, this.y, 2, '#E3EAEF'));
    }

    if (this.radius - this.sizeDecrement < 0) {
      this.radius = 0;
    } else {
      this.radius -= this.sizeDecrement;
    }
  }

  /**
   * draw() 호출 전 변경 사항 업데이트
   */
  update() {
    if (this.y + this.radius + this.velocity.y > this.canvas.height) {
      // 별이 바닥에 닿을 때
      this.velocity.y *= -1;
      this.velocity.y *= this.friction;

      // 바닥과 별 사이의 공간이 1px 이상일 때에만 shatter 이펙트 적용
      if (Math.abs(this.y + this.radius - this.canvas.height) >= 1) {
        this.shatter();
      }
    } else {
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  /**
   * animation 시작
   * update() -> draw()
   */
  animate() {
    // update properties
    this.update();
    this.draw();

    // filter mini stars with positive radius
    this.meteoriteDebris = this.meteoriteDebris.filter((debris) => {
      return debris.radius > 0 && debris.ttl > 0;
    });

    this.meteoriteDebris.forEach((debris) => {
      debris.animate();
    })
  }
}