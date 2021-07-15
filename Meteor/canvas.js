import { getRandomInteger, resizeCanvas } from '../util/index.js';
import { Meteorite } from './Meteorite.js';


class Meteor {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.backgroundObject = undefined;
    this.meteorites = [];
    this.backgroundMeteorites = [];
    this.ticker = 0;
    this.randomSpawnRate = 75;
  }

  /**
   * 필요한 event listener 부착
   */
  attachEventListener() {
    // back button event listener
    const backBtnElem = document.querySelector('button.back-btn');
    backBtnElem.addEventListener('click', () => {
      window.history.back();
    });

    // window resize event handler
    window.addEventListener('resize', () => {
      resizeCanvas(this.canvas);
    })
  }

  /**
   * 배경 오브젝트 생성
   */
  createBackground() {
    this.backgroundObject = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    this.backgroundObject.addColorStop(0, '#171E26');
    this.backgroundObject.addColorStop(1, '#3F586B');
  }

  /**
   * 뒷 배경에 나타날 Meteorite 오브젝트 생성
   */
  createBackgroundMeteorites(meteoriteAmount) {
    for (let i = 0; i < meteoriteAmount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const radius = Math.random() * 3;
      this.backgroundMeteorites.push(new Meteorite(this.canvas, this.ctx, x, y, radius, 'white'));
    }
  }

  /**
   * 뒷 배경의 산 생성
   */
  drawMountains(mountainAmount, height, color) {
    // restore shadow releated fillStyle property
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = undefined;

    for (let i = 0; i < mountainAmount; i++) {
      const mountainWidth = this.canvas.width / mountainAmount;
      this.ctx.beginPath();
      this.ctx.moveTo(i * mountainWidth, this.canvas.height);
      this.ctx.lineTo((i + 1) * mountainWidth + 325, this.canvas.height);
      this.ctx.lineTo((i + 0.5) * mountainWidth, this.canvas.height - height);
      this.ctx.lineTo(i * mountainWidth - 325, this.canvas.height);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  /**
   * initialise
   */
  init() {
    // add event listeners
    this.attachEventListener();
    // resize canvas to fit into window
    resizeCanvas(this.canvas);
    // create background
    this.createBackground();
    // create background meteorites
    this.createBackgroundMeteorites(150);
  }

  /**
   * animation 시작
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // draw background
    this.ctx.fillStyle = this.backgroundObject;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // draw background meteorites
    this.backgroundMeteorites.forEach((backgroundMeteorite) => {
      backgroundMeteorite.draw();
    })
    // draw mountains on the background
    this.drawMountains(1, this.canvas.height - 50, '#384551');
    this.drawMountains(2, this.canvas.height - 100, '#2B3843');
    this.drawMountains(3, this.canvas.height - 300, '#26333E');


    // filter Meteorite with positive radius
    this.meteorites = this.meteorites.filter((meteorite) => {
      return !meteorite.shatteredOnce || meteorite.meteoriteDebris.length > 0;
    });

    // animate Meteorites
    this.meteorites.forEach((meteorite) => {
      meteorite.animate();
    });

    // tickr 값과 random spawn rate 따라 Meteorite 생성
    this.ticker++;
    if (this.ticker % this.randomSpawnRate === 0 ) {
      const x = Math.random() * this.canvas.width;
      this.meteorites.push(new Meteorite(this.canvas, this.ctx, x, -100, 12, 'white'));
      this.randomSpawnRate = getRandomInteger(75 , 100);
    }
  }
}

const ss = new Meteor();
ss.init();
ss.animate();