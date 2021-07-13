/**
 * start 이상 end 미만의 랜덤 정수를 반환한다.
 * @param {number} start
 * @param {number} end (exclusive)
 * @return start 이상 end 미만인 랜덤 정수
 */
export function getRandomInteger(start, end) {
  return parseInt(
    (Math.random() * (end - start)) + start,
    10
  );
}

/**
 * start 이상 end 미만의 부동소수점 float number를 반환한다.
 * @param {number} start
 * @param {number} end (exclusive)
 * @returns
 */
export function getRandomFloatNum(start, end, toFixed) {
  return parseFloat(
    ((Math.random() * (end - start)) + start).toFixed(toFixed)
  );
}

/**
 * canvas 요소의 크기를 window size에 맞게 조정한다.
 */
export function resizeCanvas(canvasElem) {
  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
}