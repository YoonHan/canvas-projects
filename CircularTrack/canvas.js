import { CircularParticle } from './CircularParticle';
import { resizeCanvas, getRandomFloatNum, getRandomInteger } from '../util/index.js';


class CircularTrack {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.PARTICLE_NUM = 50;
    this.COLORS = [
      '#7B07EB',
      '#4007F5',
      '#1219DE',
      '#074EF5',
      '#0786EB',
    ];
  }

  /**
   * initialise
   */
  init() {
    // canvas resizing
    resizeCanvas(this.canvas);

    // create particles
    for (let i = 0; i < this.PARTICLE_NUM; i++) {
      this.particles.push(new CircularParticle(
          this.ctx,
          window.innerWidth / 2,
          window.innerHeight / 2,
          getRandomInteger(2, 5),
          this.COLORS[getRandomInteger(0, this.COLORS.length)],
          getRandomFloatNum(0, Math.PI * 2, 2)
        )
      );
    }

    // add event listener
    this.attachEventHandler();
  }

  /**
   * event listener 추가
   */
  attachEventHandler() {
    const backBtnElem = document.querySelector('button.back-btn');
    backBtnElem.addEventListener('click', () => {
      window.history.back();
    });

    window.addEventListener('resize', () => {
      resizeCanvas(this.canvas);
    });
  }

  /**
   * animation 시작
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // erase previous frame
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // draw particles
    this.particles.forEach((particle) => {
      particle.animate();
    })
  }
}

const CT = new CircularTrack();
CT.init();
CT.animate();