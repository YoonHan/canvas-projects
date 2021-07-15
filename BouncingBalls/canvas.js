import { resizeCanvas, getRandomInteger  } from '../util/index.js';
import { Ball } from './ball.js';


// 데이터
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const COLORS = [
  '#15ED24',
  '#53F716',
  '#96E01F',
  '#F0F716',
  '#EDDA15',
];
const GRAVITY = 0.2;
const FRICTION = 0.95;
const balls = [];
const BALL_NUM = 300;

// 캔버스 초기 사이즈 window 크기에 맞게 조정
resizeCanvas(canvas);

// window reisze 이벤트 핸들러
window.addEventListener('resize', () => {
  resizeCanvas(canvas);
});

/**
 * Initialise
 */
function init() {
  // Create Balls
  for (let i = 0; i < BALL_NUM; i++) {
    const RADIUS = getRandomInteger(5, 31);
    const X = getRandomInteger(RADIUS, window.innerWidth - RADIUS);
    const Y = getRandomInteger(RADIUS, window.innerHeight - RADIUS - 100);
    // const COLOR = `rgb(${getRandomInteger(0, 256)}, ${getRandomInteger(0, 256)}, ${getRandomInteger(0, 256)})`;
    const COLOR = COLORS[getRandomInteger(0, COLORS.length)];
    const ball = new Ball(ctx, X, Y, GRAVITY, FRICTION, RADIUS, COLOR);

    balls.push(ball);
  }
}

/**
 * start animating
 */
function animate() {
  window.requestAnimationFrame(animate);
  // 이전 프레임 삭제
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // 별 그리기
  balls.forEach((ball) => {
    ball.animate();
  })
}

// main code
init();
animate();


