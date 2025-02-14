import GameController from "./gameController/gameController.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const mazeLinks = document.getElementsByClassName("maze-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const points = document.getElementById("points");

// initialize game
const gameController = new GameController(gameBoard, points);

// add eventListeners to maze links
Array.from(mazeLinks).forEach((link) => {
  if (activeMode.name === link.id) link.classList.add("active-maze-button");
  link.addEventListener("click", handleLevelReset);
});

// start game
startButton.addEventListener("click", () => gameController.startGame());

// reset board
resetButton.addEventListener("click", () =>
  handleLevelReset({ target: { id: gameController.activeMode.name } })
);
