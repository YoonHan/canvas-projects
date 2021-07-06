import { getRandomInteger } from './util.js';
import { Circle } from './circle.js';


let canvas = document.querySelector('canvas');

// canvas 크기를 조정한다.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

// Circle instance 들을 생성하여 배열에 저장.
const CIRCLES_NUM = 50;
let circles = [];
for (let i = 0; i < CIRCLES_NUM; i++) {
  const X = Math.random() * window.innerWidth;
  const dX = (Math.random() - 0.5) * 20;
  const Y = Math.random() * window.innerHeight;
  const dY = (Math.random() - 0.5) * 20;
  const RADIUS = 30;
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

// 애니메이션 시작
animate();
