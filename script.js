// import game pieces
import Board from "./board/board.js";
import Ghost from "./ghost/ghost.js";
import Pacman from "./pacman/pacman.js";
import ScoreBoard from "./scoreboard/scoreboard.js";

// import modes
import Easy from "./board/mazes/easy.js";
import Medium from "./board/mazes/medium.js";
import Hard from "./board/mazes/hard.js";
import VeryHard from "./board/mazes/veryHard.js";

import * as helpers from "./helpers/helpers.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const mazeLinks = document.getElementsByClassName("maze-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const points = document.getElementById("points");

// initialize game
let activeMode = new Easy();
const board = new Board(
  helpers.getElementPosition(">", activeMode.layout),
  gameBoard,
  activeMode.layout,
  helpers.getElementPosition("<", activeMode.layout)
);

const getTotalFood = () =>
  board.layout.flat().filter((cell) => cell === 2).length;
// create scoreboard
const scoreBoard = new ScoreBoard(
  activeMode.foodPoint,
  activeMode.powerFoodPoint,
  getTotalFood()
);

const pacman = new Pacman(
  board,
  points,
  helpers.getElementPosition("P", board.layout),
  scoreBoard
);
const ghost = new Ghost(
  board,
  pacman,
  helpers.getElementPosition("G", board.layout),
  activeMode.ghostSpeed
);
pacman.setGhost(ghost);
board.setGamePieces(ghost, pacman);
board.renderBoard();

const removeEventListener = () =>
  window.removeEventListener("keydown", handlePacmanMove);

const handlePacmanMove = (e) => pacman.move(e.key, removeEventListener);

// start game
startButton.addEventListener("click", () => {
  window.addEventListener("keydown", handlePacmanMove);
  ghost.beginMoving(removeEventListener);
});

const handleLevelReset = (e) => {
  console.log(e);
  if (e.target.id === "easy") activeMode = new Easy();
  else if (e.target.id === "medium") activeMode = new Medium();
  else if (e.target.id === "hard") activeMode = new Hard();
  else if (e.target.id === "very-hard") activeMode = new VeryHard();
  Array.from(mazeLinks).forEach((link) => {
    if (activeMode.name === link.id) link.classList.add("active-maze-button");
    else link.classList.remove("active-maze-button");
  });
  ghost.stopMoving();
  board.setLayout(activeMode.layout);
  board.setWarpSquares(
    helpers.getElementPosition(">", board.layout),
    helpers.getElementPosition("<", board.layout)
  );

  ghost.setPosition(helpers.getElementPosition("G", board.layout));
  ghost.setSpeed(activeMode.ghostSpeed);
  pacman.setPosition(helpers.getElementPosition("P", board.layout));
  scoreBoard.resetScoreBoard(
    activeMode.foodPoint,
    activeMode.powerFoodPoint,
    getTotalFood(),
    points
  );
};

// add eventListeners to maze links
Array.from(mazeLinks).forEach((link) => {
  if (activeMode.name === link.id) link.classList.add("active-maze-button");
  link.addEventListener("click", handleLevelReset);
});

//reset board
resetButton.addEventListener("click", () =>
  handleLevelReset({ target: { id: activeMode.name } })
);
