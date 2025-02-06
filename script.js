// import game pieces
import Board from "./board/board.js";
import Pacman from "./pacman/pacman.js";
import ScoreBoard from "./scoreboard/scoreboard.js";

// import modes
import Easy from "./board/mazes/easy.js";
import Medium from "./board/mazes/medium.js";
import Hard from "./board/mazes/hard.js";
import VeryHard from "./board/mazes/veryHard.js";

import * as helpers from "./helpers/helpers.js";
import GhostController from "./ghost/ghostController.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const mazeLinks = document.getElementsByClassName("maze-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const points = document.getElementById("points");

// initialize game
let activeMode = new Easy();
const board = new Board(gameBoard, activeMode.layout);

// create scoreboard
const scoreBoard = new ScoreBoard(
  activeMode.foodPoint,
  activeMode.powerFoodPoint,
  board.getTotalFood()
);

const pacman = new Pacman(
  board,
  points,
  board.findSingleElementPosition("P"),
  scoreBoard
);
const ghostController = new GhostController(
  board,
  board.findGhostPositions(),
  pacman,
  activeMode.ghostSpeed
);

pacman.setGhostController(ghostController);
board.renderBoard();

const removeKeydownEventListener = () =>
  window.removeEventListener("keydown", handlePacmanMove);

const handlePacmanMove = (e) => pacman.move(e.key, removeKeydownEventListener);

// start game
startButton.addEventListener("click", () => {
  window.addEventListener("keydown", handlePacmanMove);
  ghostController.startGhosts(removeKeydownEventListener);
});

const handleLevelReset = (e) => {
  if (e.target.id === "easy") activeMode = new Easy();
  else if (e.target.id === "medium") activeMode = new Medium();
  else if (e.target.id === "hard") activeMode = new Hard();
  else if (e.target.id === "very-hard") activeMode = new VeryHard();
  Array.from(mazeLinks).forEach((link) => {
    if (activeMode.name === link.id) link.classList.add("active-maze-button");
    else link.classList.remove("active-maze-button");
  });
  removeKeydownEventListener();
  ghostController.stopGhosts();
  board.resetBoard(activeMode.layout);
  ghostController.resetGhosts(
    board.findGhostPositions(),
    activeMode.ghostSpeed
  );
  pacman.setPosition(board.findSingleElementPosition("P"));
  scoreBoard.resetScoreBoard(activeMode, board.getTotalFood(), points);
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
