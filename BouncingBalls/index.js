const backBtnElem = document.querySelector('button.back-btn');
// Back 버튼 이벤트 핸들러
backBtnElem.addEventListener('click', () => {
  window.history.back();
});
