import { scoreBoard } from "./gameSettings/gameSettings.js";
import Board from "./board/board.js";
import Ghost from "./ghost/ghost.js";
import Pacman from "./pacman/pacman.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

// initialize pacman and ghost
const board = new Board(gameBoard);
const pacman = new Pacman(4, 7);
const ghost = new Ghost(3, 5, board, pacman);

board.renderBoard();

// start game
const handlePacmanMove = (e) => pacman.move(e.key, board);
startButton.addEventListener("click", () => {
  window.addEventListener("keydown", handlePacmanMove);
  ghost.beginMoving();
});

//reset board
resetButton.addEventListener("click", () => {
  window.location.reload();
});
