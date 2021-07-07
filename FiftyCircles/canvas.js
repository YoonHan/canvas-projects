import { getRandomInteger, resizeCanvas } from '../util/index.js';
import { Circle } from './circle.js';


const canvas = document.querySelector('canvas');
// canvas 크기를 조정한다.
resizeCanvas(canvas);

const c = canvas.getContext('2d');

// Circle instance 들을 생성하여 배열에 저장.
const CIRCLES_NUM = 50;
const circles = [];
for (let i = 0; i < CIRCLES_NUM; i++) {
  const RADIUS = 30;
  const X = getRandomInteger(RADIUS, window.innerWidth - RADIUS);
  const dX = (Math.random() - 0.5) * 20;
  const Y = getRandomInteger(RADIUS, window.innerHeight - RADIUS);
  const dY = (Math.random() - 0.5) * 20;
  const COLOR = `rgba(
    ${getRandomInteger(0, 256)},
    ${getRandomInteger(0, 256)},
    ${getRandomInteger(0, 256)},
    ${Math.random().toFixed(1)}
  )`;

  circles.push(new Circle(c, X, Y, dX, dY, RADIUS, COLOR));
}

// 메인 애니메이션 함수
function animate() {
  window.requestAnimationFrame(animate);
  // Clear previous frame
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)

  // Draw circles
  circles.forEach((circle) => {
    circle.animate();
  });
}

// resize event handler 추가
window.addEventListener('resize', () => {
  resizeCanvas(canvas);
})

// 애니메이션 시작
animate();
