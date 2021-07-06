/**
 * start 이상 end 미만의 랜덤 정수를 반환한다.
 * @param {number} start
 * @param {number} end
 * @return start 이상 end 미만인 랜덤 정수
 */
export function getRandomInteger(start, end) {
  return parseInt(
    (Math.random() * (end - start)) + start,
    10
  );
}