import { resizeCanvas } from '../util/index.js';


class SineWave {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    // data
    this.amplitudeSliderElem = document.querySelector('.slider.amplitude');
    this.freqSliderElem = document.querySelector('.slider.frequency');
    this.waveInfo = {
      amplitude: 0,
      frequency: 0,
    };
    this.increment = 0.01;
  }

  /**
   * 이벤트 리스너를 추가한다.
   */
  attachEventListener() {
    window.addEventListener('resize', () => {
      resizeCanvas(this.canvas);
    });

    const backBtnElem = document.querySelector('button.back-btn');
    backBtnElem.addEventListener('click', () => {
      window.history.back();
    });

    this.amplitudeSliderElem.addEventListener('input', () => {
      this.waveInfo.amplitude = parseInt(this.amplitudeSliderElem.value, 10);
    });

    this.freqSliderElem.addEventListener('input', (e) => {
      this.waveInfo.frequency = parseInt(this.freqSliderElem.value, 10);
    })
  }

  /**
   * initialise
   */
  init() {
    this.waveInfo = {
      amplitude: parseInt(this.amplitudeSliderElem.value, 10),
      frequency: parseInt(this.freqSliderElem.value, 10),
    };

    // fit canvas to window
    resizeCanvas(this.canvas);
    // attache event listener
    this.attachEventListener();
  }

  /**
   * sine wave 그리기
   */
  draw() {
    const middleY = this.canvas.height / 2;

    this.ctx.beginPath();
    this.ctx.moveTo(0, middleY);
    for (let i = 0; i < this.canvas.width; i++) {
      this.ctx.lineTo(i, middleY + Math.sin(i * this.waveInfo.frequency * 0.001 + this.increment) * this.waveInfo.amplitude);
    };
    this.ctx.stroke();
    this.ctx.closePath();

    this.increment += 0.02;
  }

  /**
   * animatino 시작
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw();
  }
}

const sw = new SineWave();
sw.init();
sw.animate();