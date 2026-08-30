import './style.css'

document.getElementById('app').innerHTML = `
  <h1>カウンター</h1>
  <h2 id="num">0</h2>
  <button id="iBtn">増やす</button>
  <button id="dBtn">減らす</button>
  <button id="reset">リセット</button>
`;
const num = document.getElementById('num');
const iBtn = document.getElementById('iBtn');
const dBtn = document.getElementById('dBtn');
const resetBtn = document.getElementById('reset');
let countNum = 0;

iBtn.addEventListener('click', () => {
  countNum = countNum + 1;
  num.textContent = countNum;
});

dBtn.addEventListener('click', () => {
  countNum = countNum - 1;
  num.textContent = countNum;
});

resetBtn.addEventListener('click', () => {
  countNum = 0;
  num.textContent = countNum;
});

