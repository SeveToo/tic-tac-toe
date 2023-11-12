const gameBoard = document.querySelector(".gameBoard");
const field = document.querySelectorAll(".field");
const info = document.querySelector(".info");
const dash = document.querySelector(".dash");
const restart = document.querySelector(".restart");
const winCombination = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function restartGame() {
  sign = "x";
  field.forEach((el) => {
    el.classList.remove("o");
    el.classList.remove("x");
  });
  for (let i = 0; i < 8; i++) {
    dash.classList.remove(`p${i}`);
  }
  info.innerHTML = `ture: <span class="red">
    x</span>`;
  gameBoard.style.pointerEvents = "auto";
}
restartGame();

restart.onclick = () => {
  restartGame();
};

function changeSign() {
  if (sign == "o") sign = "x";
  else if (sign == "x") sign = "o";
  if (info.textContent || info.textContent)
    info.innerHTML = `ture: <span class="red">
    ${sign}</span>`;
}

function win(i) {
  gameBoard.style.pointerEvents = "none";
  info.innerHTML = `<span class="red">${sign} 
  </span> won!`;
  dash.classList.add(`p${i}`);
}

function draw() {
  info.textContent = `draw!`;
}

function checkDraw() {
  let allFull = true;
  field.forEach((el) => {
    if (!el.classList[1]) allFull = false;
  });
  if (allFull) draw();
}

function checkWin(el) {
  let elementsWithClass = document.querySelectorAll(`.${sign}`);
  let tabOfElements = [];
  elementsWithClass.forEach((el) => {
    tabOfElements.push(Number(el.getAttribute("date-nr")));
  });
  tabOfElements.sort();

  for (const iterator in winCombination) {
    // Porównywanie zwycieńskiej kombinacji z kombinacjami na planszy
    let a = winCombination[iterator][0];
    let b = winCombination[iterator][1];
    let c = winCombination[iterator][2];

    console.log(
      tabOfElements.indexOf(a),
      tabOfElements.indexOf(b),
      tabOfElements.indexOf(c)
    );
    if (tabOfElements.length > 2) {
      // Sprawdzanie czy tablica x'ów lub tablica o na mapie zawiera którąś ze zwycieńskich kombinacji
      if (
        tabOfElements.indexOf(a) >= 0 &&
        tabOfElements.indexOf(b) >= 0 &&
        tabOfElements.indexOf(c) >= 0
      ) {
        win(iterator);
        break;
      } else {
        checkDraw();
      }
    }
  }
}

function checkIfEmpty(el) {
  //jeżeli pole nie zawiera powyżej jednej klasy
  if (!el.classList[1]) {
    el.classList.add(sign);
    if (rand(1, 5) == 2) el.classList.add("redFill");
    else if (rand(1, 5) == 1) el.classList.add("redFill2");
    checkWin(sign, el);
    changeSign();
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Przekazuje kliknięty element do funkcji checkIfEmpty();
field.forEach((el) => {
  el.addEventListener("click", function (e) {
    checkIfEmpty(el);
  });
});
