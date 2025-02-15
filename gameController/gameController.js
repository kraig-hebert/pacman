// import game elements
import Board from "../board/board.js";
import GhostController from "../ghost/ghostController.js";
import Pacman from "../pacman/pacman.js";
import ScoreBoard from "../scoreboard/scoreboard.js";

// import game modes
import Easy from "../board/mazes/easy.js";
import Medium from "../board/mazes/medium.js";
import Hard from "../board/mazes/hard.js";
import VeryHard from "../board/mazes/veryHard.js";

class GameController {
  constructor(gameBoard, points) {
    this.activeMode = new Easy();
    this.board = this.initializeBoard(gameBoard);
    this.ghostController = this.initializeGhostController();
    this.pacman = this.initializePacman();
    this.pointsDIV = points;
    this.scoreBoard = this.initializeScoreBoard();
    this.handlePacmanMove = this.handlePacmanMove.bind(this);
  }

  addKeydownEventListener() {
    window.addEventListener("keydown", this.handlePacmanMove);
  }

  removeKeydownEventListener() {
    window.removeEventListener("keydown", this.handlePacmanMove);
  }

  initializeBoard(gameBoard) {
    return new Board(gameBoard, this.activeMode.layout);
  }

  renderBoard() {
    this.board.renderBoard();
  }

  updateBoardLayout(position, value) {
    this.board.updateLayout(position, value);
    this.renderBoard();
  }

  initializeGhostController() {
    return new GhostController({
      ghostPositionList: this.board.findGhostPositions(),
      speed: this.activeMode.ghostSpeed,
    });
  }

  handleGhostMove(params) {
    const { key, newGhostPosition } = params;
    const selectedGhost = this.ghostController.ghosts[key];
    if (
      newGhostPosition.x === this.pacman.position.x &&
      newGhostPosition.y === this.pacman.position.y
    ) {
      if (selectedGhost.mode === "chase" || selectedGhost.mode === "scatter")
        this.endGame();
      else if (selectedGhost.mode === "frightened")
        selectedGhost.changeMode("eaten");
    } else {
      const nextCellValue =
        this.board.layout[newGhostPosition.y][newGhostPosition.x];
      this.board.updateLayout([
        {
          position: selectedGhost.position,
          value: selectedGhost.currentCellPreviousValue,
        },
        { position: newGhostPosition, value: "G" },
      ]);
      selectedGhost.setPosition(newGhostPosition);
      selectedGhost.setCurrentCellPreviousValue(nextCellValue);
    }
  }

  updateAllGhostsMode(mode) {}

  updateSingleGhostsMode(id, mode) {}

  initializePacman() {
    return new Pacman(this.board.findSingleElementPosition("P"));
  }

  handlePacmanMove(e) {
    this.pacman.move(e.key);
  }

  initializeScoreBoard() {
    return new ScoreBoard();
  }

  updateScoreBoard(pointType) {
    switch (pointType) {
      case 1:
        this.scoreBoard.addFoodPoint();
        break;
      case 2:
        this.scoreBoard.addGhostPoint();
        break;
      case 3:
        this.scoreBoard.addPowerFoodPoint();
        break;
    }
  }

  resetScoreBoard() {
    this.scoreBoard.resetScoreBoard();
  }

  resetGame(e, updateMazeLinks) {
    if (e.target.id === "easy") this.activeMode = new Easy();
    else if (e.target.id === "medium") this.activeMode = new Medium();
    else if (e.target.id === "hard") this.activeMode = new Hard();
    else if (e.target.id === "very-hard") this.activeMode = new VeryHard();
    this.ghostController.stopAllGhosts();
    this.removeKeydownEventListener();
    this.board.resetBoard(this.activeMode.layout);
    this.ghostController.resetGhosts(
      this.board.findGhostPositions(),
      this.activeMode.ghostSpeed
    );
    this.pacman.setPosition(this.board.findSingleElementPosition("P"));
    this.scoreBoard.resetScoreBoard(
      this.activeMode,
      this.board.getTotalFood(),
      this.pointsDIV
    );
  }

  startGame() {
    this.addKeydownEventListener();
    this.ghostController.startAllGhosts({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      targetPosition: this.pacman.position,
    });
  }

  endGame() {
    this.removeKeydownEventListener();
    this.ghostController.stopAllGhosts();
    alert("You lose Batty Boy");
  }
}

export default GameController;
