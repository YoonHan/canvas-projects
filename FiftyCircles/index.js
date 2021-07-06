const backBtnElem = document.querySelector('button.back-btn');

// add event handler
backBtnElem.addEventListener('click', () => {
  window.history.back();
});