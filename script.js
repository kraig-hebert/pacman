import Board from "./board/board.js";
import Ghost from "./ghost/ghost.js";
import Pacman from "./pacman/pacman.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const points = document.getElementById("points");

// initialize game
const board = new Board(gameBoard);

const getTotalFruit = () =>
  board.layout.flat().filter((cell) => cell === 2).length;
// create scoreboard
const scoreBoard = {
  foodPoint: 1,
  powerFoodPoint: 3,
  score: 0,
  totalFruit: getTotalFruit(),
};

const pacman = new Pacman(4, 7, board, points, scoreBoard);
const ghost = new Ghost(3, 5, board, pacman);
pacman.setGhost(ghost);

board.renderBoard();

const removeEventListener = () =>
  window.removeEventListener("keydown", handlePacmanMove);

const handlePacmanMove = (e) => pacman.move(e.key, removeEventListener);

// start game
startButton.addEventListener("click", () => {
  window.addEventListener("keydown", handlePacmanMove);
  ghost.beginMoving(removeEventListener);
});

//reset board
resetButton.addEventListener("click", () => {
  window.location.reload();
});
