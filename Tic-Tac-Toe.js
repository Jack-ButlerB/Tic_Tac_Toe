import {
  wipeRenderedBoard,
  renderBoard,
  positionTakenFlash,
  drawWinningLine,
  showDialog,
  playAudio,
} from "./render.js";
let player1 = { name: "Player 1", marker: "X" };
let player2 = { name: "Player 2", marker: "O" };

let gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let player = player1;

console.log("gameboard initial state", gameboard);

function playerTakesTurn(gameboard, player, rowIndex, columnIndex) {
  if (gameboard[rowIndex][columnIndex]) {
    throw new Error("This position is already taken, please try again");
  }

  gameboard[rowIndex][columnIndex] = player.marker;
  console.log(
    player.name +
      " took their turn placing an '" +
      player.marker +
      "' in Row " +
      rowIndex +
      ", Column " +
      columnIndex
  );
}

function getWinningLine(player) {
  // TODO: This can go straight into the array below
  const winninglines = [
    {
      title: "First Row",
      line: [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
      drawLine:
        "linear-gradient(to bottom, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
    },
    {
      title: "Second Row",
      line: [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
      drawLine:
        "linear-gradient(to bottom, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
    },
    {
      title: "Third Row",
      line: [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
      drawLine:
        "linear-gradient(to top, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
    },
    {
      title: "First Column",
      line: [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
      drawLine:
        "linear-gradient(to right, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
    },
    {
      title: "Second Column",
      line: [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
      drawLine:
        "linear-gradient(to right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
    },
    {
      title: "Third Column",
      line: [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
      drawLine:
        "linear-gradient(to left, white, white 16.6%, red 16.6%, red 17.6%, white 17.6%, white)",
    },
    {
      title: "Diagonal (top left to bottom right)",
      line: [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
      drawLine:
        "linear-gradient(to top right, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
    },
    {
      title: "Diagonal (bottom left to top right)",
      line: [gameboard[0][2], gameboard[1][1], gameboard[2][0]],
      drawLine:
        "linear-gradient(to top left, white, white 49.5%, red 49.5%, red 50.5%, white 50.5%, white)",
    },
  ];

  // checking for a winner on each line and returning that the varible linked to that line
  for (const winningline of winninglines) {
    if (winningline.line.every((item) => item === player.marker)) {
      return winningline;
    }
  }
}

function isBoardFull(gameboard) {
  return gameboard.every((line) => line.every((cell) => cell));
}

function playerTakesTurnHandler(rowIndex, columnIndex) {
  try {
    playerTakesTurn(gameboard, player, rowIndex, columnIndex);

    wipeRenderedBoard();
    renderBoard(gameboard, playerTakesTurnHandler);

    const winningLine = getWinningLine(player);

    if (winningLine) {
      drawWinningLine(winningLine);

      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      showDialog(`${player.name} Wins!`, () => {
        wipeRenderedBoard();
        renderBoard(gameboard, playerTakesTurnHandler);
      });

      playAudio(true);
    } else if (isBoardFull(gameboard)) {
      gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      showDialog("No one won!?", () => {
        wipeRenderedBoard();
        renderBoard(gameboard, playerTakesTurnHandler);
      });

      playAudio(false);
    }

    player = player === player1 ? player2 : player1;
  } catch (error) {
    // TODO: can you pass the error message into the positionTakenFlash function?
    console.error(error.message);
    positionTakenFlash(error.message);
  }
}

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log("clicked");
  player1.name =
    document.getElementById("player1Name")?.value ||
    document.getElementById("player1Name").placeholder;
  player1.marker =
    document.getElementById("player1Marker")?.value ||
    document.getElementById("player1Marker").placeholder;

  player2.name =
    document.getElementById("player2Name")?.value ||
    document.getElementById("player2Name").placeholder;

  player2.marker =
    document.getElementById("player2Marker")?.value ||
    document.getElementById("player2Marker").placeholder;

  document.getElementById("formSubmit").style.display = "none";

  renderBoard(gameboard, playerTakesTurnHandler);
});
