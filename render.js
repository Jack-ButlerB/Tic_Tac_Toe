export function wipeRenderedBoard() {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.remove();
}

export function renderBoard(gameboard, eventCallback) {
  const body = document.querySelector("body");

  console.log("Rendering board");
  const gameboardDiv = document.createElement("div");
  gameboardDiv.setAttribute("id", "gameboardDiv");
  gameboardDiv.style.border = "red 2px solid";
  gameboardDiv.style.width = "fit-content";
  body.appendChild(gameboardDiv);

  for (let rowIndex = 0; rowIndex <= 2; rowIndex++) {
    const rowBox = document.createElement("div");
    rowBox.setAttribute("id", "gameboardRow" + rowIndex);
    rowBox.style.display = "flex";
    rowBox.style.flexdirection = "row";
    gameboardDiv.appendChild(rowBox);

    for (let columnIndex = 0; columnIndex <= 2; columnIndex++) {
      const columnBox = document.createElement("div");
      columnBox.setAttribute("id", `gameboard [${rowIndex}] [${columnIndex}]`);
      columnBox.textContent = gameboard[rowIndex][columnIndex];
      columnBox.style.fontSize = "100px";
      columnBox.style.width = "100px";
      columnBox.style.height = "100px";
      columnBox.style.border = "2px blue solid";
      columnBox.style.display = "flex";
      columnBox.style.flex = "align";
      columnBox.style.justifyContent = "center";
      columnBox.style.alignItems = "center";
      columnBox.addEventListener("click", () => {
        eventCallback(rowIndex, columnIndex);
      });

      rowBox.appendChild(columnBox);
    }
  }
}

export function drawWinningLine(paramWinningline) {
  const gameboardDiv = document.getElementById("gameboardDiv");
  gameboardDiv.style.background = paramWinningline.drawLine;
}

export function showDialog(message, resetCallback) {
  const dialog = document.createElement("dialog");
  const body = document.querySelector("body");
  body.appendChild(dialog);

  dialog.textContent = message;

  const resetButton = document.createElement("button");
  resetButton.textContent = "Play Again?";
  resetButton.addEventListener("click", () => {
    dialog.remove();
    resetCallback();
  });
  dialog.appendChild(resetButton);

  dialog.showModal();
}

export function playAudio(hasWinner) {
  let audio = null;

  if (hasWinner) {
    audio = new Audio("small-crowd-clapping-2-106993.mp3");
  } else {
    audio = new Audio("small-crowd-reactions-6977.mp3");
  }

  audio.play();

  setTimeout(() => {
    audio.pause();
  }, 5000);
}

export function positionTakenFlash(caughtErrorMessage) {
  const body = document.querySelector("body");
  const positionTaken = document.createElement("h1");
  positionTaken.textContent = caughtErrorMessage;
  body.appendChild(positionTaken);
  setTimeout(() => {
    positionTaken.remove();
  }, 1500);
}
