import Board from "./board/board.js";
import Ghost from "./ghost/ghost.js";
import Pacman from "./pacman/pacman.js";

// import modes
import Easy from "./board/mazes/easy.js";
import Medium from "./board/mazes/medium.js";
import Hard from "./board/mazes/hard.js";
import VeryHard from "./board/mazes/veryHard.js";

// collect game elements
const gameBoard = document.getElementById("game-board");
const mazeLinks = document.getElementsByClassName("maze-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const points = document.getElementById("points");

// initialize game
let activeMode = new Easy();
const board = new Board(gameBoard, activeMode.layout);

const getTotalFood = () =>
  board.layout.flat().filter((cell) => cell === 2).length;
// create scoreboard
const scoreBoard = {
  foodPoint: activeMode.foodPoint,
  powerFoodPoint: activeMode.powerFoodPoint,
  score: 0,
  totalFood: getTotalFood(),
};

const pacman = new Pacman(board, points, activeMode.pacmanPosition, scoreBoard);
const ghost = new Ghost(board, pacman, activeMode.ghostPosition);
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
resetButton.addEventListener("click", () => window.location.reload());

const handleMazeButtonClick = (e) => {
  if (e.target.id === "easy") activeMode = new Easy();
  else if (e.target.id === "medium") activeMode = new Medium();
  else if (e.target.id === "hard") activeMode = new Hard();
  else if (e.target.id === "very-hard") activeMode = new VeryHard();
  board.setLayout(activeMode.layout);
  Array.from(mazeLinks).forEach((link) => {
    if (activeMode.name === link.id) link.classList.add("active-maze-button");
    else link.classList.remove("active-maze-button");
  });
};

// add eventListeners to maze links
Array.from(mazeLinks).forEach((link) => {
  if (activeMode.name === link.id) link.classList.add("active-maze-button");
  link.addEventListener("click", handleMazeButtonClick);
});
