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
    this.powerModeTimeout = null;
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
      ghostPositionList: this.board.findAllElementPositions("G"),
      speed: this.activeMode.ghostSpeed,
      targetPosition: this.board.findSingleElementPosition("P"),
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

  initializePacman() {
    return new Pacman(this.board.findSingleElementPosition("P"));
  }

  handlePacmanMove(e) {
    let { x, y } = this.pacman.position;
    let newX = x;
    let newY = y;

    if (e.key === "ArrowUp") newY -= 1;
    if (e.key === "ArrowDown") newY += 1;
    if (e.key === "ArrowLeft") newX -= 1;
    if (e.key === "ArrowRight") newX += 1;

    // Check if the new position is not a wall
    if (this.board.layout[newY][newX] !== 1) {
      // check if the new position is a food pellet
      if (this.board.layout[newY][newX] === 2) this.scoreBoard.addFoodPoint();
      // check if the new position is a power food pellet and set mode to power
      else if (this.board.layout[newY][newX] === 3) this.activatePowerMode();
      // check if warp square and warp pacman to opposite side of board
      else if (this.board.layout[newY][newX] === "<")
        newX = this.board.eastWarpPosition.x - 1;
      else if (this.board.layout[newY][newX] === ">")
        newX = this.board.westWarpPosition.x + 1;

      // check if all food has been eaten and claim victory
      if (this.board.getTotalFood() === 0) {
        this.ghostController.stopAllGhosts();
        alert("You win Batty Boy");
      }
      this.pointsDIV.innerText = this.scoreBoard.score;
      this.board.updateLayout([
        {
          position: { x, y },
          value: 0,
        },
        { position: { x: newX, y: newY }, value: "P" },
      ]);
      this.board.layout[y][x] = 0; // clear old position
      this.board.layout[newY][newX] = "P"; // Set new position
      this.pacman.setPosition({ x: newX, y: newY });
      // reset all ghosts targetPosition if they are chasing you and not frightened
      if (this.pacman.mode !== "power")
        this.ghostController.setAllGhostsTargetPosition({
          ...this.pacman.position,
        });
    }
    this.board.renderBoard();

    // check if pacman has run into any ghost
    Object.keys(this.ghostController.ghosts).forEach((key) => {
      if (
        newX === this.ghostController.ghosts[key].position.x &&
        newY === this.ghostController.ghosts[key].position.y
      ) {
        if (this.pacman.mode === "normal") {
          alert("You lose Batty Boy");
          this.ghostController.stopAllGhosts();
          this.removeKeydownEventListener();
          this.board.renderBoard();
        } else if (this.pacman.mode === "power") {
          this.ghostController.updateSingleGhostMode({
            boardLayout: this.board.layout,
            handleGhostMove: (params) => this.handleGhostMove(params),
            key,
            newMode: "eaten",
            targetPosition: this.ghostController.ghosts[key].startingPosition,
          });
          this.scoreBoard.addGhostPoint();
        }
      }
    });
  }

  activatePowerMode() {
    if (this.powerModeTimeout) clearTimeout(this.powerModeTimeout);
    this.pacman.updateMode("power");
    this.ghostController.updateAllGhostsMode({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      newMode: "frightened",
      targetPositions: this.board.powerFoodSquares,
    });
    this.powerModeTimeout = setTimeout(() => this.deactivatePowerMode(), 10000);
  }

  deactivatePowerMode() {
    this.pacman.updateMode("normal");
    this.ghostController.updateAllGhostsMode({
      boardLayout: this.board.layout,
      handleGhostMove: (params) => this.handleGhostMove(params),
      newMode: "chase",
      targetPosition: this.pacman.position,
    });
  }

  initializeScoreBoard() {
    return new ScoreBoard(this.activeMode, this.board.getTotalFood());
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
    this.scoreBoard.resetScoreBoard(this.activeMode, this.board.getTotalFood());
  }

  resetGame(e, updateMazeLinks) {
    if (e.target.id === "easy") this.activeMode = new Easy();
    else if (e.target.id === "medium") this.activeMode = new Medium();
    else if (e.target.id === "hard") this.activeMode = new Hard();
    else if (e.target.id === "very-hard") this.activeMode = new VeryHard();
    updateMazeLinks();
    this.ghostController.stopAllGhosts();
    this.removeKeydownEventListener();
    this.board.resetBoard(this.activeMode.layout);
    this.ghostController.resetGhosts(
      this.board.findAllElementPositions("G"),
      this.activeMode.ghostSpeed,
      this.board.findSingleElementPosition("P")
    );
    clearTimeout(this.powerModeTimeout);
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
